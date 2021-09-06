import { StackActions } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Appearance } from "react-native-appearance";
import { Component } from "react/cjs/react.production.min";
import { ThemeContext } from '../../ThemeProvider';
import { coloursDark, coloursLight } from "../colours";
import { ContentText } from "../components/ContentTextComponent";
import IconComponent from "../components/IconComponent";
import { dispatch } from "../RootNavigation";

const navigationItems = [
    {
        'name': 'Timetable',
        'link': {
            'name': "Timetable",
            'params': {}
        },
        'icon': {
            'name': 'clock'
        }
    },
    {
        'name': 'Home',
        'link': {
            'name': "Home",
            'params': {}
        },
        'icon': {
            'name': 'home'
        }
    },
    {
        'name': 'Profile',
        'link': {
            'name': "User",
            'params': {}
        },
        'icon': {
            'name': 'user'
        }
    },
    {
        'name': 'News',
        'link': {
            'name': "News",
            'params': {}
        },
        'icon': {
            'name': 'news'
        }
    },
    {
        'name': 'My Classes',
        'link': {
            'name': "Subjects",
            'params': {}
        },
        'icon': {
            'name': 'teacher'
        }
    },
    {
        'name': 'My Groups',
        'link': {
            'name': "Groups",
            'params': {}
        },
        'icon': {
            'name': 'group'
        }
    },
    {
        'name': 'My Links',
        'link': {
            'name': "Links",
            'params': {}
        },
        'icon': {
            'name': 'link'
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
        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        let iconStyle = {
            color: customColours.navigation || customColours.themePrimary,
            fontSize: 50
        }
        let textStyle = {
            color: customColours.navigation || customColours.themePrimary,
            fontSize: 18
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
                    borderColor: customColours.navigation || customColours.themePrimary,
                    borderRadius: 10,
                    borderWidth: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                }}
            >
                {
                    icon.name
                        ? <IconComponent style={iconStyle} name={icon.name} />
                        : <IconComponent style={iconStyle} id={icon.id} />
                }
                <ContentText
                    style={textStyle}
                >
                    {name}
                </ContentText>
            </View>
        </TouchableOpacity>
    }

    render() {
        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        return (
            <View
                style={{
                    paddingTop: 20,
                    display: 'flex',
                    height: '100%',
                    backgroundColor: customColours.background,
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