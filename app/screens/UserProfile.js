import React, { Component } from "react";
import { FlatList, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LoaderComponent from "../components/LoaderComponent";
import { ContentText } from "../components/TextComponents";
import { customColours } from "../consts";
import { fetchHTMLResource } from "../getters/get";
import { openURL } from "../RootNavigation";

class Table extends Component {
    constructor(props) {
        super(props)
    }
    renderRow({ item }) {
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
                                    style={{ color: customColours.harshBlue }}
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
        console.log("UserProfile.js:25 says:", this.props.data);
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
    constructor(props) {
        super(props);
        this.state = { failed: false, loaded: false, profileData: {}, fullName: "" }
    }
    componentDidMount = () => {
        if (this.props.route && this.props.route.params.id != undefined) {
            fetchHTMLResource(`/search/user/${this.props.route.params.id}`)
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
                        profileData[dt.innerText.trim()] = {
                            type: isLink ? (linkHref.startsWith("/mail") ? "email" : "link") : "string",
                            href: linkHref,
                            text: dd.innerText.trim()
                        }
                    }

                    let baseConfigScript = d.querySelectorAll("script[type='text/javascript']").filter(i => i.innerText.includes("let baseConfig"))
                    let isStudent = Boolean(baseConfigScript.length)
                    let baseConfigString = isStudent && baseConfigScript[0].innerText.matchAll(/student\s*:\s*(\{[^\}]*\})/g).next().value[1]
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

                    let fullName = d.querySelector("#content h1").innerText.trim()

                    fullName
                        ? this.props.navigation.setOptions({ title: `Profile – ${fullName}` })
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
                    console.log("UserProfile.js:122 says:", "hello");
                    this.setState({ failed: true })
                })
            fetchHTMLResource(`/eportfolio/${this.props.route.params.id}/profile`)
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

                    let userCampuses = d.querySelector("#content p.meta").innerText.trim().split(', ');

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
    }
    render() {
        console.log("UserProfile.js:146 says:", this.state.profileData["House:"]);
        console.log("UserProfile.js:155 says:", this.state.failed);
        return (
            <View>
                <LoaderComponent
                    loaderStyle={{
                        marginTop: 50,
                        // transform: [{
                        //     scale: 1.1
                        // }]
                        fontSize: 16
                    }}
                    failText="No user was found"
                    state={this.state.loaded ? "loaded" : (this.state.failed ? "failed" : "loading")}
                >
                    {
                        this.state.loaded
                            ? (
                                <ScrollView>
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
                                            source={{ uri: `https://deeds.cgs.vic.edu.au/portrait.php?id=${this.props.route.params.id}&size=constrain200` }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor: "white",
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
                                </ScrollView>
                            )
                            : null
                    }
                </LoaderComponent>
            </View >
        );
    }
}

export default UserProfileScreen;