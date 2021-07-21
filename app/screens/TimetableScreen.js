import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, ScrollView, RefreshControl, Pressable } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import IconComponent from '../components/IconComponent';
import { ContentText, Meta } from '../components/TextComponents';
import { TimetableSubject } from '../components/TimetableRow';
import { TopBarBackButton, TopBarHeading } from '../components/TopBar';
import { customColours, styles } from '../consts';
import { getDayAndFull } from '../getters/timetable';

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
        super(props);
    }

    render() {
        if (!this.props.timetable) {
            console.log("TimetableScreen.js:28 says:", this.props);
            return null
        }
        console.log("TimetableScreen.js:32 says:", this.props.timetable.length)
        return (
            <View style={{ padding: '5%', marginBottom: "20%", flex: 1 }}>
                <FlatList
                    scrollEnabled={false}
                    style={{ overflow: "visible", height: "100%", flexGrow: 1 }}
                    data={this.props.timetable}
                    keyExtractor={handleKeyExtraction}
                    renderItem={handleRenderItem}
                />
            </View>
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
        let now = new Date();
        let day = (now.getDay() + 6) % 7
        let dayName = now.toLocaleDateString(undefined, { weekday: "long" })
        console.log("TimetableScreen.js:70 says:", day);
        this.state = { day, now, dayName };
    }
    updateTimetable = () => {
        getDayAndFull(this.state.day, this.state.now)
            .then(([timetable, fullTimetable]) => {
                this.state.willUpdate = true
                this.setState({ fullTimetable })
            }, _ => {
                console.log("f")
            })
    }
    componentDidMount = () => {
        this.updateTimetable()
    }
    onRefresh = () => {
        this.setState({ day: this.state.day })
    }
    handleReturnToMain = () => {
        this.props.changeScreen("main")
    }
    handleIncreaseDay = () => {
        let day = (this.state.day != 6) ? this.state.day + 1 : 6;
        let dayName = days[day];
        this.setState({
            day,
            dayName,
            now: undefined
        })
    }
    handleDecreaseDay = () => {
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
                <View style={styles.topBar}>
                    <TopBarBackButton
                        onPress={this.handleReturnToMain}
                    />
                    <TopBarHeading>Timetable – {this.state.dayName}</TopBarHeading>
                </View>
                <SafeAreaView>
                    <DaySelector
                        day={this.state.day}
                        onNext={this.handleIncreaseDay}
                        onPrevious={this.handleDecreaseDay}
                    />
                    <ScrollView style={{ minHeight: "100%" }}>
                        <RefreshControl onRefresh={this.onRefresh} />
                        <GestureRecognizer
                            onSwipeLeft={this.handleIncreaseDay}
                            onSwipeRight={this.handleDecreaseDay}
                            style={{ minHeight: "100%", marginBottom: 150 }}
                        >
                            <TimetableSubScreen
                                day={this.state.day}
                                timetable={(this.state.fullTimetable || [])[this.state.day]}
                            />
                        </GestureRecognizer>
                    </ScrollView>
                </SafeAreaView >
            </View>
        );
    }
}

export default TimetableScreen;