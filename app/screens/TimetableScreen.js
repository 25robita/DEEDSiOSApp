import React, { Component } from 'react';
import { Text, View, SafeAreaView, FlatList, ScrollView, RefreshControl } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { TimetableSubject } from '../components/TimetableRow';
import { TopBarBackButton, TopBarHeading } from '../components/TopBar';
import { styles } from '../consts';
import { getDay } from '../getters/timetable';

function handleKeyExtraction(index, item) {
    return item + index
}

function handleRenderItem({ item }) {
    return (
        <TimetableSubject data={item} />
    )
}


class TimetableSubScreen extends Component {
    constructor(props) {
        super(props);
        let now = new Date();
        let day = props.day;
        this.state = { timetable: [], day, now, willUpdate: false };
    }
    updateTimetable() {
        getDay(this.state.day, this.state.now)
            .then(timetable => {
                this.state.willUpdate = true

                this.setState({ timetable })
            }, _ => {
                console.log("f")
            })
    }
    componentDidMount() {
        this.updateTimetable()
    }
    componentDidUpdate() {
        this.state.day = this.props.day
        let now = new Date()
        this.state.now = (now.getDay() + 6) % 7 == this.state.day ? now : undefined
        if (!this.state.willUpdate) {
            this.updateTimetable()
        }
        this.state.willUpdate = false
    }
    render() {
        return (
            <View style={{ padding: '5%', marginBottom: "20%", flex: 1 }}>
                <FlatList
                    scrollEnabled={false}
                    style={{ overflow: "visible", height: "100%", flexGrow: 1 }}
                    data={this.state.timetable}
                    keyExtractor={handleKeyExtraction}
                    renderItem={handleRenderItem}
                />
            </View>
        );
    }
}

class TimetableScreen extends Component {
    constructor(props) {
        super(props);
        let now = new Date()
        let day = (now.getDay() + 6) % 7;
        let dayName = now.toLocaleDateString(undefined, { weekday: 'long' });
        this.state = { timetable: [], day, dayName, now };
    }

    onRefresh = () => {
        this.setState({ day: this.state.day })
    }
    handleReturnToMain = () => {
        this.props.changeScreen("main")
    }
    handleIncreaseDay = () => {
        console.log("TimetableScreen.js:81 says hi");
        let days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
        let day = this.state.day != 6 ? this.state.day + 1 : 6;
        let dayName = days[day];
        this.setState({ day, dayName, now: undefined })
    }
    handleDecreaseDay = () => {
        let days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
        let day = this.state.day != 0 ? this.state.day - 1 : 0;
        let dayName = days[day];
        this.setState({ day, dayName, now: undefined })
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
                    <ScrollView style={{ minHeight: "100%" }}>
                        <RefreshControl onRefresh={this.onRefresh} />
                        <GestureRecognizer
                            onSwipeLeft={this.handleIncreaseDay}
                            onSwipeRight={this.handleDecreaseDay}
                            style={{ minHeight: "100%" }}
                        >
                            <TimetableSubScreen day={this.state.day} />
                        </GestureRecognizer>
                    </ScrollView>
                </SafeAreaView >
            </View>
        );
    }
}

export default TimetableScreen;