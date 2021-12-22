import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { loadAsync } from 'expo-font';
import { getItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppearanceProvider } from "react-native-appearance";
import { customColours } from './app/colours';
import { ContentText } from './app/components/ContentTextComponent';
import IconComponent from './app/components/IconComponent';
import { fetchResource } from './app/getters/get';
import { eventNavigationTitle, profileNavigationTitleInitial, timetableNavigationTitle } from './app/lang';
import { MainNavigationReference, navigate } from './app/RootNavigation';
import BarcodeScreen from './app/screens/BarcodeScreen';
import CalendarItemScreen from './app/screens/CalendarItemScreen';
import { CalendarScreen } from './app/screens/CalendarScreen';
import GroupsScreen from './app/screens/GroupsScreen';
import HomepageScreen from './app/screens/HomepageScreen';
import LinksScreen from './app/screens/LinksScreen';
import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import NavigationScreen from './app/screens/NavigationScreen';
import NewsItemScreen from './app/screens/NewsItemScreen';
import NewsScreen from './app/screens/NewsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import SubjectsScreen from './app/screens/SubjectsScreen';
import TimetableScreen from './app/screens/TimetableScreen';
import UserProfileScreen from './app/screens/UserProfileScreen';
import WaitingScreen from './app/screens/WaitingScreen';
import { styles } from './app/styles';
import { ThemeProvider } from './ThemeProvider';

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
    headerTintColor: customColours.headerForeground,
    statusBarStyle: 'light-content'
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
        // Notifications.events().registerRemoteNotificationsRegistered((event) => {
        //     console.log(event.deviceToken);
        // });
        // console.log(Notifications);
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
            <AppearanceProvider>
                <NavigationContainer
                    ref={MainNavigationReference}
                >
                    <ThemeProvider>
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
                                options={Object.assign({}, navigatorOptions, { title: timetableNavigationTitle })}
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
                                options={Object.assign({}, navigatorOptions, { title: profileNavigationTitleInitial })}
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
                                options={Object.assign({}, navigatorOptions, { title: eventNavigationTitle })}
                                initialParams={{}}
                            />
                            <MainStack.Screen
                                name="Calendar"
                                component={CalendarScreen}
                                options={Object.assign({}, navigatorOptions)}
                                initialParams={{}}
                            />
                            <MainStack.Screen
                                name="Barcode"
                                component={BarcodeScreen}
                                options={navigatorOptions}
                                initialParams={{}}
                            />
                            <MainStack.Screen
                                name="Settings"
                                component={SettingsScreen}
                                options={navigatorOptions}
                                initialParams={{}}
                            />
                        </MainStack.Navigator>
                    </ThemeProvider>
                </NavigationContainer >
            </AppearanceProvider>
        )
    }
}

// AppRegistry.registerComponent('main', () => App);
export default App;