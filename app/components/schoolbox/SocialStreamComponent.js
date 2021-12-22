import React, { useContext } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import { Component } from 'react/cjs/react.production.min';
import { ThemeContext } from '../../../ThemeProvider';
// import { customColours } from '../../colours';
import { serviceURL } from '../../consts';
import { fetchHTMLResource } from '../../getters/get';
import { socialStreamFailTextLabel, socialStreamLoadAllLabel, socialStreamLoadMoreLabel, socialStreamPostLabel, socialStreamPostSubmitLabel, socialStreamUrlLabel } from '../../lang';
import { postSocialStream } from '../../posters/socialStream';
import { renderHTMLText } from '../../renderHTML';
import { openURL } from '../../RootNavigation';
import { ContentText } from '../ContentTextComponent';
import LoaderComponent from '../LoaderComponent';
import { Meta } from '../MetaTextComponent';
import SchoolboxComponent from './SchoolboxComponent';

function SchoolboxSocialStream_Post(props) {
    const { colors } = useContext(ThemeContext);
    return (
        <ContextMenu
            actions={[
                {
                    title: "Delete",
                    destructive: true,
                },
                {
                    title: "Reply"
                }
            ]}
        >
            <View
                style={{
                    borderBottomColor: colors.neutralLowContrast,
                    borderBottomWidth: 1,
                    backgroundColor: props.layer ? colors.homepageSocialStream : 'transparent'
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
                        onPress={() => openURL(props.profileURL)}
                    >
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                            }}
                            source={{ uri: serviceURL + props.authorImageURL }}
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
                            onPress={() => openURL(props.profileURL)}
                        >
                            <ContentText
                                style={{
                                    color: colors.link,
                                    fontSize: 14,
                                    marginRight: 10 // force it to go on a newline if too close
                                }}
                            >
                                {props.postAuthor}
                            </ContentText>
                        </TouchableOpacity>
                        <Meta>
                            {props.postMetaText}
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
                        {renderHTMLText(props.postContentHTML)}
                    </ContentText>
                </View>
                <View
                    style={{
                        borderLeftWidth: 10,
                        borderLeftColor: colors.neutralHighContrast,
                        marginLeft: props.layer == 1 ? 15 : 0
                    }}
                >
                    {props.postReplies && props.postReplies.map(props.renderPost.bind(null, props.layer + 1))}
                </View>
            </View>
        </ContextMenu>
    )

}




class SchoolboxSocialStream_MakePost extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            url: ''
        }
    }

    sendPost = () => {
        this.setState({ body: '', url: "" })
        postSocialStream(
            this.props.homepage,
            this.props?.cid,
            this.state?.body,
            this.state?.url,
            this.props?.parent,
            this.props?.root
        )
        this.props?.refresh?.(); // refresh if a refresher exists
    }

    handleUpdateBody = ({ nativeEvent: { text } }) => {
        this.setState({
            body: text
        })
    }

    handleUpdateURL = ({ nativeEvent: { text } }) => {
        this.setState({
            url: text
        })
    }

    render() {
        return <View
            style={{
                paddingHorizontal: 25,
                paddingVertical: 20,
                backgroundColor: this.context.colors.background
            }}
        >
            <TextInput
                style={{
                    borderColor: this.context.colors.themeSeconday,
                    borderWidth: 1,
                    backgroundColor: this.context.colors.contentBackground,
                    padding: 10,
                    paddingTop: 10, // needs to be overridden for some reason
                    color: this.context.colors.foreground,
                    maxHeight: 16 * 7,
                    overflow: 'scroll'
                }}
                placeholder={socialStreamPostLabel}
                placeholderTextColor={this.context.colors.neutralLowContrast}
                multiline={true}
                onChange={this.handleUpdateBody}
                value={this.state.body}
            />
            <TextInput
                style={{
                    borderColor: this.context.colors.themeSeconday,
                    borderWidth: 1,
                    backgroundColor: this.context.colors.contentBackground,
                    padding: 10,
                    paddingTop: 10, // needs to be overridden for some reason
                    color: this.context.colors.foreground,
                    marginTop: 15,
                }}
                placeholder={socialStreamUrlLabel}
                placeholderTextColor={this.context.colors.neutralLowContrast}
                onChange={this.handleUpdateURL}
                value={this.state.url}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    marginTop: 15
                }}
                onPress={this.sendPost}
            >
                <View
                    style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.context.colors.link
                    }}
                >
                    <ContentText
                        style={{
                            fontWeight: "600",
                            color: this.context.colors.foregroundContrast
                        }}
                    >
                        {socialStreamPostSubmitLabel}
                    </ContentText>
                </View>
            </TouchableOpacity>
        </View>

    }
}

export default class SchoolboxSocialStream extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props)
        this.state = { threads: [], done: false, threadDone: false }
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
    updatePosts = (limit = 5, start = 0, append = false) => {
        if (this.props.cid && this.props.homepage) {
            this.setState({ threads: append ? this.state.threads : [] }) //  if not appending then clear previous ones as to not cause an issue
            fetchHTMLResource(
                `/socialstream/threads/threads.php?\
            instanceId=${this.props?.cid}\
            &homepageId=${this.props?.homepage}\
            &start=${start}\
            &offset=${limit}`
            )
                .then(d => {
                    let threads = d.childNodes.map(this.renderPost.bind(null, 0)).filter(i => i);
                    let threadDone = (threads.length < limit) || !limit; // if not as many posts as limit, it could not find any more and is therefore done

                    this.state.threads.push(...threads);
                    this.setState({ done: true, threadDone, threads: this.state.threads });
                }, this.setState.bind(this, { done: true }))
        }
    }
    componentDidMount = () => {
        this.updatePosts()
    }

    loadMore = () => {
        console.log("SocialStreamComponent.js:284 says:", this.state.threads.length);
        this.updatePosts(5, this.state.threads.length, true)
    }

    render() {
        return <SchoolboxComponent
            title={this.props.title}
            collapsed={this.props.collapsed}
            contentStyle={{
                padding: 0
            }}
        >
            <SchoolboxSocialStream_MakePost
                cid={this.props?.cid}
                homepage={this.props?.homepage}
                refresh={this.updatePosts}
            />
            <LoaderComponent
                failText={socialStreamFailTextLabel}
                state={
                    this.state?.threads?.length
                        ? "loaded"
                        : (
                            this.state.done
                                ? "failed"
                                : 'loading'
                        )
                }
            >
                <FlatList
                    data={this.state.threads}
                    keyExtractor={(a, b) => a + b}
                    renderItem={({ item }) => item /* TODO: fix this its bad */}
                />
            </LoaderComponent>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    display: this.state.threadDone ? "none" : 'flex'
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.updatePosts.bind(this, 0, 0, false)}
                    style={{
                        padding: 10,
                        backgroundColor: this.context.colors.contentBackground,
                    }}
                >
                    <ContentText
                        style={{
                            color: this.context.colors.link,
                            fontWeight: '600'
                        }}
                    >
                        {socialStreamLoadAllLabel}

                    </ContentText>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.loadMore}
                    style={{
                        padding: 10,
                        backgroundColor: this.context.colors.contentBackground,
                    }}
                >
                    <ContentText
                        style={{
                            color: this.context.colors.link,
                            fontWeight: '600'
                        }}
                    >
                        {socialStreamLoadMoreLabel}

                    </ContentText>
                </TouchableOpacity>
            </View>
        </SchoolboxComponent>
    }
}