import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { styles } from "../styles"
import TimetableRow from '../components/TimetableRow';
import CalendarRow from '../components/CalendarRow';
import NewsList from '../components/NewsRow';
import DueWorkRow from '../components/DueWorkRow';
import { Component } from 'react/cjs/react.production.min';
import ScrollingScreenTemplate from './ScrollingScreenTemplate';

class MainScreen extends Component {
    state = {}
    constructor(props) {
        super(props)
    }
    onRefresh = () => {
        this.setState({})
    }
    componentDidMount = () => {
        setTimeout(_ => {
            // this.props.navigation.navigate("Homepage", { code: "8-0860-F" })
        }, 1000)
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollingScreenTemplate
                    onRefresh={this.onRefresh}
                >
                    <View style={{ padding: '5%', marginBottom: "20%" }}>
                        <TimetableRow />
                        <CalendarRow />
                        <NewsList number={3} />
                        <DueWorkRow />
                    </View>
                </ScrollingScreenTemplate>
            </View>
        );
    }

}

export default MainScreen;


// TODO: turn components into a FlatList