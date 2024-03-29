import { StackActions } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { ThemeContext } from '../../ThemeProvider';
import { ContentText } from "../components/ContentTextComponent";
import IconComponent from "../components/IconComponent";
import { dispatch } from "../RootNavigation";

const navigationItems = [
    {
        name: 'Timetable',
        link: {
            name: "Timetable",
            params: {}
        },
        icon: {
            name: 'clock'
        }
    },
    {
        name: 'Home',
        link: {
            name: "Home",
            params: {}
        },
        icon: {
            name: 'home'
        }
    },
    {
        name: 'News',
        link: {
            name: "News",
            params: {}
        },
        icon: {
            name: 'news'
        }
    },
    {
        name: 'Profile',
        link: {
            name: "User",
            params: {}
        },
        icon: {
            name: 'user'
        }
    },
    {
        name: 'Calendar',
        link: {
            name: "Calendar",
            params: {}
        },
        icon: {
            name: 'calendar'
        }
    },
    {
        name: 'My Classes',
        link: {
            name: "Subjects",
            params: {}
        },
        icon: {
            name: 'teacher'
        }
    },
    {
        name: 'My Links',
        link: {
            name: "Links",
            params: {}
        },
        icon: {
            name: 'link'
        }
    },
    {
        name: 'My Groups',
        link: {
            name: "Groups",
            params: {}
        },
        icon: {
            name: 'group'
        }
    },
    {
        name: 'Settings',
        link: {
            name: "Settings",
            params: {}
        },
        icon: {
            name: 'settings'
        }
    },

]

class NavigationScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = ({ icon, link, name }) => {
        let iconStyle = {
            color: this.context.colors.navigation || this.context.colors.themePrimary,
            fontSize: 50
        }
        let textStyle = {
            color: this.context.colors.navigation || this.context.colors.themePrimary,
            fontSize: 18,
            maxWidth: "90%"
        }
        return <TouchableOpacity activeOpacity={0.5}
            onPress={_ => {
                dispatch(StackActions.replace(link.name, link.params));
            }}
            style={{
                padding: 5
            }}
        >
            <View
                style={{
                    borderColor: this.context.colors.navigation || this.context.colors.themePrimary,
                    borderRadius: 10,
                    borderWidth: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: "10%",
                }}
            >
                {
                    icon.name
                        ? <IconComponent style={iconStyle} allowFontScaling={false} name={icon.name} />
                        : <IconComponent style={iconStyle} allowFontScaling={false} id={icon.id} />
                }
                <ContentText
                    adjustsFontSizeToFit={true}
                    style={textStyle}
                    numberOfLines={1}
                >
                    {name}
                </ContentText>
            </View>
        </TouchableOpacity>
    }

    render() {
        return (
            <View
                style={{
                    paddingTop: 20,
                    display: 'flex',
                    height: '100%',
                    backgroundColor: this.context.colors.background,
                    paddingBottom: 20
                }}
            >
                <View
                    style={{
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}
                >
                    {
                        navigationItems.map(item => {
                            return <View
                                style={{
                                    width: "33%",
                                    aspectRatio: 1
                                }}>
                                {this.renderItem(item)}
                            </View>
                        })
                    }
                </View>
            </View>
        );
    }
}

export default NavigationScreen;