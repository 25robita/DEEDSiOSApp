import { Image, TouchableOpacity, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { customColours } from '../../colours';
import { ContentText } from '../ContentTextComponent';
import { Meta } from '../MetaTextComponent';
import SchoolboxComponent from './SchoolboxComponent';
import { serviceURL } from '../../consts';
import { fetchHTMLResource } from '../../getters/get';
import { renderHTMLText } from '../../renderHTML';
import { openURL } from '../../RootNavigation';
import React from 'react';

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

export default class SchoolboxSocialStream extends Component {
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