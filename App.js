import { loadAsync } from 'expo-font';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { View } from 'react-native';
import { fetchResource } from './app/getters/get';
import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
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
        fetchResource("/") //
            .then(_ => {
                this.setState({ screen: "main" })
            }, _ => {
                this.setState({ screen: "login" })
            })
    }
    render() {
        return (
            <View>
                {
                    this.state.screen == "login"
                        ? <LoginScreen onLogin={_ => { this.setState({ screen: "main" }) }} />
                        : (
                            this.state.screen == "main"
                                ? <MainScreen />
                                : (
                                    this.state.screen == "wait"
                                        ? <WaitingScreen />
                                        : null
                                )
                        )
                }
            </View>
        )
    }
}

// AppRegistry.registerComponent('main', () => App);
export default App;