import { NavigationContainer } from '@react-navigation/native';
import { loadAsync } from 'expo-font';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { fetchResource } from './app/getters/get';
import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import TimetableScreen from './app/screens/TimetableScreen';
import WaitingScreen from './app/screens/WaitingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './app/styles';
import { customColours } from './app/colours';
import { MainNavigationReference, navigate } from './app/RootNavigation';
import NewsItemScreen from './app/screens/NewsItemScreen';
import NewsScreen from './app/screens/NewsScreen';
import UserProfileScreen from './app/screens/UserProfile';
import BarcodeScreen from './app/screens/BarcodeScreen';
import IconComponent from './app/components/IconComponent';
import { ContentText } from './app/components/TextComponents';
import HomepageScreen from './app/screens/HomepageScreen';
import NavigationScreen from './app/screens/NavigationScreen';
import SubjectsScreen from './app/screens/SubjectsScreen';
import GroupsScreen from './app/screens/GroupsScreen';
import LinksScreen from './app/screens/LinksScreen'
import CalendarItemScreen from './app/screens/CalendarItemScreen';
const MainStack = createStackNavigator();

const headerButtonHitslop = {
    top: 25,
    left: 25,
    right: 25,
    bottom: 10
}

const navigatorOptions = {
    headerStyle: [styles.topBar],
    headerTitleStyle: [styles.topBarHeading],
    headerTintColor: customColours.headerForeground
}

const navigatorOptionsHideBack = Object.assign({}, navigatorOptions, {
    headerLeft: _ => null,
    gestureEnabled: false,
    animationEnabled: false,
})

const navigatorOptionsHideBackBarcode = Object.assign({}, navigatorOptionsHideBack, {
    headerRight: _ => {
        return <TouchableOpacity activeOpacity={0.5}
            hitSlop={headerButtonHitslop}
            onPress={_ => {
                getItemAsync("userMeta")
                    .then(userMeta => {
                        navigate("Barcode", { id: JSON.parse(userMeta)?.schoolboxUser?.externalId })
                    })
            }}>
            <View style={{
                marginRight: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <ContentText style={{
                    color: customColours.headerForeground,
                    fontSize: 20
                }}>[</ContentText>
                <IconComponent name="barcode" style={{
                    fontSize: 12,
                    paddingTop: 2.5,
                    color: customColours.headerForeground
                }} />
                <ContentText style={{
                    color: customColours.headerForeground,
                    fontSize: 20
                }}>]</ContentText>
            </View>
        </TouchableOpacity>
    }
})

const navigatorOptionsHideBackBarcodeNavipage = Object.assign({}, navigatorOptionsHideBackBarcode, {
    headerLeft: _ => {
        return <View style={{
            marginLeft: 20
        }}>
            <TouchableOpacity activeOpacity={0.5} hitSlop={headerButtonHitslop} onPress={_ => navigate("Navigation")}>
                <IconComponent
                    name="tiles"
                    style={{
                        fontSize: 20,
                        color: customColours.headerForeground
                    }}
                />
            </TouchableOpacity>
        </View>
    }
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
                        options={Object.assign({}, navigatorOptionsHideBackBarcodeNavipage, {
                            title: ""
                        })}
                    />
                    <MainStack.Screen
                        name="Navigation"
                        component={NavigationScreen}
                        options={Object.assign({}, navigatorOptions, {
                            presentation: 'modal',
                            headerLeft: _ => null
                        })}
                    />
                    <MainStack.Screen
                        name="Homepage"
                        component={HomepageScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="Timetable"
                        component={TimetableScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="Subjects"
                        component={SubjectsScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="Groups"
                        component={GroupsScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="Links"
                        component={LinksScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="News"
                        component={NewsScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="User"
                        component={UserProfileScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="News Item"
                        component={NewsItemScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="Calendar Item"
                        component={CalendarItemScreen}
                        options={navigatorOptions}
                        initialParams={{}}
                    />
                    <MainStack.Screen
                        name="Barcode"
                        component={BarcodeScreen}
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