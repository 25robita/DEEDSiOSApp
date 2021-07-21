import React, { Component } from 'react';
import { FlatList, View, Text, ActivityIndicator, Linking, Pressable } from 'react-native';
import { customColours, newsStyles, styles } from '../consts';
import { fetchJSONResource } from '../getters/get';
import { ContentText, Meta, SectionHeading } from './TextComponents';
import IconComponent from './IconComponent';
import LoaderComponent from './LoaderComponent';
import TimeComponent from './TimeComponent';
import SectionComponent from './SectionComponent';

class NewsItem extends Component {
    constructor(props) {
        super(props)
        this.link = "https://deeds.cgs.vic.edu.au" + props.data._links.self.href
    }
    handlePress = () => {
        Linking.openURL(this.link)
    }
    render() {
        return (
            <Pressable onPress={this.handlePress}>
                <View style={[newsStyles.newsItem, styles.shadow, { backgroundColor: this.props.data.sticky ? customColours.lightBlue : "white" }]}>
                    <ContentText style={[newsStyles.newsTitle]}>{this.props.data.sticky ? (<ContentText><IconComponent name="pin" style={{ fontSize: 16, marginLeft: 10 }} />  </ContentText>) : null}{this.props.data.title}</ContentText>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: "center"
                    }}>
                        <Meta>By <ContentText style={[{ color: customColours.harshBlue }]}>{this.props.data.author.fullname}  </ContentText></Meta>
                        <TimeComponent date={true} time={this.props.data.publishAt.relativeTime} />
                    </View>
                    <ContentText>{this.props.data.blurb}</ContentText>
                </View>
            </Pressable>
        )
    }
}

class NewsRow extends Component {
    state = {
        feed: false,
        isEmpty: false,
        willUpdate: false,
        willUpdateCh2: false,
        showActivity: false
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        fetchJSONResource("/news/lists/feed")
            .then(data => {
                this.setState({
                    feed: data.slice(0, 3) // maxlength 3
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
        fetchJSONResource("/news/lists/feed")
            .then(data => {
                this.setState({
                    feed: data.slice(0, 3), // maxlength 3
                    showActivity: false
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
                        ? <SectionComponent title="news">
                            <LoaderComponent
                                state={
                                    !(this.state.feed || this.state.isEmpty) || this.state.showActivity
                                        ? "loading"
                                        : (this.state.isEmpty ? "failed" : "loaded")}
                                failText="Unable to load the news at the moment"
                            >
                                <FlatList
                                    scrollEnabled={false}
                                    data={this.state.feed}
                                    keyExtractor={this.keyExtractor}
                                    renderItem={this.handleRenderNewsItem}
                                    style={{ overflow: "visible" }}
                                />
                            </LoaderComponent>

                        </SectionComponent>
                        : null
                }
            </View>
        );
    }

}

export default NewsRow;