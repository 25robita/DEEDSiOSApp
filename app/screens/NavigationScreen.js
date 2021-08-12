import React from "react";
import { Pressable, View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";
import SquareGrid from 'react-native-square-grid';
import { ContentText } from "../components/TextComponents";
import IconComponent from "../components/IconComponent";
import { dispatch, navigate } from "../RootNavigation";
import { StackActions } from "@react-navigation/native";

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
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = ({ icon, link, name }) => {
        let iconStyle = {
            color: customColours.darkBlue,
            fontSize: 50
        }
        let textStyle = {
            color: customColours.darkBlue,
            fontSize: 18
        }
        return <Pressable
            onPress={_ => {
                dispatch(StackActions.replace(link.name, link.params));
            }}
            style={{
                padding: 5
            }}
        >
            <View
                style={{
                    borderColor: customColours.darkBlue,
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
        </Pressable>
    }

    render() {
        return (
            <View
                style={{
                    display: 'flex',
                    height: '100%',
                    backgroundColor: customColours.backgroundColor,
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