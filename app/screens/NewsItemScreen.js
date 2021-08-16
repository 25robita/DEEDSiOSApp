import React, { Component } from "react";
import { Image, View } from "react-native";
import { ContentText, Meta, SectionHeading } from "../components/TextComponents";
import { fetchJSONResource } from "../getters/get";
import { renderHTMLText } from "../renderHTML";
import { ScrollView } from "react-native-gesture-handler";
import LoaderComponent from "../components/LoaderComponent";
import { openURL } from "../RootNavigation";
import { serviceURL } from "../consts";
import { customColours } from "../colours";
import ContentScreenTemplate, { HorizontalRule, HTMLTextView } from "./ContentScreenTemplate";
import { styles } from "../styles";
import UserLinkComponent from "../components/UserLinkComponent";

// export function HorizontalRule(props) {
//     return <View style={{
//         width: "100%",
//         display: "flex",
//         alignItems: "center",
//     }}>
//         <View
//             style={[
//                 {
//                     borderBottomWidth: 1,
//                     borderBottomColor: customColours.neutralLowContrast,
//                     marginVertical: 15,
//                     width: "90%",

//                 },
//                 props.style]}
//         />
//     </View>
// }

// export function HTMLTextView(props) {
//     return <View style={[{ backgroundColor: customColours.contentBackground, marginBottom: 50 }, props.style]}>
//         {renderHTMLText(props.children)}
//     </View>
// }

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
                    title = "News Item – " + body.article.title
                    let maxTitleLength = 25;
                    let title = title.length > maxTitleLength ?
                        title.substring(0, maxTitleLength - 3) + "..." :
                        title;
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
                                textBefore='By'
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