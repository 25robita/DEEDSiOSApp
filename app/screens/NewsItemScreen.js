import React, { Component } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from '../../ThemeProvider';
import { ContentText } from "../components/ContentTextComponent";
import IconComponent from "../components/IconComponent";
import LoaderComponent from "../components/LoaderComponent";
import { Meta } from "../components/MetaTextComponent";
import { getRelativeTime } from "../components/NewsRow";
import UserLinkComponent from "../components/UserLinkComponent";
import { serviceURL } from "../consts";
import { fetchJSONResource } from "../getters/get";
import { newsItemAuthorLabel, newsItemNavigationTitlePrepend, sliceNavigationTitle } from "../lang";
import { openURL } from "../RootNavigation";
import { styles } from "../styles";
import ContentScreenTemplate, { HorizontalRule, HTMLTextView } from "./ContentScreenTemplate";

class NewsItemScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = { bodyDone: false, body: {} };
    }
    componentDidMount = () => {
        if (this.props.route.params.id) {
            this.setState({ body: {}, bodyDone: false })
            fetchJSONResource(`/news/${this.props.route.params.id}`, { headers: { Accept: "application/json" } })
                .then(body => {
                    this.setState({ body, bodyDone: true })
                    let title = sliceNavigationTitle(`${newsItemNavigationTitlePrepend} – ${body.article.title}`)
                    this.props.navigation.setOptions({
                        title,
                        headerRight: () =>
                            <TouchableOpacity
                                onPress={() => {
                                    openURL(`/news/${this.props.route.params.id}`, false)
                                }}
                            >
                                <IconComponent
                                    maxFontSizeMultiplier={1.2}
                                    id={"\ue921"}
                                    style={{
                                        fontSize: 20,
                                        color: this.context.colors.headerForeground,
                                        paddingRight: 20
                                    }} />
                            </TouchableOpacity>

                    })
                })
        }
    }
    render() {
        return <ContentScreenTemplate
            onRefresh={this.componentDidMount}
        >
            <View style={{ backgroundColor: this.context.colors.contentBackground, marginBottom: 70 }}>
                <LoaderComponent style={{ padding: 0 }} state={this.state.bodyDone ? "loaded" : "loading"}>
                    {this.state.body?.article?.featureImage ? <Image
                        source={{
                            uri: (
                                this.state.body?.article?.featureImage?._links?.image?.href?.startsWith?.("https")
                                    ? ""
                                    : serviceURL
                            ) + this?.state?.body?.article?.featureImage?._links?.image?.href
                        }}
                        style={{
                            width: "100%",
                            height: 250
                        }}
                        resizeMode='cover'
                    /> : null}
                    <View
                        style={{
                            paddingHorizontal: 15,
                            paddingTop: 15,
                            paddingBottom: 10
                        }}
                    >
                        <ContentText
                            style={styles.contentHeading}
                        >
                            {this.state.body?.article?.title}
                        </ContentText>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10
                            }}
                        >
                            <UserLinkComponent
                                textBefore={newsItemAuthorLabel}
                                isMeta={true}
                                userName={this.state.body?.article?.author?.fullName}
                                id={this.state.body?.article?.author?._links?.profile?.href?.match?.(/\d+/g)}
                            />
                            <Meta>
                                {getRelativeTime(this.state.body?.article?.publishAt?.unixTimestamp)}
                            </Meta>
                        </View>
                        <HorizontalRule />
                        <HTMLTextView
                            style={{
                                paddingHorizontal: 5,
                                paddingTop: 5,
                                marginBottom: 0
                            }}
                        >
                            {this.state.body?.article?.body}
                        </HTMLTextView>
                    </View>
                </LoaderComponent>
            </View>
        </ContentScreenTemplate>
    }
}

export default NewsItemScreen;