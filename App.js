import { loadAsync } from 'expo-font';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { View } from 'react-native';
import { fetchResource } from './app/getters/get';
import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import TimetableScreen from './app/screens/TimetableScreen';
import WaitingScreen from './app/screens/WaitingScreen';

setItemAsync("p", "hgc,gcyhuj")

class App extends Component {
    state = { screen: "wait" }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        loadAsync({
            schoolbox: require("./app/assets/fonts/schoolbox.ttf")
        })
        fetchResource("/")
            .then(_ => {
                this.setState({ screen: "main" })
            }, _ => {
                this.setState({ screen: "login" })
            })
    }
    handleScreenChange = (screen) => {
        this.setState({ screen })
    }
    render() {
        return (
            <View>
                {
                    this.state.screen == "login"
                        ? <LoginScreen changeScreen={this.handleScreenChange} />
                        : (
                            this.state.screen == "main"
                                ? <MainScreen changeScreen={this.handleScreenChange} />
                                : (
                                    this.state.screen == "wait"
                                        ? <WaitingScreen changeScreen={this.handleScreenChange} />
                                        : (
                                            this.state.screen == "timetable"
                                                ? <TimetableScreen changeScreen={this.handleScreenChange} />
                                                : null
                                        )
                                )
                        )
                }
            </View>
        )
    }
}

// AppRegistry.registerComponent('main', () => App);
export default App;