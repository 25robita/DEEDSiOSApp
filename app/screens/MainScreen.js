import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { styles } from "../consts"
import TimetableRow from '../components/TimetableRow';
import CalendarRow from '../components/CalendarRow';
import NewsRow from '../components/NewsRow';
import DueWorkRow from '../components/DueWorkRow';
import { Component } from 'react/cjs/react.production.min';

class MainScreen extends Component {
    state = {}
    constructor(props) {
        super(props)
    }
    onRefresh = () => {
        this.setState({})
    }
    componentDidMount = () => {
        console.log("MainScreen.js:19 says:", this);
        setTimeout(_ => {
            this.props.navigation.navigate("Timetable")
        }, 5000)
    }
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView style={{ minHeight: "100%" }}>
                        <RefreshControl onRefresh={this.onRefresh} />
                        <View style={{ padding: '5%', marginBottom: "20%" }}>
                            <TimetableRow changeScreen={this.props.changeScreen} />
                            <CalendarRow changeScreen={this.props.changeScreen} />
                            <NewsRow changeScreen={this.props.changeScreen} />
                            <DueWorkRow changeScreen={this.props.changeScreen} />
                        </View>
                    </ScrollView>
                </SafeAreaView >
            </View>
        );
    }

}

export default MainScreen;