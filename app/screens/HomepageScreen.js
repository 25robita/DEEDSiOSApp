import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Appearance } from "react-native-appearance";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Component } from "react/cjs/react.production.min";
import { ThemeContext } from '../../ThemeProvider';
import { coloursDark, coloursLight, getColors } from "../colours";
import { ContentText } from "../components/ContentTextComponent";
import IconComponent from "../components/IconComponent";
import LoaderComponent from "../components/LoaderComponent";
import SchoolboxLinks from "../components/schoolbox/LinksComponent";
import SchoolboxLTI from "../components/schoolbox/LTIComponent";
import { SchoolboxNewsList } from "../components/schoolbox/NewsListComponent";
import SchoolboxComponent from "../components/schoolbox/SchoolboxComponent";
import SchoolboxSocialStream from "../components/schoolbox/SocialStreamComponent";
import SchoolboxTextBox from "../components/schoolbox/TextBoxComponent";
import SchoolboxTiles from "../components/schoolbox/TilesComponent";
import SchoolboxUserList from "../components/schoolbox/UserListComponent";
import { serviceURL } from "../consts";
import { fetchHTMLResource } from "../getters/get";
import { homepageFailTextLabel, sliceNavigationTitle } from "../lang";
import { openURL } from "../RootNavigation";

export default class HomepageScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            name: "",
            breadcrumbs: [],
            url: "",
            done: false
        };
    }
    componentDidMount() {
        let url = `/homepage/${this.props.route.params.code ? "code/" : ""}${this.props.route.params.code || this.props.route.params.id}/?readonly=1`;
        this.state.url = url;
        this.loadComponents()
    }
    loadComponents = () => {
        this.state.components = []
        this.state.breadcrumbs = []

        this.setState({ name: '', })
        fetchHTMLResource(this.state.url)
            .then(d => {
                let pageTitle = d.querySelector("#content h1").text;
                this.setState({ name: pageTitle })
                pageTitle = sliceNavigationTitle(pageTitle)

                const customColors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight

                this.props.navigation.setOptions({
                    title: pageTitle,
                    headerRight: () =>
                        <TouchableOpacity
                            onPress={() => {
                                openURL(this.state.url, false)
                            }}
                        >
                            <IconComponent id={"\ue921"} style={{
                                fontSize: 20,
                                color: customColors.headerForeground,
                                paddingRight: 20
                            }} />
                        </TouchableOpacity>

                })

                let breadcrumbs = d.querySelectorAll(".breadcrumb li a")
                if (breadcrumbs.length) {
                    breadcrumbs = breadcrumbs.map(item => {
                        return {
                            text: item.text,
                            href: item.attributes.href
                        }
                    })
                }
                this.setState({ breadcrumbs })

                let homepageId = this.props.route.params.id || d.querySelector("#component-layout").attributes.class.match(/\d+/g);

                d.querySelectorAll(".component-container").map(i => {
                    let titleNode = i.querySelector(".component-titlebar h2");
                    let title = titleNode && titleNode.text
                        .trim()
                        .replaceAll("Updates", "Social Stream"); // this is strange but ok
                    let cid = i.id.match(/\d+/g);
                    let isCollapsed = i.querySelector("[data-collapse-state]").attributes['data-collapse-state'] == 'collapsed';
                    if (i.classList.contains("Schoolbox_Resource_Textbox_Component_Homepage_Controller")) // here you support new components
                    {
                        let textBoxBody = i.querySelector("[id^=textBoxBody]");
                        this.state.components.push((
                            <SchoolboxTextBox
                                collapsed={isCollapsed}
                                title={title}
                                content={textBoxBody && textBoxBody.innerHTML}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_BreadcrumbController")) { } // do nothing as they are automatically rendered up there somewhere ^
                    else if (i.classList.contains("Schoolbox_Tile_Component_HomepageTileController")) {
                        let tileWidthRegex = i.querySelector("style").text.matchAll(/width\s*:\s*(\d+\.?\d{0,2}).*([%])\s*;/g).next().value;
                        let tileWidth = tileWidthRegex ? (tileWidthRegex[1] + tileWidthRegex[2]) : '100%'
                        this.state.components.push((
                            <SchoolboxTiles
                                collapsed={isCollapsed}
                                title={title}
                                tiles={i.querySelectorAll("li[data-tile]")}
                                styles={i.querySelectorAll("ul style")}
                                tileWidth={tileWidth}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_SocialStreamController")) {
                        this.state.components.push((
                            <SchoolboxSocialStream
                                collapsed={isCollapsed}
                                title={title}
                                homepage={homepageId}
                                cid={cid}
                            />
                        ))
                    }
                    else if (i.classList.contains("Schoolbox_Comms_News_Component_Homepage_Controller")) {
                        this.state.components.push((
                            <SchoolboxNewsList
                                title={title}
                                cid={cid}
                                homepage={homepageId}
                                collapsed={isCollapsed}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_ClassListController") || i.classList.contains("Component_Homepage_TeachersController") || i.classList.contains("Component_Homepage_MembersController")) {
                        let users = i.querySelectorAll(".card").map(j => {
                            let link = j.querySelector("a")
                            return {
                                id: link.attributes.href.match(/\d+/g),
                                name: link.text.trim(),
                                meta: j.querySelector("p.meta").text.trim()
                            }
                        })
                        this.state.components.push((
                            <SchoolboxUserList
                                title={title}
                                collapsed={isCollapsed}
                                users={users}
                            />
                        ))
                    }
                    else if (i.classList.contains("Schoolbox_LTI_Component_Homepage_Controller")) {
                        let url = i.querySelector("iframe").attributes.src;
                        if (url.startsWith("/")) {
                            url = serviceURL + url
                        }
                        this.state.components.push((
                            <SchoolboxLTI
                                collapsed={isCollapsed}
                                title={title}
                                url={url}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_ClickviewController")) {
                        let url = i.querySelector("iframe").attributes.src;
                        url = url.startsWith("//") ? "https:" + url : url
                        this.state.components.push((
                            <SchoolboxLTI // its the same thing ill just use this
                                collapsed={isCollapsed}
                                title={title}
                                url={url}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_LinkListController")) {
                        let links = i.querySelectorAll(".list-item a[data-plugin]").map((i, index, arr) => ({ //may need better selector
                            url: i.attributes.href,
                            text: i.text,
                            isLast: index == arr.length - 1
                        }))
                        this.state.components.push((
                            <SchoolboxLinks
                                title={title}
                                collapsed={isCollapsed}
                                links={links}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_FileListController")) {
                        let links = i.querySelectorAll(".list-item a[data-plugin]").map((i, index, arr) => ({ //may need better selector
                            url: i.attributes.href,
                            text: i.text,
                            isLast: index == arr.length - 1
                        }))
                        this.state.components.push((
                            <SchoolboxLinks
                                type="file"
                                title={title}
                                collapsed={isCollapsed}
                                links={links}
                            />
                        ))
                    }
                    else if (i.classList.contains("Component_Homepage_FolderListController")) {
                        let links = i.querySelectorAll(".list-item a").map((i, index, arr) => ({ //may need better selector
                            url: i.attributes.href,
                            text: i.text,
                            isLast: index == arr.length - 1
                        }))
                        this.state.components.push((
                            <SchoolboxLinks
                                type="homepage"
                                title={title}
                                collapsed={isCollapsed}
                                links={links}
                            />
                        ))
                    }
                    else {
                        let newTitle = "No Title – " + Array.from(i.classList._set).filter(j => j != "component-container")[0].replaceAll(/_|Schoolbox|Component|Homepage|Controller/g, '') //if no title

                        this.state.components.push((
                            <SchoolboxComponent
                                style={{
                                    padding: 0
                                }}
                                containerStyle={{
                                    padding: 0
                                }}
                                contentStyle={{
                                    margin: 0
                                }}
                                title={title || newTitle}
                                url={`/homepage/${homepageId}#${i.attributes.id}`}
                            />
                        ))
                    }
                })
                this.setState({ done: true })
            })
    }
    render() {
        var customColours = getColors();
        return (
            <ScrollView
                style={{
                    backgroundColor: customColours.background
                }}
            >
                <RefreshControl
                    size="large"
                    onRefresh={this.loadComponents}
                />
                <ContentText
                    style={{
                        fontSize: 20,
                        margin: 10
                    }}
                >
                    {this.state.name}
                </ContentText>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {
                        this.state.breadcrumbs.map((item, index) => {
                            return <View
                                style={{
                                    backgroundColor: customColours.themeSeconday,
                                    padding: 5,
                                    flexDirection: 'row',
                                    overflow: 'hidden'
                                }}
                            >
                                {
                                    (index != this.state.breadcrumbs.length - 1)
                                        ? <IconComponent
                                            id=">"
                                            style={{
                                                color: customColours.background,
                                                position: 'absolute',
                                                alignSelf: 'center',
                                                right: 0,
                                                top: -2,
                                                transform: [{
                                                    scaleY: 5.5
                                                }, {
                                                    translateX: 1
                                                }]
                                            }}
                                        />
                                        : null
                                }
                                <ContentText
                                    onPress={_ => openURL(item.href)}
                                    style={{
                                        color: customColours.link,
                                    }}
                                >{item.text}</ContentText>
                            </View>

                        })
                    }
                </View>
                <View>
                    <LoaderComponent
                        state={
                            this.state.components.length
                                ? "loaded"
                                : (
                                    this.state.done
                                        ? 'failed'
                                        : "loading"
                                )
                        }
                        failText={homepageFailTextLabel}
                        size="large"
                        loaderStyle={{
                            transform: [{
                                scale: 0.8
                            }]
                        }}
                    >
                        {this.state.components}
                    </LoaderComponent>
                </View>
            </ScrollView>
        );
    }
}
// TODO: turn component list into flatlist