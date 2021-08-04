import { NavigationContainer } from '@react-navigation/native';
import { loadAsync } from 'expo-font';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { View } from 'react-native';
import { fetchResource } from './app/getters/get';
import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import TimetableScreen from './app/screens/TimetableScreen';
import WaitingScreen from './app/screens/WaitingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { customColours, styles } from './app/consts';
import { MainNavigationReference, navigate } from './app/RootNavigation';

const MainStack = createStackNavigator();

const navigatorOptions = {
    headerStyle: [styles.topBar],
    headerTitleStyle: [styles.topBarHeading],
    headerTintColor: customColours.white
}

const navigatorOptionsHideBack = Object.assign({}, navigatorOptions, {
    headerLeft: _ => null,
    gestureEnabled: false
})

const hideHeaders = {
    headerShown: false,
    gestureEnabled: false
}

class App extends Component {
    // state = { screen: "wait" }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        loadAsync({
            schoolbox: require("./app/assets/fonts/schoolbox.ttf")
        })
        fetchResource("/")
            .then(_ => {
                navigate("Home")
            }, _ => {
                navigate("Login")
            })


    }
    handleScreenChange = (screen) => {
        this.setState({ screen })
    }
    render() {
        return (
            <NavigationContainer
                ref={MainNavigationReference}
            >
                <MainStack.Navigator>
                    <MainStack.Screen
                        name="Waiting"
                        component={WaitingScreen}
                        options={hideHeaders}
                    />
                    <MainStack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={hideHeaders}
                    />
                    <MainStack.Screen
                        name="Home"
                        component={MainScreen}
                        options={navigatorOptionsHideBack}
                    />
                    <MainStack.Screen
                        name="Timetable"
                        component={TimetableScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                </MainStack.Navigator>
            </NavigationContainer >
        )
    }
}

// AppRegistry.registerComponent('main', () => App);
export default App;