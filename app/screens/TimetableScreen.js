import { CommonActions, createNavigationContainerRef, createNavigatorFactory, NavigationContainer, StackActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, ScrollView, RefreshControl, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import IconComponent from '../components/IconComponent';
import { ContentText, Meta } from '../components/TextComponents';
import { TimetableSubject } from '../components/TimetableRow';
import { TopBarBackButton, TopBarHeading } from '../components/TopBar';
import { styles } from '../styles';
import { customColours } from '../colours';
import { getDayAndFull } from '../getters/timetable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { dispatch, navigate } from '../RootNavigation';
import { decodeTimetable, minifyTimetable } from '../MinifyTimetable';
import LoaderComponent from '../components/LoaderComponent';
import Animated from 'react-native-reanimated';

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

class TimetableSubScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView style={{ minHeight: "100%", backgroundColor: customColours.background }}>
                <View style={{ padding: '5%', /*marginBottom: "20%",*/ flex: 1, minHeight: "100%", backgroundColor: customColours.background }}>
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

function DaySelector({ state, descriptors, navigation, position }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                top: 8,
                borderBottomColor: customColours.neutralHighContrast + "50",
                borderBottomWidth: 2,
                zIndex: 1,
                backgroundColor: customColours.background
            }}
        >
            <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={{ top: 50, bottom: 50, right: 50, left: 50 }}
                onPress={_ =>
                    days[state.index - 1] ? navigation.navigate(days[state.index - 1]) : null
                }>
                <IconComponent style={{
                    fontSize: 20,
                    // bottom: 10
                }} name="previous" />
            </TouchableOpacity>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 40
                }}
            >
                <ContentText
                    animated={true}
                    style={{
                        fontWeight: "600",
                        fontSize: 16
                    }}
                >{days[state.index]}</ContentText>
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
                                        // textDecorationLine: (index == state.index) ? "underline" : undefined,
                                        transform: [{ scale: 2 / ((((Math.abs(state.index - index) / state.routeNames.length)) + .5) * 3) }],
                                        fontSize: 25,
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
            <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={{ top: 50, bottom: 50, right: 50, left: 50 }}
                onPress={
                    _ =>
                        days[state.index + 1]
                            ? navigation.navigate(days[state.index + 1])
                            : null
                }
            >
                <IconComponent style={{
                    fontSize: 20,
                }} name="next" />
            </TouchableOpacity>
        </View>
    )
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
        let now = new Date();
        let day = (now.getDay() + 6) % 7
        let dayName = now.toLocaleDateString(undefined, { weekday: "long" })
        this.state = { day, now, dayName };
    }
    updateTimetable = () => {
        // console.log("TimetableScreen.js:164 says:", "hello");
        getDayAndFull(this.state.day, this.state.now)
            .then(([timetable, fullTimetable, uncondensedTimetable]) => {
                this.state.willUpdate = true;
                let x;
                this.setState({ fullTimetable })
            }, _ => {
                console.log("f")
            })
    }
    componentDidMount = () => {
        if (!this.props.route.params.timetable) {
            this.updateTimetable()
        }
        else {
            this.setState({
                fullTimetable: decodeTimetable(...this.props.route.params.timetable)
            })
        }
    }
    componentDidUpdate = () => {
        if (this.state.fullTimetable) {
            // console.log("TimetableScreen.js:201 says:", this.state.fullTimetable);
        }
    }
    onRefresh = () => {
        this.setState({ day: this.state.day })
    }
    render() {
        return (
            <View style={styles.container}>
                {

                    this.state.fullTimetable ?
                        <NavigationContainer
                            independent={true}
                            ref={DaysTabsRef}
                            style={{ minHeight: "100%" }}
                        >
                            <DaysTabs.Navigator
                                style={{ minHeight: "100%" }}
                                tabBar={DaySelector}
                            >
                                {
                                    days.map((day, index) => {
                                        return <DaysTabs.Screen
                                            name={day}
                                            style={{ minHeight: "100%", backgroundColor: "black" }}
                                            component={TimetableSubScreen}
                                            initialParams={{ day: index, timetable: (this.state.fullTimetable || [])[index] }}
                                            key={index}
                                        />
                                    }
                                    )
                                }
                            </DaysTabs.Navigator>
                        </NavigationContainer>
                        : <ActivityIndicator style={{ paddingTop: 100, transform: [{ scale: 0.7 }] }} size="large" />
                }
            </View>
        );
    }
}

export default TimetableScreen;