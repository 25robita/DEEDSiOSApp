import React, { Component } from "react";
import { Appearance, SectionList, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../ThemeProvider";
import { coloursDark, coloursLight } from "../colours";
import getCalendar from "../getters/calendar";
import { navigate } from "../RootNavigation";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";
import LoaderComponent from "./LoaderComponent";
import SectionComponent from "./SectionComponent";
import TimeComponent from "./TimeComponent";

class CalendarItem extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = {};
    }
    onPress = () => {
        navigate("Calendar Item", { item: this.props.item })
    }
    render() {
        let customColours = this.context.isDark ? coloursDark : coloursLight
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.onPress}
            >
                <View style={{
                    width: "100%",
                    backgroundColor: customColours.contentBackground,
                    marginBottom: 1,
                    padding: 5,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: "center",
                }}>
                    <View style={{ backgroundColor: this.props.item.color, width: "2.3%", top: 0, bottom: 0, position: "absolute" }}></View>
                    <View style={{
                        flex: 1,
                        marginLeft: "3%",
                        flexDirection: "column"
                    }}>
                        <ContentText style={[{ fontSize: 16 }]}>{this.props.item.title}</ContentText>

                        <TimeComponent time={
                            this.props.item.allDay
                                ? "all day"
                                : ((this.props.item.data || { meta: { time: "?" } }).meta || { time: "?" }).time.replaceAll("&ndash;", "–")
                        } />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

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

        return <CalendarItem
            item={item}
        />


    }
    handleRenderCalendarHeader({ section: { title, isFirst } }) {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        return (
            <View style={{ paddingTop: (isFirst ? 7 : 0), backgroundColor: customColours.calendarHeaderBackground }}>
                <ContentText style={[{
                    margin: 8,
                    fontWeight: "800",
                    color: customColours.link
                }]}>
                    {title}
                </ContentText>
            </View>
        )
    }
    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
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