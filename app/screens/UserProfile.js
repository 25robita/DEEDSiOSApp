import { getItemAsync } from "expo-secure-store";
import React, { Component } from "react";
import { Appearance, FlatList, Image, View } from "react-native";
import { ThemeContext } from '../../ThemeProvider';
import { coloursDark, coloursLight } from "../colours";
import { ContentText } from "../components/ContentTextComponent";
import LoaderComponent from "../components/LoaderComponent";
import { serviceURL } from "../consts";
import { fetchHTMLResource } from "../getters/get";
import { profileNavigationTitlePrepend, sliceNavigationTitle } from "../lang";
import { openURL } from "../RootNavigation";
import ScrollingScreenTemplate from "./ScrollingScreenTemplate";

class Table extends Component {
    constructor(props) {
        super(props)
    }
    renderRow({ item }) {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 5 }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }}><ContentText style={{ fontWeight: "700" }}>{item[0]}</ContentText></View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    {
                        item[1].type == "string"
                            ? <ContentText>{item[1].text}</ContentText>
                            : (
                                <ContentText
                                    onPress={
                                        _ => {
                                            openURL(
                                                item[1].type == "email"
                                                    ? `mailto:${item[1].text}`
                                                    : item[1].href
                                            )
                                        }
                                    }
                                    style={{ color: customColours.link }}
                                >
                                    {item[1].text}
                                </ContentText>
                            )
                    }
                </View>
            </View>
        );
    }

    keyExtractor(a, b) {
        return a + b
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
                scrollEnabled={false}
            />
        );
    }
}

class UserProfileScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = {
            failed: false,
            loaded: false,
            profileData: {},
            fullName: "",
            id: undefined,
            willUpdate: false
        }
    }
    componentDidMount = () => {
        if (this.props.route && this.props.route.params.id != undefined) {
            this.setState({ id: this.props.route.params.id })
        }
        else {
            getItemAsync("userMeta")
                .then(dataString => {
                    let data = JSON.parse(dataString)
                    if (!this.state.id)
                        this.setState({ id: data.schoolboxUser.id })
                })
        }
    }
    componentDidUpdate = () => {
        if (!this.state.willUpdate && this.state.id != undefined && !(this.state.loaded || this.state.failed)) {
            this.state.willUpdate = true
            this.updateUserPage()
        }
    }
    updateUserPage = () => {
        this.setState({ profileData: {}, fullName: "", loaded: false })
        fetchHTMLResource(`/search/user/${this.state.id}`)
            .then(d => {
                let profileList = d.querySelector(".profile") // may or may not work; also assumes in format dt, dd, dt, dd
                let profile = profileList.querySelectorAll("dd, dt")
                let profileData = {}
                for (let i = 0, j = 1; j < profile.length; i += 2, j += 2) {
                    let dt = profile[i];
                    let dd = profile[j];
                    let dataChildren = dd.childNodes.filter(i => i.nodeType == 1)
                    let isLink = dataChildren.length && dataChildren[0].tagName == "A";
                    let linkHref = isLink && dataChildren[0].attributes.href;
                    profileData[dt.text.trim()] = {
                        type: isLink ? (linkHref.startsWith("/mail") ? "email" : "link") : "string",
                        href: linkHref,
                        text: dd.text.trim()
                    }
                }

                let baseConfigScript = d.querySelectorAll("script[type='text/javascript']").filter(i => i.text.includes("let baseConfig"))
                let isStudent = Boolean(baseConfigScript.length)
                let baseConfigString = isStudent && baseConfigScript[0].text.matchAll(/student\s*:\s*(\{[^\}]*\})/g).next().value[1]
                let baseConfig = baseConfigString && JSON.parse(baseConfigString)
                if (baseConfig && !profileData["Student ID:"]) {
                    if (baseConfig.externalId)
                        profileData["Student ID:"] = {
                            type: "string",
                            text: baseConfig.externalId
                        }
                    let schoolYear = 12 - (profileData["Email:"].text.match(/\d+/g) - (new Date().getYear() - 100));
                    if (0 < schoolYear <= 12) {
                        profileData["Year:"] = {
                            type: "string",
                            text: schoolYear
                        }
                    }
                }

                let fullName = d.querySelector("#content h1").text.trim()

                fullName
                    ? this.props.navigation.setOptions({ title: sliceNavigationTitle(`${profileNavigationTitlePrepend} – ${fullName}`) })
                    : null

                this.setState({
                    profileData: Object.assign(
                        {},
                        profileData,
                        this.state.profileData
                    ),
                    loaded: true,
                    fullName
                })
            }, _ => {
                this.setState({ failed: true })
            })
        fetchHTMLResource(`/eportfolio/${this.state.id}/profile`)
            .then(d => {
                const houses = [
                    "Clifford",
                    "Derham",
                    "Macneil",
                    "Summons",
                    "Steven",
                    "Robinson",
                    "Bridgland",
                    "Scofield"
                ]

                let userCampuses = d.querySelector("#content p.meta").text.trim().split(', ');

                let house = userCampuses.filter(i => houses.includes(i))[0];
                if (house) {
                    this.setState({
                        profileData: Object.assign({
                            "House:": {
                                type: "string",
                                text: house
                            }
                        }, this.state.profileData)
                    })
                }

            })
    }
    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        return (
            <View>
                <ScrollingScreenTemplate
                    onRefresh={this.updateUserPage}
                >
                    <LoaderComponent
                        loaderStyle={{
                            marginTop: 50,
                            fontSize: 16
                        }}
                        failText="No user was found"
                        state={this.state.loaded ? "loaded" : (this.state.failed ? "failed" : "loading")}
                    >
                        {
                            this.state.loaded
                                ? (
                                    <View style={{ paddingVertical: 15 }}>
                                        <ContentText
                                            style={{
                                                fontSize: 30,
                                                marginHorizontal: 10
                                            }}
                                        >{this.state.fullName}</ContentText>
                                        <Image
                                            style={{
                                                height: 500,
                                                width: "100%"
                                            }}
                                            resizeMode='contain'
                                            source={{ uri: `${serviceURL}/portrait.php?id=${this.state.id}&size=constrain200` }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor: customColours.contentBackground,
                                                padding: 20,
                                                marginBottom: 20,
                                                paddingBottom: 10,
                                            }}
                                        >
                                            <Table
                                                data={Object.entries(this.state.profileData)}
                                            ></Table>
                                        </View>

                                    </View>
                                )
                                : null
                        }
                    </LoaderComponent>
                </ScrollingScreenTemplate>
            </View >
        );
    }
}

export default UserProfileScreen;