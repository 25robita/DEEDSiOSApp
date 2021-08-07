import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { styles } from "../consts"
import TimetableRow from '../components/TimetableRow';
import CalendarRow from '../components/CalendarRow';
import NewsList from '../components/NewsRow';
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
            this.props.navigation.navigate("Barcode", { id: 18334 })
        }, 1000)
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ minHeight: "100%" }}>
                    <RefreshControl onRefresh={this.onRefresh} />
                    <SafeAreaView>
                        <View style={{ padding: '5%', marginBottom: "20%" }}>
                            <TimetableRow />
                            <CalendarRow />
                            <NewsList number={3} />
                            <DueWorkRow />
                        </View>
                    </SafeAreaView >
                </ScrollView>
            </View>
        );
    }

}

export default MainScreen;