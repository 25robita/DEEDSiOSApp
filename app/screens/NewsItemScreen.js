import React, { Component } from "react";
import { Image, View } from "react-native";
import { customColours } from "../colours";
import LoaderComponent from "../components/LoaderComponent";
import { ContentText } from "../components/TextComponents";
import UserLinkComponent from "../components/UserLinkComponent";
import { serviceURL } from "../consts";
import { fetchJSONResource } from "../getters/get";
import { newsItemAuthorLabel, newsItemNavigationTitlePrepend, sliceNavigationTitle } from "../lang";
import { styles } from "../styles";
import ContentScreenTemplate, { HorizontalRule, HTMLTextView } from "./ContentScreenTemplate";

class NewsItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { bodyDone: false, body: { article: { author: { fullName: "", _links: { profile: { href: "" } } }, title: "", featureImage: { _links: { image: { href: "" } } } } } };
    }
    componentDidMount = () => {
        if (this.props.route.params.id) {
            this.setState({ body: { article: { author: { fullName: "", _links: { profile: { href: "" } } } } }, bodyDone: false, featureImage: { _links: { image: { href: "" } } } })
            fetchJSONResource(`/news/${this.props.route.params.id}`, { headers: { Accept: "application/json" } })
                .then(body => {
                    this.setState({ body, bodyDone: true })
                    let title = sliceNavigationTitle(`${newsItemNavigationTitlePrepend} – ${body.article.title}`)
                    this.props.navigation.setOptions({ title })
                })
        }
    }
    render() {
        return (
            <ContentScreenTemplate
                onRefresh={this.componentDidMount}
            >
                <View style={{ backgroundColor: customColours.contentBackground, marginBottom: 70 }}>
                    <LoaderComponent style={{ padding: 0 }} state={this.state.bodyDone ? "loaded" : "loading"}>
                        {this.state.body.article.featureImage ? <Image
                            source={{ uri: (this.state.body.article.featureImage._links.image.href.startsWith("https") ? "" : serviceURL) + this.state.body.article.featureImage._links.image.href }}
                            style={{ width: "100%", height: 250 }}
                            resizeMode='cover'
                        /> : null}
                        <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10 }}>
                            <ContentText style={styles.contentHeading}>{this.state.body.article.title}</ContentText>
                            <UserLinkComponent
                                textBefore={newsItemAuthorLabel}
                                isMeta={true}
                                userName={this.state.body.article.author.fullName}
                                id={this.state.body.article.author._links.profile.href.match(/\d+/g)}
                            />
                            <HorizontalRule></HorizontalRule>
                            <HTMLTextView style={{ paddingHorizontal: 5, paddingTop: 5, marginBottom: 0 }}>{this.state.body.article.body}</HTMLTextView>
                        </View>
                    </LoaderComponent>
                </View>
            </ContentScreenTemplate>
        );
    }
}

export default NewsItemScreen;