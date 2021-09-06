import React, { Component } from 'react';
import { Appearance, FlatList, TouchableOpacity, View } from 'react-native';
import { coloursDark, coloursLight } from '../colours';
import { fetchJSONResource } from '../getters/get';
import { homepageNewsFailTextLabel, homepageNewsTitle, newsItemAuthorLabel } from '../lang';
import { renderHTMLText } from '../renderHTML';
import { getCurrentRoute, push } from '../RootNavigation';
import { newsStyles, styles } from '../styles';
import { ContentText } from './ContentTextComponent';
import IconComponent from './IconComponent';
import LoaderComponent from './LoaderComponent';
import { Meta } from './MetaTextComponent';
import SectionComponent from './SectionComponent';
import TimeComponent from './TimeComponent';
import UserLinkComponent from './UserLinkComponent';

export function getRelativeTime(unix) {
    if (!unix) return;
    let totalSeconds = (new Date() / 1000) - new Date(unix);
    let years = Math.floor(totalSeconds / 31_536_000); // divide by seconds in a year and floor
    if (years) return `${years} year${years == 1 ? '' : 's'} ago`;
    let months = Math.floor(totalSeconds / 2_628_000); // divide by seconds in a month
    if (months) return `${months} month${months == 1 ? '' : 's'} ago`;
    let weeks = Math.floor(totalSeconds / 604_800);// divide by seconds in a week
    if (weeks) return `${weeks} week${weeks == 1 ? '' : 's'} ago`;
    let days = Math.floor(totalSeconds / 86_400);
    if (days) return `${days} day${days == 1 ? '' : 's'} ago`;
    let hours = Math.floor(totalSeconds / 3_600);
    if (hours) return `${hours} hour${hours == 1 ? '' : 's'} ago`;
    let minutes = Math.floor(totalSeconds / 60);
    if (minutes) return `${minutes} minute${minutes == 1 ? '' : 's'} ago`;
    let seconds = Math.floor(totalSeconds);
    return `${seconds} second${seconds == 1 ? '' : 's'} ago`;

}

class NewsItem extends Component {
    constructor(props) {
        super(props)
    }
    handlePress = () => {
        (['News', 'Homepage'].includes(getCurrentRoute().name)) ? null : push("News");
        push("News Item", {
            id: this.props.data.id
        })
    }
    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress}>
                <View
                    style={[
                        newsStyles.newsItem, {
                            backgroundColor: customColours.contentBackground
                        },
                        styles.shadow,
                        {
                            backgroundColor: this.props.data.sticky
                                ? (customColours.newsItemPinnedBackground || customColours.themeSeconday)
                                : (customColours.newsItemBackground || customColours.contentBackground)
                        }]
                    }
                >
                    <ContentText
                        style={[
                            newsStyles.newsTitle,
                            {
                                color: customColours.link
                            }
                        ]}
                    >
                        {
                            this.props.data.sticky
                                ? (
                                    <ContentText>
                                        <IconComponent
                                            name="pin"
                                            style={{
                                                fontSize: 16,
                                                marginLeft: 10
                                            }}
                                        />  </ContentText>)
                                : null
                        }
                        {this.props.data.title}
                    </ContentText>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: "center"
                    }}>
                        <UserLinkComponent
                            id={this.props.data?.author?.id || this.props.data?.author?._links?.profile?.href?.match?.(/\d+/g)}
                            userName={this.props.data?.author?.fullName || this.props.data?.author?.fullname}
                            isMeta={true}
                            textBefore={newsItemAuthorLabel}
                            style={{
                                marginRight: 10
                            }}
                        />
                        <TimeComponent
                            date={true}
                            time={
                                this.props.data?.publishAt?.relativeTime
                                || getRelativeTime(this.props.data?.publishAt?.unixTimestamp)
                            }
                        />
                    </View>
                    {
                        this.props.data.blurb
                            ? <ContentText>{renderHTMLText(this.props.data.blurb)}</ContentText>
                            : <View>{renderHTMLText(this.props.data.body)}</View>
                    }
                    {
                        this.props.data.attachments
                            ? <Meta style={{ marginTop: 5 }}>
                                {this.props.data.attachments} {(this.props.data.attachments == 1) ? "attachment" : "attachments"}
                            </Meta>
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

class NewsList extends Component {
    state = {
        feed: false,
        isEmpty: false,
        willUpdate: false,
        willUpdateCh2: false,
        showActivity: false
    }
    constructor(props) {
        super(props)
        this.props.addRefreshListener
            && this.props.addRefreshListener(_ => {
                console.log("NewsRow.js:69 says:", "hello");
                this.setState({}) // update
            })
    }
    componentDidMount() {
        fetchJSONResource(this.props.url || "/news/lists/feed")
            .then(data => {
                this.setState({
                    feed: data.slice(0, this.props.number), // maxlength 3
                    showActivity: false
                })
            })
    }
    componentDidUpdate() {
        if (this.state.willUpdate) {
            this.state.willUpdate = false
            return
        }
        if (this.state.willUpdateCh2) {
            this.state.willUpdateCh2 = false
            return
        }
        this.state.willUpdateCh2 = true
        this.setState({ showActivity: true })
        this.state.willUpdate = true
        fetchJSONResource(this.props.url || "/news/lists/feed")
            .then(data => {
                this.setState({
                    feed: data.slice(0, this.props.number), // maxlength 3
                    showActivity: false,
                    isEmpty: !Boolean(data.length)
                })
            })
    }
    keyExtractor(index, item) {
        return index + item
    }
    handleRenderNewsItem({ item }) {
        return (
            <NewsItem data={item} />
        )
    }
    render() {
        return (
            <View>
                {
                    (this.state.feed || !this.state.isEmpty)
                        ?
                        <LoaderComponent
                            state={
                                !(this.state.feed || this.state.isEmpty) || this.state.showActivity
                                    ? "loading"
                                    : (this.state.isEmpty ? "failed" : "loaded")}
                            failText={homepageNewsFailTextLabel}
                        >
                            <FlatList
                                scrollEnabled={false}
                                data={this.state.feed}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.handleRenderNewsItem}
                                style={{ overflow: "visible" }}
                            />
                        </LoaderComponent>
                        : null
                }
            </View>

        );
    }

}

export { NewsList };

export default function NewsRow() {
    return <SectionComponent
        title={homepageNewsTitle}
        navigatorName="News"
    >
        <NewsList number={3} />
    </SectionComponent>
}