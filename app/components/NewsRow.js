import React, { Component } from 'react';
import { FlatList, View, Text, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { newsStyles, styles } from '../styles';
import { fetchJSONResource } from '../getters/get';
import { ContentText, Meta, SectionHeading } from './TextComponents';
import IconComponent from './IconComponent';
import LoaderComponent from './LoaderComponent';
import TimeComponent from './TimeComponent';
import SectionComponent from './SectionComponent';
import { dispatch, getCurrentRoute, navigate, push } from '../RootNavigation';
import { CommonActions } from '@react-navigation/native';
import { renderHTMLText } from '../renderHTML';
import { customColours } from '../colours';


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
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress}>
                <View style={[newsStyles.newsItem, styles.shadow, { backgroundColor: this.props.data.sticky ? (customColours.newsItemPinnedBackground || customColours.themeSeconday) : (customColours.newsItemBackground || customColours.contentBackground) }]}>
                    <ContentText style={[newsStyles.newsTitle]}>{this.props.data.sticky ? (<ContentText><IconComponent name="pin" style={{ fontSize: 16, marginLeft: 10 }} />  </ContentText>) : null}{this.props.data.title}</ContentText>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: "center"
                    }}>
                        <Meta>By <ContentText style={[{ color: customColours.link }]}>{this.props.data.author.fullname || this.props.data.author.fullName}  </ContentText></Meta>
                        <TimeComponent date={true} time={this.props.data.publishAt.relativeTime} />
                    </View>
                    {
                        this.props.data.blurb
                            ? <ContentText>{this.props.data.blurb}</ContentText>
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
                            failText="No news could be found at the moment"
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
    return <SectionComponent title="news" navigatorName="News">
        <NewsList number={3} />
    </SectionComponent>
}