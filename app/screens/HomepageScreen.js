import React from "react";
import { TouchableOpacity, ScrollView, Text, View, Linking, ImageBackground, RefreshControl, Image, Pressable, FlatList } from "react-native";
import Collapsible from "react-native-collapsible";
import WebView from "react-native-webview";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";
import IconComponent from "../components/IconComponent";
import LoaderComponent from "../components/LoaderComponent";
import { NewsList } from "../components/NewsRow";
import { ContentText, Meta } from "../components/TextComponents";
import { styles } from "../styles";
import { fetchHTMLResource, fetchJSONResource } from "../getters/get";
import { renderHTMLText } from "../renderHTML";
import { openURL } from "../RootNavigation";
import { serviceURL } from "../consts";
import UserLinkComponent from "../components/UserLinkComponent";
import { UserList } from "../components/UserListComponent";

class SchoolboxComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { collapsed: false }
    }
    componentDidMount = () => {
        if ((this.props.collapsed || false) != this.state.collapsed && this.props.title) {
            this.setState({ collapsed: true })
        }
    }
    collapseToggle = () => {
        this.props.url
            ? openURL(this.props.url, false)
            : this.setState({
                collapsed: !this.state.collapsed
            })
    }
    render() {
        return <View style={[{
            display: "flex",
            flexDirection: "column",
            margin: 10,
            overflow: 'hidden'
        }, styles.shadow, this.props.style]}>
            <View
                style={{
                    backgroundColor: customColours.componentTitleBar,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    display: (this.props.title || !this.props.children) ? 'flex' : "none",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    zIndex: 2
                }}
            >
                <ContentText
                    style={{
                        fontSize: 18,
                        // fontWeight: "500"
                    }}
                >{this.props.title || "No title"}</ContentText>

                <TouchableOpacity
                    activeOpacity={0.5}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    onPress={this.collapseToggle}
                >
                    <IconComponent
                        name={
                            this.props.children
                                ? (this.state.collapsed ? "down-arrow" : "up-arrow")
                                : "external-link"
                        }
                        style={{
                            color: customColours.neutralHighContrast,
                            fontSize: 16
                        }} />
                </TouchableOpacity>

            </View>
            <Collapsible collapsed={this.state.collapsed}>
                <View style={[{
                    backgroundColor: customColours.contentBackground,
                    padding: (this.props.children && !this.props.noTitle) ? 20 : 0
                }, this.props.contentStyle]}>
                    {this.props.children}
                </View>
            </Collapsible>
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
        return <SchoolboxComponent
            collapsed={this.props.collapsed}
            title={this.props.title}
            contentStyle={{ backgroundColor: customColours.contentBackground }}
        >
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
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}
    >
        <ContentText>
            {renderHTMLText(props.content)}
        </ContentText>
    </SchoolboxComponent>
}

function SchoolboxLTI(props) {
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}>
        <WebView
            source={{ uri: props.url }}
            originWhitelist={['*']}
            style={{
                height: '100%',
                width: '100%'
            }}
            containerStyle={{
                height: 400
            }}
        />
    </SchoolboxComponent>
}

function SchoolboxTiles(props) {
    let tileWidth = props.tileWidth
    if (props.tileWidth.replaceAll('%', '') < 20) {
        tileWidth = '25%'
    }
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}
        noTitle={!Boolean(props.title)}
    >
        <View
            style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}
        >
            {
                props.tiles.map((tile, index) => {
                    let style = props.styles[index],
                        backgroundImageUrl,
                        backgroundImageUrlRegex;
                    if (style) {
                        backgroundImageUrlRegex = style.text.matchAll(/background-image\s*:\s*url\("([^"]*)"\)/g).next().value;
                        backgroundImageUrl = backgroundImageUrlRegex && backgroundImageUrlRegex[1]
                    }
                    let tileTitle = tile.querySelector('span.title');
                    let tileLink = tile.querySelector('a.tile-link');
                    let tileHref = tileLink && tileLink.attributes.href;
                    let justifyContent = tileTitle.classList.contains("text-bottom")
                        ? "flex-end"
                        : (
                            tileTitle.classList.contains("text-middle")
                                ? 'center'
                                : 'flex-start'
                        );
                    let textAlign = tileTitle.classList.contains("text-right")
                        ? 'right'
                        : (
                            tileTitle.classList.contains("text-left")
                                ? 'left'
                                : 'center'
                        )
                    let tileTitleColor,
                        tileTitleBgColor,
                        _a,
                        _b,
                        _ca,
                        _da;

                    let colorStyleRegex = style.text
                        .replaceAll(/\s{2,}/g, ' ')
                        .matchAll(/color\s*:\s*(rgba\(\s*\d+.?\d*\s*,\s*\d+.?\d*\s*,\s*\d+.?\d*\s*,\s*\d+.?\d*\s*\))/g)
                    if (colorStyleRegex[Symbol.iterator]) {
                        [_a, _b, [_ca, tileTitleColor], [_da, tileTitleBgColor]] = colorStyleRegex
                    }
                    return <View
                        style={{
                            width: tileWidth
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={tileHref ? 0.5 : 1}
                            onPress={_ => {
                                tileHref
                                    ? openURL(tileHref)
                                    : null
                            }}
                        >
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: 100,
                                    justifyContent
                                }}
                                resizeMode="contain"
                                source={{ url: serviceURL + backgroundImageUrl }}
                            >
                                <ContentText
                                    style={{
                                        textAlign,
                                        color: tileTitleColor,
                                        backgroundColor: tileTitleBgColor,
                                        width: '100%'
                                    }}
                                >
                                    {tileTitle.text}
                                </ContentText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                }
                )
            }
        </View>
    </SchoolboxComponent>
}

class SchoolboxSocialStream_Post extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    onProfilePress = () => {
        openURL(this.props.profileURL)
    }
    render() {
        return <View
            style={{
                borderTopColor: customColours.neutralLowContrast,
                borderTopWidth: this.props.index ? 1 : 0, // only on all but first
                backgroundColor: this.props.layer ? customColours.homepageSocialStream : 'transparent'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={this.onProfilePress}
                >

                    <Image
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        source={{ uri: serviceURL + this.props.authorImageURL }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        flexWrap: 'wrap', // incase stuff is too long
                        paddingHorizontal: 20
                    }}
                >
                    <TouchableOpacity
                        hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
                        onPress={this.onProfilePress}
                    >

                        <ContentText
                            style={{
                                color: customColours.link,
                                fontSize: 14,
                                marginRight: 10 // force it to go on a newline if too close
                            }}
                        >
                            {this.props.postAuthor}
                        </ContentText>
                    </TouchableOpacity>
                    <Meta>
                        {this.props.postMetaText}
                    </Meta>
                </View>
            </View>
            <View
                style={{
                    paddingLeft: 70,
                    paddingRight: 10
                }}
            >
                <ContentText>
                    {renderHTMLText(this.props.postContentHTML)}
                </ContentText>

            </View>
            <View
                style={{
                    borderLeftWidth: 10,
                    borderLeftColor: customColours.neutralHighContrast,
                    marginLeft: this.props.layer == 1 ? 15 : 0
                }}
            >
                {this.props.postReplies && this.props.postReplies.map(this.props.renderPost.bind(null, this.props.layer + 1))}
            </View>
        </View>
    }
}

class SchoolboxSocialStream extends Component {
    constructor(props) {
        super(props)
        this.state = { threads: [] }
    }
    renderPost = (layer = 0, i, index, _a, _b) => {
        if (!i.querySelector) {
            return
        }
        let authorImage = i.querySelector("img") // gets first image
        let authorImageURL = authorImage && authorImage.attributes.src.replaceAll("square32", "square64") // higher quality images
        if (!layer) {
            var postMetaElem = i.querySelector(":is(img,a) + p")
            var postAuthor = postMetaElem && postMetaElem.childNodes.map(i => i.nodeType == 3 ? i.text.trim() : "").join("");
            var postMetaText = postMetaElem && postMetaElem.childNodes.map(i => i.nodeType == 1 ? i.text.trim() : "").join("");
        } else {
            var postMetaElem = i.querySelector("a + p")
            var postAuthor = postMetaElem && postMetaElem.querySelector("a").text.trim()
            var postMetaText = postMetaElem && postMetaElem.querySelector("span").text.trim()
        }
        var postAuthorHrefElem = i.querySelector("a[href*=/search/user]")
        var postAuthorHref = postAuthorHrefElem && postAuthorHrefElem.attributes.href

        let postContentHTML = i.querySelector("[data-body]").innerHTML;

        let postRepliesUL = i.querySelector("ul")
        let postReplies = postRepliesUL && postRepliesUL.childNodes//.filter(i => i.nodeType == 1)

        return <SchoolboxSocialStream_Post
            postReplies={postReplies}
            profileURL={postAuthorHref}
            postMetaText={postMetaText}
            postAuthor={postAuthor}
            postContentHTML={postContentHTML}
            authorImageURL={authorImageURL}
            index={index}
            layer={layer}
            renderPost={this.renderPost}
        />
    }
    componentDidMount = () => {
        if (this.props.cid && this.props.homepage) {
            fetchHTMLResource(`/socialstream/threads/threads.php?instanceId=${this.props.cid}&homepageId=${this.props.homepage}&start=0&offset=5`)
                .then(d => {
                    this.setState({
                        threads: d.childNodes.map(this.renderPost.bind(null, 0))
                    })
                })
        }
    }

    render() {

        return <SchoolboxComponent
            title={this.props.title}
            collapsed={this.props.collapsed}
            contentStyle={{
                padding: 0
            }}
        >
            <View>
                {this.state.threads}
            </View>
        </SchoolboxComponent>
    }
}

// class UserList extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {}
//     }
//     renderItem = ({ item }, a, b, c, d) => {
//         return <View
//             style={{
//                 flexDirection: 'row',
//                 borderBottomColor: customColours.neutralLowContrast,
//                 borderBottomWidth: 1,
//                 alignItems: 'center',
//                 justifyContent: 'flex-start'
//             }}
//         >
//             <Image
//                 style={{
//                     width: 50,
//                     height: 50,
//                     margin: 0
//                 }}
//                 source={{ uri: `${serviceURL}/portrait.php?id=${item.id}&size=square64` }}
//             />
//             <View>
//                 <View
//                     style={{
//                         flexDirection: 'column',
//                         paddingHorizontal: 20,
//                     }}
//                 >
//                     <UserLinkComponent
//                         style={{
//                             margin: 0
//                         }}
//                         id={item.id}
//                         userName={item.name}
//                     />
//                     {
//                         item.meta
//                             ? <Meta
//                                 style={{
//                                     // flexDirection: 'row',
//                                     flexWrap: 'wrap',
//                                     flex: 1,
//                                     marginRight: 50
//                                 }}
//                             >{item.meta}</Meta>
//                             : null
//                     }
//                 </View>
//             </View>

//         </View>

//     }
//     keyExtractor(a, b) {
//         return a + b
//     }
//     render() {
//         return <FlatList
//             data={this.props.users}
//             renderItem={this.props.renderItem || this.renderItem}
//             keyExtractor={this.keyExtractor}
//         />
//     }
// }

class SchoolboxUserList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <SchoolboxComponent
            title={this.props.title}
            collapsed={this.props.collapsed}
            contentStyle={{
                padding: 0
            }}
        >
            <UserList
                users={this.props.users}
            />
        </SchoolboxComponent>
    }
}

class SchoolboxLinks_Link extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onPress = () => {
        openURL(this.props.url)
    }

    render() {
        return <TouchableOpacity
            onPress={this.onPress}
            activeOpacity={0.5}
            style={{
                padding: 10,
                borderBottomColor: customColours.neutralLowContrast,
                borderBottomWidth: this.props.isLast ? 0 : 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <IconComponent
                name={(this.props.type == "file") ? "document" : "link"}
                style={{
                    marginRight: 10,
                    fontSize: 20
                }}
            />
            <ContentText
                style={{
                    color: customColours.link
                }}
            >
                {this.props.text}
            </ContentText>
        </TouchableOpacity>
    }
}

class SchoolboxLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderListItem = ({ item: { url, text, isLast } }) => {
        return <SchoolboxLinks_Link
            type={this.props.type}
            url={url}
            text={text.trim ? text.trim() : ""}
            isLast={isLast}
        />
    }

    keyExtractor(a, b) {
        return a + b
    }

    render() {
        return <SchoolboxComponent
            collapsed={this.props.collapsed}
            title={this.props.title}
            noTitle={!Boolean(this.props.title)}
            contentStyle={{
                padding: 0
            }}
        >
            <FlatList
                renderItem={this.renderListItem}
                keyExtractor={this.keyExtractor}
                data={this.props.links}
            />
        </SchoolboxComponent>
    }
}

class HomepageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { components: [], name: "", breadcrumbs: [], url: "" };
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
                let maxLength = 27;
                this.setState({ name: pageTitle })
                pageTitle = (pageTitle.length > maxLength)
                    ? pageTitle.slice(0, maxLength - 3) + "..."
                    : pageTitle

                this.props.navigation.setOptions({ title: pageTitle })
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
                    else if (i.classList.contains("Component_Homepage_ClassListController") || i.classList.contains("Component_Homepage_TeachersController")) {
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
                        console.log("HomepageScreen.js:577 says:", links);
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
                        console.log("HomepageScreen.js:577 says:", links);
                        this.state.components.push((
                            <SchoolboxLinks
                                type="file"
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
                this.setState({})
            })
    }
    render() {
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
                        state={this.state.components.length ? "loaded" : "loading"}
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
// TODO: Move Schoolbox Componenets to own file
// TODO: turn component list into flatlist
export default HomepageScreen;