import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";
import IconComponent from "../components/IconComponent";
import { NewsList } from "../components/NewsRow";
import { ContentText } from "../components/TextComponents";
import { styles } from "../consts";
import { fetchHTMLResource, fetchJSONResource } from "../getters/get";
import { renderHTMLText } from "../renderHTML";
import { openURL } from "../RootNavigation";

class SchoolboxComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { collapsed: false }
    }
    collapseToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return <View style={[{
            display: "flex",
            flexDirection: "column",
            margin: 10,
        }, styles.shadow, this.props.style]}>
            <View
                style={{
                    backgroundColor: customColours.componentTitleBar,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <ContentText
                    style={{
                        fontSize: 18,
                        // fontWeight: "500"
                    }}
                >{this.props.title}</ContentText>

                <Pressable hitSlop={15} onPress={this.collapseToggle}>
                    <IconComponent name={this.state.collapsed ? "down-arrow" : "up-arrow"} style={{
                        color: customColours.grey,
                        fontSize: 16
                    }} />
                </Pressable>

            </View>
            <View style={[{
                display: this.state.collapsed ? "none" : undefined,
                backgroundColor: customColours.contentBackground,
                padding: 20,
            }, this.props.contentStyle]}>
                {this.props.children}
            </View>
        </View>
    }
}

class SchoolboxNewsList extends Component {
    constructor(props) {
        super(props)
        this.state = { url: "" }
    }
    componentDidMount = () => {
        this.setState({
            url: `/news/lists/folder/${this.props.homepage}?c=0&l=10&hp=1&cid=${this.props.cid}`
        })
    }
    render() {
        return <SchoolboxComponent title={this.props.title} contentStyle={{ backgroundColor: customColours.contentBackground }}>
            {
                this.state.url
                    ? <NewsList
                        url={this.state.url}
                    />
                    : null
            }
        </SchoolboxComponent>

    }
}

function SchoolboxTextBox(props) {
    return <SchoolboxComponent title={props.title}>
        <ContentText>
            {renderHTMLText(props.content)}
        </ContentText>
    </SchoolboxComponent>
}

class HomepageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { components: [], name: "", breadcrumbs: [] };
    }
    componentDidMount() {
        let url = `/homepage/${this.props.route.params.code ? "code/" : ""}${this.props.route.params.code || this.props.route.params.id}`;
        console.log("HomepageScreen.js:14 says:", url);
        fetchHTMLResource(url)
            .then(d => {
                let pageTitle = d.querySelector("#content h1").text;
                let maxLength = 27;
                this.setState({ name: pageTitle })
                pageTitle = (pageTitle.length > maxLength)
                    ? pageTitle.slice(0, maxLength - 3) + "..."
                    : pageTitle
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
                this.props.navigation.setOptions({ title: pageTitle })
                d.querySelectorAll("[class*=Component_Homepage_Controller]").map(i => {
                    let title = i.querySelector(".component-titlebar h2 span").innerHTML;
                    if (i.classList.contains("Schoolbox_Resource_Textbox_Component_Homepage_Controller")) // here you support new components
                        this.state.components.push((
                            <SchoolboxTextBox title={title} content={i.querySelector("[id^=textBoxBody]").innerHTML}></SchoolboxTextBox>
                        ))
                    if (i.classList.contains("Schoolbox_Comms_News_Component_Homepage_Controller")) {
                        console.log("HomepageScreen.js:108 says:", 'hi');
                        this.state.components.push((
                            <SchoolboxNewsList title={title} cid={i.id.match(/\d+/g)} homepage={this.props.route.params.id || d.querySelector("#component-layout").attributes.class.match(/\d+/g)} />
                        ))
                    }
                })
                this.setState({})
            })
    }
    render() {
        return (
            <ScrollView>
                <ContentText
                    style={{
                        fontSize: 20,
                        margin: 10
                    }}
                >{this.state.name}</ContentText>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {
                        this.state.breadcrumbs.map((item, index) => {
                            return <View
                                style={{
                                    backgroundColor: customColours.lightBlue,
                                    padding: 5,
                                    flexDirection: 'row',
                                    overflow: 'hidden'
                                }}
                            >
                                {
                                    (index != this.state.breadcrumbs.length - 1)
                                        ? <IconComponent
                                            name="next"
                                            style={{
                                                color: customColours.white,
                                                position: 'absolute',
                                                alignSelf: 'center',
                                                right: -3,
                                                transform: [{
                                                    scaleY: 3
                                                }]
                                            }}
                                        />
                                        : null
                                }
                                <ContentText
                                    onPress={_ => openURL(item.href)}
                                    style={{
                                        color: customColours.harshBlue,
                                    }}
                                >{item.text}</ContentText>
                            </View>

                        })
                    }
                </View>
                <View>
                    {this.state.components}
                </View>
            </ScrollView>
        );
    }
}

export default HomepageScreen;