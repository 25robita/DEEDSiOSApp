
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getItemAsync } from 'expo-secure-store';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SectionList, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../../ThemeProvider';
import { CalendarItem } from '../components/CalendarRow';
import { ContentText } from '../components/ContentTextComponent';
import IconComponent from '../components/IconComponent';
import LoaderComponent from '../components/LoaderComponent';
import getCalendar from '../getters/calendar';
import { fetchJSONResource } from '../getters/get';
import ScrollingScreenTemplate from './ScrollingScreenTemplate';

const Tabs = createMaterialTopTabNavigator();

export function CalendarScreen(props: any) {
    const { isDark, colors } = useContext(ThemeContext)
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
                    component={CalendarScreen_Week}
                />
                <Tabs.Screen
                    name="month"
                    component={CalendarScreen_Month}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}

async function getMonthDots(month: number, year?: number) {
    console.log("CalendarScreen.tsx:54 says:", "hi");
    let date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    date.setDate(1);
    date.setMonth(month);
    year && date.setFullYear(year);

    // let endDate = new Date(date);
    // date.setDate(31);

    const url = `/calendar/ajax/full?start=${Number(date) / 1000}&end=${Number(date) / 1000 + 60 * 24 * 60 * 31}&userId=${JSON.parse(await getItemAsync("userMeta") ?? "").schoolboxUser.id}`;

    let jsonResponse = await fetchJSONResource(
        url,
        {}
    );
    console.log("CalendarScreen.tsx:71 says:", JSON.stringify(jsonResponse), url);

    let events: { dateString: string, key: string, color: string }[] = jsonResponse.map((event: any) => (
        {
            dateString: event.start.split(" ")[0],
            color: event.color
        }
    ));

    let dots = {};

    for (let { key, dateString, color } of events) {
        if (dots[dateString]) {
            dots[dateString].dots.push({
                color
            })
        } else {
            dots[dateString] = { dots: [{ key, color }] }
        }
    }

    console.log("CalendarScreen.tsx:88 says:", JSON.stringify(dots), JSON.stringify(events));

    return dots;
}

export function CalendarScreen_Month(props: any) {
    const [selected, setSelected] = useState(new Date().toLocaleDateString('en-AU', {}).replace(/\//g, '-').split(" ")[0])
    const [markedDays, setMarkedDays] = useState({})
    const { colors } = useContext(ThemeContext);

    useEffect(() => {
        getMonthDots(new Date().getMonth(), new Date().getFullYear()).then(monthDots => {
            console.log(JSON.stringify(monthDots, null, 4))
            setMarkedDays(monthDots)
        })
    }, [])

    return <View>
        <ScrollingScreenTemplate>
            <Calendar
                onDayPress={(date) => setSelected(date.dateString)}
                onMonthChange={(date) => {
                    getMonthDots(date.month, date.year).then(monthDots => {
                        console.log(JSON.stringify(monthDots, null, 4))
                        setMarkedDays(Object.assign({}, markedDays, monthDots))
                    })
                }}
                markedDates={Object.assign({}, markedDays, {
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true
                    }
                })}
                markingType={'multi-dot'}
                theme={{
                    calendarBackground: colors.contentBackground,
                    backgroundColor: colors.contentBackground,
                    textColor: colors.neutralHighContrast,
                    selectedDayBackgroundColor: colors.link,
                    dayTextColor: colors.foreground,
                    textDisabledColor: colors.neutralLowContrast,
                    todayTextColor: colors.link,
                    arrowColor: colors.neutralHighContrast,
                    monthTextColor: colors.foreground
                }}
            >

            </Calendar>
            <CalendarScreen_Period_Events
                days={1}
                dayOffset={
                    Math.ceil((Number(new Date(selected)) - Number(new Date())) / (1000 * 60 * 60 * 24))
                }
            />
        </ScrollingScreenTemplate>

    </View>
}

export function CalendarScreen_Week(props: any) {
    const { colors } = useContext(ThemeContext)
    const [dayOffset, setDay] = useState(1) // for monday start instead of sunday

    let date = new Date();
    date.setMilliseconds(0)
    date.setSeconds(0)
    date.setMinutes(0)
    date.setHours(0)
    date = new Date(Number(date) + dayOffset * 24 * 60 * 60 * 1000 - date.getDay() * 24 * 60 * 60 * 1000)

    return (
        <View>
            <View
                style={{
                    height: 70,
                    backgroundColor: colors.contentBackground,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                <TouchableOpacity
                    style={{
                        marginHorizontal: 20
                    }}
                    onPress={() => {
                        setDay(dayOffset - 7)
                    }}
                >
                    <IconComponent
                        name="previous"
                        style={{
                            fontSize: 20,
                            color: colors.neutralHighContrast
                        }}
                    />
                </TouchableOpacity>
                <ContentText
                    style={{
                        fontWeight: "600",
                        fontSize: 15
                    }}
                >
                    {
                        date.toLocaleDateString('en-AU', {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })
                    }
                </ContentText>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 20
                    }}
                    onPress={() => {
                        setDay(dayOffset + 7)
                    }}
                >
                    <IconComponent
                        name="next"
                        style={{
                            fontSize: 20,
                            color: colors.neutralHighContrast
                        }}
                    />
                </TouchableOpacity>
            </View>
            <CalendarScreen_Period_Events
                dayOffset={dayOffset}
                days={7}
                startOfWeek={true}
            />
        </View>
    )
}

export function CalendarScreen_Day(props: any) {
    const { colors } = useContext(ThemeContext)
    const [dayOffset, setDay] = useState(0)

    let date = new Date();
    date.setMilliseconds(0)
    date.setSeconds(0)
    date.setMinutes(0)
    date.setHours(0)
    date = new Date(Number(date) + dayOffset * 24 * 60 * 60 * 1000)

    return (
        <View>
            <View
                style={{
                    height: 70,
                    backgroundColor: colors.contentBackground,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                <TouchableOpacity
                    style={{
                        marginHorizontal: 20
                    }}
                    onPress={() => {
                        setDay(dayOffset - 1)
                    }}
                >
                    <IconComponent
                        name="previous"
                        style={{
                            fontSize: 20,
                            color: colors.neutralHighContrast
                        }}
                    />
                </TouchableOpacity>
                <ContentText
                    style={{
                        fontWeight: "600",
                        fontSize: 15
                    }}
                >
                    {
                        date.toLocaleDateString('en-AU', {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })
                    }
                </ContentText>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 20
                    }}
                    onPress={() => {
                        console.log(dayOffset)
                        setDay(dayOffset + 1)
                    }}
                >
                    <IconComponent
                        name="next"
                        style={{
                            fontSize: 20,
                            color: colors.neutralHighContrast
                        }}
                    />
                </TouchableOpacity>
            </View>
            <CalendarScreen_Day_Events
                dayOffset={dayOffset}
            />
        </View>
    )
}

export function CalendarScreen_Day_Events(props: any) {
    let [calendarData, setCalendar] = useState([]);
    let [errorText, setError] = useState("");
    const [showActivity, setActivity] = useState(true);
    const [prevDay, setPrevDay] = useState(0);

    console.log("CalendarScreen.tsx:129 says:", props.dayOffset);

    useEffect(() => {
        if (prevDay != props.dayOffset) {
            setPrevDay(props.dayOffset)
            setActivity(true);
            getCalendar(undefined, 60 * 60 * 24, false, props.dayOffset * 24 * 60 * 60).then((cal) => {
                setCalendar(cal)
                setError("") // ensure empty
                setActivity(false);
            }, rej => {
                console.log(rej)
                setError("Sorry, couldn't fetch the calendar at this time.")
            })
        }
    })

    useEffect(() => {
        getCalendar(undefined, 60 * 60 * 24, false, props.dayOffset * 24 * 60 * 60).then((cal) => {
            setCalendar(cal)
            setError("") // ensure empty
            setActivity(false)
        }, rej => {
            setError("Sorry, couldn't fetch the calendar at this time.")
        })
    }, []);
    return <View>
        <ScrollingScreenTemplate>
            <View>
                <LoaderComponent
                    state={
                        showActivity ? "loading" : errorText ? "failed" : "loaded"
                    }
                    failText={errorText}

                >
                    <FlatList
                        renderItem={
                            ({ item }) =>
                                <CalendarItem item={item} />
                        }
                        keyExtractor={(a, b) => b + JSON.stringify(a)}
                        data={calendarData}
                    />
                </LoaderComponent>
                {/* <Meta
                    style={{
                        textAlign: "center",
                        padding: 40,
                        marginTop: 10,
                    }}
                >
                    {errorText}
                </Meta> */}
            </View>
        </ScrollingScreenTemplate>
    </View>
}

export function CalendarScreen_Period_Events(props: any) {
    let [calendarData, setCalendar] = useState([]);
    let [errorText, setError] = useState("");
    const [showActivity, setActivity] = useState(true);
    const [prevDay, setPrevDay] = useState(0);

    const { colors } = useContext(ThemeContext)

    let d = new Date();
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    d.setTime(Number(d) + (props.dayOffset - (props.startOfWeek ? d.getDay() : 0)) * 24 * 60 * 60 * 1000)

    useEffect(() => {
        if (prevDay != props.dayOffset) {
            setPrevDay(props.dayOffset)
            setActivity(true);
            getCalendar(d, props.days * 60 * 60 * 24, true, props.dayOffset * 24 * 60 * 60).then((cal) => {
                setCalendar(cal)
                setError("") // ensure empty
                setActivity(false);
            }, rej => {
                console.log(rej)
                setError("Sorry, couldn't fetch the calendar at this time.")
            })
        }
    })

    useEffect(() => {
        setActivity(true);
        getCalendar(d, props.days * 60 * 60 * 24, true, props.dayOffset * 24 * 60 * 60).then((cal) => {
            setCalendar(cal)
            setError("") // ensure empty
            setActivity(false);
        }, rej => {
            console.log(rej)
            setError("Sorry, couldn't fetch the calendar at this time.")
        })
    }, []);
    return <View>
        <ScrollingScreenTemplate>
            <View>
                <LoaderComponent
                    state={
                        showActivity ? "loading" : errorText ? "failed" : "loaded"
                    }
                    failText={errorText}

                >
                    <SectionList
                        style={{
                            marginBottom: 200
                        }}
                        renderItem={
                            ({ item }) =>
                                <CalendarItem item={item} />
                        }
                        renderSectionHeader={({ section: { title, isFirst } }) => {
                            return (
                                <View style={{ paddingTop: (isFirst ? 7 : 0), backgroundColor: colors.calendarHeaderBackground }}>
                                    <ContentText style={[{
                                        margin: 8,
                                        fontWeight: "800",
                                        color: colors.link
                                    }]}>
                                        {title}
                                    </ContentText>
                                </View>
                            )
                        }}
                        keyExtractor={(a, b) => b + JSON.stringify(a)}
                        sections={calendarData}
                    />
                </LoaderComponent>
                {/* <Meta
                    style={{
                        textAlign: "center",
                        padding: 40,
                        marginTop: 10,
                    }}
                >
                    {errorText}
                </Meta> */}
            </View>
        </ScrollingScreenTemplate>
    </View>
}