import React, { Component, useContext } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
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
    let years = Math.floor(totalSeconds / 31536000); // divide by seconds in a year and floor
    if (years) return `${years} year${years == 1 ? '' : 's'} ago`;
    let months = Math.floor(totalSeconds / 2628000); // divide by seconds in a month
    if (months) return `${months} month${months == 1 ? '' : 's'} ago`;
    let weeks = Math.floor(totalSeconds / 604800);// divide by seconds in a week
    if (weeks) return `${weeks} week${weeks == 1 ? '' : 's'} ago`;
    let days = Math.floor(totalSeconds / 86400);
    if (days) return `${days} day${days == 1 ? '' : 's'} ago`;
    let hours = Math.floor(totalSeconds / 3600);
    if (hours) return `${hours} hour${hours == 1 ? '' : 's'} ago`;
    let minutes = Math.floor(totalSeconds / 60);
    if (minutes) return `${minutes} minute${minutes == 1 ? '' : 's'} ago`;
    let seconds = Math.floor(totalSeconds);
    return `${seconds} second${seconds == 1 ? '' : 's'} ago`;

}

function NewsItem(props) {
    const { colors } = useContext(ThemeContext);

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {
            (['News', 'Homepage'].includes(getCurrentRoute().name)) ? null : push("News");
            push("News Item", {
                id: props.data.id
            })
        }}>
            <View
                style={[
                    newsStyles.newsItem, {
                        backgroundColor: colors.contentBackground
                    },
                    styles.shadow,
                    {
                        backgroundColor: props.data.sticky
                            ? (colors.newsItemPinnedBackground || colors.themeSeconday)
                            : (colors.newsItemBackground || colors.contentBackground)
                    }]
                }
            >
                <ContentText
                    style={[
                        newsStyles.newsTitle,
                        {
                            color: colors.link
                        }
                    ]}
                >
                    {
                        props.data.sticky
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
                    {props.data.title}
                </ContentText>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: "center"
                }}>
                    <UserLinkComponent
                        id={props.data?.author?.id || props.data?.author?._links?.profile?.href?.match?.(/\d+/g)}
                        userName={props.data?.author?.fullName || props.data?.author?.fullname}
                        isMeta={true}
                        textBefore={newsItemAuthorLabel}
                        style={{
                            marginRight: 10
                        }}
                    />
                    <TimeComponent
                        date={true}
                        time={
                            props.data?.publishAt?.relativeTime
                            || getRelativeTime(props.data?.publishAt?.unixTimestamp)
                        }
                    />
                </View>
                {
                    props.data.blurb
                        ? <ContentText>{renderHTMLText(props.data.blurb)}</ContentText>
                        : <View>{renderHTMLText(props.data.body)}</View>
                }
                {
                    props.data.attachments
                        ? <Meta style={{ marginTop: 5 }}>
                            {props.data.attachments} {(props.data.attachments == 1) ? "attachment" : "attachments"}
                        </Meta>
                        : null
                }
            </View>
        </TouchableOpacity>
    )
}

// class NewsItem extends Component {
//     constructor(props) {
//         super(props)
//     }
//     handlePress = () => {
//         (['News', 'Homepage'].includes(getCurrentRoute().name)) ? null : push("News");
//         push("News Item", {
//             id: this.props.data.id
//         })
//     }
//     render() {
//         let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;

//     }
// }

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