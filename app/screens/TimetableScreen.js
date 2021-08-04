import { CommonActions, createNavigationContainerRef, NavigationContainer, StackActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, ScrollView, RefreshControl, Pressable, Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import IconComponent from '../components/IconComponent';
import { ContentText, Meta } from '../components/TextComponents';
import { TimetableSubject } from '../components/TimetableRow';
import { TopBarBackButton, TopBarHeading } from '../components/TopBar';
import { customColours, styles } from '../consts';
import { getDayAndFull } from '../getters/timetable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { dispatch, navigate } from '../RootNavigation';

const DaysTabs = createMaterialTopTabNavigator();

const DaysTabsRef = createNavigationContainerRef();

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

function handleKeyExtraction(index, item) {
    return item + index
}

var handleRenderItem = ({ item }) => {
    return (
        <View>
            <TimetableSubject data={item} />
        </View>
    )
}

class DaySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 8,
                    borderBottomColor: customColours.grey + "50",
                    borderBottomWidth: 2,
                    zIndex: 1002,
                    backgroundColor: customColours.backgroundColor
                }}
            >
                <Pressable onPress={this.props.onPrevious} hitSltop={50}>
                    <IconComponent style={{
                        fontSize: 20,
                        // bottom: 10
                    }} name="previous" />
                </Pressable>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 40
                    }}
                >
                    <ContentText
                        style={{
                            fontWeight: "600",
                            fontSize: 16
                        }}
                    >{days[this.props.day]}</ContentText>
                    <FlatList
                        horizontal={true}
                        data={["•", "•", "•", "•", "•", "•", "•"]}
                        contentContainerStyle={{
                            display: "flex",
                            alignItems: "center"
                        }}
                        renderItem={
                            ({ item, index }) => {
                                return (
                                    <Meta
                                        style={{
                                            fontSize: 35 - (Math.abs(this.props.day - index) * 4),
                                            padding: 0,
                                            margin: 0
                                        }}
                                    >
                                        {item}
                                    </Meta>
                                )
                            }
                        }
                        keyExtractor={handleKeyExtraction}
                    />
                </View>
                <Pressable onPress={this.props.onNext} hitSltop={50}>
                    <IconComponent style={{
                        fontSize: 20,
                        // bottom: 10
                    }} name="next" />
                </Pressable>
            </View>
        );
    }
}

class TimetableSubScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // if (!this.props.route.params.timetable) {
        //     console.log("TimetableScreen.js:28 says:", this.props);
        //     return null
        // }
        // console.log("TimetableScreen.js:32 says:", this.props.route.params.timetable)
        // console.log("TimetableScreen.js:127 says:", this.props.route.params.day);
        console.log("TimetableScreen.js:128 says:", "hello");
        return (
            <ScrollView style={{ minHeight: "100%" }}>
                <View style={{ padding: '5%', /*marginBottom: "20%",*/ flex: 1, minHeight: "100%", backgroundColor: customColours.backgroundColor }}>
                    <FlatList
                        scrollEnabled={false}
                        style={{ overflow: "visible", height: "100%", flexGrow: 1 }}
                        data={this.props.route.params.timetable}
                        keyExtractor={handleKeyExtraction}
                        renderItem={handleRenderItem}
                    />
                </View>
            </ScrollView>
        );
    }
}

class TimetableScreen extends Component {
    state = {
        timetable: [],
        fullTimetable: [],
        day: 0,
        now: undefined,
        willUpdate: false
    }
    constructor(props) {
        super(props);
        console.log("TimetableScreen.js:151 says:", this.props.route.params.fullTimetable);
        let now = new Date();
        let day = (now.getDay() + 6) % 7
        let dayName = now.toLocaleDateString(undefined, { weekday: "long" })
        console.log("TimetableScreen.js:70 says:", day);
        this.state = { day, now, dayName };
    }
    updateTimetable = () => {
        getDayAndFull(this.state.day, this.state.now)
            .then(([timetable, fullTimetable]) => {
                this.state.willUpdate = true;
                this.props.navigation.setOptions({
                    title: "test",
                    animationsEnabled: false
                })
                this.props.navigation.dispatch(StackActions.replace("Timetable", {
                    fullTimetable
                }))
                // this.props.navigation.push("Timetable", {
                //     fullTimetable
                // })
                console.log("TimetableScreen.js:169 says:", "heehoo");
                // this.setState({ fullTimetable })
            }, _ => {
                console.log("f")
            })
    }
    componentDidMount = () => {
        if (!this.props.route.params.fullTimetable) {
            this.updateTimetable()
        }
    }
    onRefresh = () => {
        this.setState({ day: this.state.day })
    }
    handleReturnToMain = () => {
        // this.props.changeScreen("main")
    }
    handleIncreaseDay = ({ vx, vy }) => {
        if (Math.abs(vx - vy) < 0.1) {
            console.log(vx, vy)
            return
        }
        let day = (this.state.day != 6) ? this.state.day + 1 : 6;
        let dayName = days[day];
        this.setState({
            day,
            dayName,
            now: undefined
        })
    }
    handleDecreaseDay = ({ vx, vy, x0 }) => {
        if (Math.abs(vx) / Math.abs(vy) < 4) {
            console.log(vx, vy)
            return
        }

        if (x0 < 30) {
            this.handleReturnToMain()
            return
        }

        let day = this.state.day != 0 ? this.state.day - 1 : 0;
        let dayName = days[day];
        this.setState({
            day,
            dayName,
            now: undefined
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView scrollEnabled={false}>
                        <RefreshControl onRefresh={this.onRefresh} />
                        <NavigationContainer
                            independent={true}
                            ref={DaysTabsRef}
                            style={{ minHeight: "100%" }}
                        >
                            <DaysTabs.Navigator
                                style={{ minHeight: "100%" }}
                            >
                                {
                                    days.map((day, index) => (
                                        <DaysTabs.Screen
                                            name={day}
                                            style={{ minHeight: "100%" }}
                                            component={TimetableSubScreen}
                                            initialParams={{ day: index, timetable: (this.props.route.params.fullTimetable || [])[index] }}
                                        />
                                    ))
                                }
                            </DaysTabs.Navigator>
                        </NavigationContainer>
                    </ScrollView>

                </SafeAreaView >
            </View>
        );
    }
}

export default TimetableScreen;