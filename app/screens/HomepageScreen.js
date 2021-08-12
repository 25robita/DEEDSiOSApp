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
<<<<<<< HEAD
            <Collapsible
                collapsed={this.state.collapsed}
            >
                <View
                    style={[
                        {
                            backgroundColor: customColours.contentBackground,
                            padding: (this.props.children && !this.props.noTitle) ? 20 : 0
                        },
                        this.props.contentStyle
                    ]}
                >
                    {this.props.children || null}
                </View>
            </Collapsible>
=======
            <View style={[{
                display: this.state.collapsed ? "none" : undefined,
                backgroundColor: customColours.contentBackground,
                padding: 20,
            }, this.props.contentStyle]}>
                {this.props.children}
            </View>
>>>>>>> parent of 9aae16e (Various things)
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
                && <NewsList
                    url={this.state.url}
                />
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

<<<<<<< HEAD
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
                                    && openURL(tileHref)
                            }}
                        >
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: 100,
                                    justifyContent
                                }}
                                resizeMode="contain"
                                source={{ url: "https://deeds.cgs.vic.edu.au" + backgroundImageUrl }}
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
                borderTopColor: customColours.lightGrey,
                borderTopWidth: this.props.index ? 1 : 0, // only on all but first
                backgroundColor: this.props.layer ? '#fafafa' : 'transparent'
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
                        source={{ uri: "https://deeds.cgs.vic.edu.au" + this.props.authorImageURL }}
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
                                color: customColours.harshBlue,
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
                    borderLeftColor: customColours.grey,
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

        // return <View
        //     style={{
        //         borderTopColor: customColours.lightGrey,
        //         borderTopWidth: index ? 1 : 0, // only on all but first
        //         backgroundColor: layer ? '#fafafa' : 'transparent'
        //     }}
        // >
        //     <View
        //         style={{
        //             flexDirection: 'row',
        //             alignItems: 'center'
        //         }}
        //     >
        //         <TouchableOpacity
        //             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        //             onLoad={ }
        //         >
        //             <Image
        //                 style={{
        //                     width: 50,
        //                     height: 50,
        //                 }}
        //                 source={{ uri: "https://deeds.cgs.vic.edu.au" + authorImageURL }}
        //             />
        //         </TouchableOpacity>
        //         <View
        //             style={{
        //                 flexDirection: 'row',
        //                 justifyContent: 'space-between',
        //                 flex: 1,
        //                 flexWrap: 'wrap', // incase stuff is too long
        //                 paddingHorizontal: 20
        //             }}
        //         >
        //             <ContentText
        //                 style={{
        //                     color: customColours.harshBlue,
        //                     fontSize: 14,
        //                     marginRight: 10 // force it to go on a newline if too close
        //                 }}
        //             >
        //                 {postAuthor}
        //             </ContentText>
        //             <Meta>
        //                 {postMetaText}
        //             </Meta>
        //         </View>
        //     </View>
        //     <View
        //         style={{
        //             paddingLeft: 70,
        //             paddingRight: 10
        //         }}
        //     >
        //         <ContentText>
        //             {renderHTMLText(postContentHTML)}
        //         </ContentText>

        //     </View>
        //     <View
        //         style={{
        //             borderLeftWidth: 10,
        //             borderLeftColor: customColours.grey,
        //             marginLeft: layer == 1 ? 15 : 0
        //         }}
        //     >
        //         {postReplies && postReplies.map(this.renderPost.bind(null, layer + 1))}
        //     </View>
        // </View>

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

=======
>>>>>>> parent of 9aae16e (Various things)
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
                                    && <IconComponent
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