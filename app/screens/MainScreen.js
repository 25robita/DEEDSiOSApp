import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, RefreshControl, FlatList } from 'react-native';
import React, { Component } from 'react';
import { styles } from "../styles"
import TimetableRow from '../components/TimetableRow';
import CalendarRow from '../components/CalendarRow';
import NewsList from '../components/NewsRow';
import DueWorkRow from '../components/DueWorkRow';
import ScrollingScreenTemplate from './ScrollingScreenTemplate';
import NewsRow from '../components/NewsRow';

const mainScreenData = [
    {
        name: '',
        RowComponent: TimetableRow
    },
    {
        name: '',
        RowComponent: CalendarRow
    },
    {
        name: '',
        RowComponent: NewsRow,
        props: {
            number: 3
        }
    },
    {
        name: '',
        RowComponent: DueWorkRow
    }
]

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
    renderItem({ name, RowComponent, props }) {
        console.log("MainScreen.js:46 says:", name, props, RowComponent);
        return <RowComponent
            headerName={name}
            {...props}
        />
    }
    keyExtractor(a, b) {
        return a + b
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollingScreenTemplate
                    onRefresh={this.onRefresh}
                >
                    <View style={{ padding: '5%', marginBottom: "20%" }}>
                        {
                            mainScreenData.map(this.renderItem)
                        }
                    </View>
                </ScrollingScreenTemplate>
            </View>
        );
    }

}

export default MainScreen;