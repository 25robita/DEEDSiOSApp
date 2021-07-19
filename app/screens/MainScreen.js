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
    onRefresh = () => {
        console.log("MainScreen.js:13 says hello");
        this.setState({})
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}></View>
                <SafeAreaView>
                    <ScrollView style={{ minHeight: "100%" }}>
                        <RefreshControl onRefresh={this.onRefresh} />
                        <View style={{ padding: '5%', marginBottom: "20%" }}>
                            <TimetableRow />
                            <CalendarRow />
                            <NewsRow />
                            <DueWorkRow />
                        </View>
                    </ScrollView>

                </SafeAreaView >
            </View>
        );
    }

}

export default MainScreen;