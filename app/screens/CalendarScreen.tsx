
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
import { CalendarItem } from '../components/CalendarRow';
import { Meta } from '../components/MetaTextComponent';
import getCalendar from '../getters/calendar';
import ScrollingScreenTemplate from './ScrollingScreenTemplate';


const Tabs = createMaterialTopTabNavigator();

export function CalendarScreen(props: any) {
    const { isDark, colors } = useContext(ThemeContext)
    // const customColors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    return (
        <NavigationContainer
            independent={true}
        >
            <Tabs.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: colors.background,
                    },
                    tabBarLabelStyle: {
                        color: colors.foreground
                    }
                }}
            >
                <Tabs.Screen
                    name="day"
                    component={CalendarScreen_Day}
                />
                <Tabs.Screen
                    name="week"
                    component={CalendarScreen_Day}
                />
                <Tabs.Screen
                    name="month"
                    component={CalendarScreen_Day}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}


export function CalendarScreen_Day(props: any) {
    let [calendarData, setCalendar] = useState([]);
    let [errorText, setError] = useState("");

    useEffect(() => {
        getCalendar(undefined, 60 * 60 * 24, false).then((cal) => {
            setCalendar(cal)
            setError("") // ensure empty
        }, rej => {
            setError("Sorry, couldn't fetch the calendar at this time.")
        })
    }, []);
    return <ScrollingScreenTemplate>
        <View>
            <FlatList
                renderItem={
                    ({ item }) =>
                        <CalendarItem item={item} />
                }
                keyExtractor={(a, b) => b + JSON.stringify(a)}
                data={calendarData}
            />

            <Meta
                style={{
                    textAlign: "center",
                    padding: 40,
                    marginTop: 10,
                }}
            >
                {errorText}
            </Meta>
        </View>
    </ScrollingScreenTemplate>
}