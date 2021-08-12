import { loadAsync } from "expo-font";
import { getItemAsync } from "expo-secure-store";
import React, { Component } from "react";
import { View, Text, FlatList, requireNativeComponent, SectionList } from "react-native";
import { styles } from "../styles";
import { customColours } from "../colours";
import { fetchJSONResource } from "../getters/get";
import { ContentText, SectionHeading } from "./TextComponents";
import LoaderComponent from "./LoaderComponent";
import TimeComponent from "./TimeComponent";
import SectionComponent from "./SectionComponent";
import getCalendar from "../getters/calendar";


class CalendarRow extends Component {
    constructor() {
        super()
        this.state = {
            calendar: false,
            failed: false,
            willUpdate: false,
            willUpdateCh2: false,
            showActivity: false
        }
    }
    componentDidMount() {
        getCalendar()
            .then(sectionListData => {
                this.setState({ calendar: sectionListData })
            }, _ => {
                this.setState({ failed: true })
            })
    }
    componentDidUpdate() {
        if (this.state.willUpdate) {
            this.state.willUpdate = false
            return
        }
        if (this.state.willUpdateCh2) {
            this.state.willUpdateCh2 = false
            return
        }
        this.state.willUpdateCh2 = true
        this.setState({ showActivity: true })
        this.state.willUpdate = true
        getCalendar()
            .then(sectionListData => {
                this.setState({ calendar: sectionListData, showActivity: false })
            }, _ => {
                this.setState({ failed: true, showActivity: false })
            })
    }
    handleExtractKey(item, index) {
        return item + index
    }
    handleRenderCalendarEvent({ item }) {

        return <View style={{
            width: "100%",
            backgroundColor: customColours.contentBackground,
            marginBottom: 1,
            // height: 30,
            padding: 5,
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
        }}>
            <View style={{ backgroundColor: item.color, width: "2.3%", top: 0, bottom: 0, position: "absolute" }}></View>
            <View style={{
                flex: 1,
                marginLeft: "3%",
                flexDirection: "column"
            }}>
                <ContentText style={[{ fontSize: 16 }]}>{item.title}</ContentText>

                <TimeComponent time={
                    item.allDay
                        ? "all day"
                        : ((item.data || { meta: { time: "?" } }).meta || { time: "?" }).time.replaceAll("&ndash;", "–")
                } />
            </View>
        </View>

    }
    handleRenderCalendarHeader({ section: { title, isFirst } }) {
        return (
            <View style={{ paddingTop: (isFirst ? 7 : 0), backgroundColor: customColours.calendarHeaderBackground }}>
                <ContentText style={[{
                    margin: 8,
                    fontWeight: "800",
                    color: customColours.link
                }]}>{title}</ContentText>
            </View>
        )
    }
    render() {
        return (
            <SectionComponent title="calendar" navigateName="Calendar">
                <LoaderComponent
                    state={
                        !(this.state.calendar || this.state.failed) || this.state.showActivity
                            ? "loading"
                            : (this.state.failed)
                                ? "failed"
                                : "loaded"
                    }
                    failText="Unable to load the calendar at the moment"
                    style={{ backgroundColor: customColours.calendarIndentBackground || customColours.contentBackground }}
                >
                    <View style={[styles.shadow, {
                        borderColor: customColours.calendarBackground,
                        borderBottomWidth: 7,
                        borderRightWidth: 7,

                        borderLeftWidth: 0,
                        backgroundColor: customColours.calendarBackground
                    }]}>
                        <SectionList
                            scrollEnabled={false}
                            sections={this.state.calendar}
                            renderItem={this.handleRenderCalendarEvent}
                            renderSectionHeader={this.handleRenderCalendarHeader}
                            keyExtractor={this.handleExtractKey}
                            style={[{
                                borderLeftWidth: 9,
                                borderColor: customColours.calendarIndentBackground || customColours.contentBackground
                            }]}
                        />
                    </View>
                </LoaderComponent>
            </SectionComponent>
        )
    }
}

export default CalendarRow;