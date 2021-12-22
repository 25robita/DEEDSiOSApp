import React, { Component } from "react";
import { SectionList, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../ThemeProvider";
import { coloursDark, coloursLight } from "../colours";
import getCalendar from "../getters/calendar";
import { generateGenericEmptyMessage } from "../lang";
import { navigate } from "../RootNavigation";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";
import LoaderComponent from "./LoaderComponent";
import { Meta } from "./MetaTextComponent";
import SectionComponent from "./SectionComponent";
import TimeComponent from "./TimeComponent";

export class CalendarItem extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = {};
    }
    onPress = () => {
        navigate("Calendar Item", { item: this.props.item })
    }
    render() {
        const customColours = this.context.isDark ? coloursDark : coloursLight
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
    static contextType = ThemeContext;
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
    handleRenderCalendarHeader = ({ section: { title, isFirst } }) => {
        return (
            <View style={{ paddingTop: (isFirst ? 7 : 0), backgroundColor: this.context.colors.calendarHeaderBackground }}>
                <ContentText style={[{
                    margin: 8,
                    fontWeight: "800",
                    color: this.context.colors.link
                }]}>
                    {title}
                </ContentText>
            </View>
        )
    }
    render() {
        return (
            <SectionComponent title="calendar" navigatorName="Calendar">
                <LoaderComponent
                    state={
                        !(this.state.calendar || this.state.failed) || this.state.showActivity
                            ? "loading"
                            : (this.state.failed)
                                ? "failed"
                                : "loaded"
                    }
                    failText="Unable to load the calendar at the moment"
                    style={{ backgroundColor: this.context.colors.calendarIndentBackground || this.context.colors.contentBackground }}
                >
                    {
                        this.state?.calendar?.length ?
                            <View style={[styles.shadow, {
                                borderColor: this.context.colors.calendarBackground,
                                borderBottomWidth: 7,
                                borderRightWidth: 7,
                                borderLeftWidth: 0,
                                backgroundColor: this.context.colors.calendarBackground
                            }]}>
                                <SectionList
                                    scrollEnabled={false}
                                    sections={this.state.calendar}
                                    renderItem={this.handleRenderCalendarEvent}
                                    renderSectionHeader={this.handleRenderCalendarHeader}
                                    keyExtractor={this.handleExtractKey}
                                    style={[{
                                        borderLeftWidth: 9,
                                        borderColor: this.context.colors.calendarIndentBackground || this.context.colors.contentBackground
                                    }]}
                                />
                            </View>
                            : <View
                                style={{
                                    padding: 20
                                }}
                            >
                                <Meta
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    {generateGenericEmptyMessage(0)}
                                </Meta>
                            </View>
                    }
                </LoaderComponent>
            </SectionComponent>
        )
    }
}

// export default function CalendarRow(props) {
//     const { colors } = useContext(ThemeContext);

//     const [calendar, setCalendar] = useState(false);
//     const [failed, setFailed] = useState(false);
//     const [willUpdate, setWillUpdate] = useState(false);
//     const [willUpdateCh2, setWillUpdateCh2] = useState(false);
//     const [showActivity, setShowActivity] = useState(false);

//     useEffect(() =>
//         getCalendar()
//             .then(sectionListData => {
//                 setCalendar(sectionListData)
//             }, _ => {
//                 setFailed(true);
//             })
//         , [])

//     useEffect(() => {
//         if (willUpdate)
//             return setWillUpdate(false)

//         if (willUpdateCh2)
//             return setWillUpdateCh2(false)

//         setWillUpdateCh2(true)
//         setShowActivity(true)
//         setWillUpdate(true)
//         getCalendar()
//             .then(sectionListData => {
//                 setCalendar(sectionListData)
//                 setShowActivity(false);
//             }, _ => {
//                 setFailed(true);
//                 setShowActivity(false);
//             })
//     })

//     return (
//         <SectionComponent title="calendar" navigatorName="Calendar">
//             <LoaderComponent
//                 state={
//                     !(calendar || failed) || showActivity
//                         ? "loading"
//                         : (failed)
//                             ? "failed"
//                             : "loaded"
//                 }
//                 failText="Unable to load the calendar at the moment"
//                 style={{ backgroundColor: colors.calendarIndentBackground || colors.contentBackground }}
//             >
//                 {
//                     calendar ?
//                         <View style={[styles.shadow, {
//                             borderColor: colors.calendarBackground,
//                             borderBottomWidth: 7,
//                             borderRightWidth: 7,
//                             borderLeftWidth: 0,
//                             backgroundColor: colors.calendarBackground
//                         }]}>
//                             <SectionList
//                                 scrollEnabled={false}
//                                 sections={calendar}
//                                 renderItem={({ item }) => <CalendarItem item={item} />}
//                                 renderSectionHeader={({ section: { title, isFirst } }) => <View style={{ paddingTop: (isFirst ? 7 : 0), backgroundColor: colors.calendarHeaderBackground }}>
//                                     <ContentText style={[{
//                                         margin: 8,
//                                         fontWeight: "800",
//                                         color: colors.link
//                                     }]}>
//                                         {title}
//                                     </ContentText>
//                                 </View>
//                                 }
//                                 keyExtractor={(a, b) => a + b}
//                                 style={[{
//                                     borderLeftWidth: 9,
//                                     borderColor: colors.calendarIndentBackground || colors.contentBackground
//                                 }]}
//                             />
//                         </View>
//                         : null
//                 }
//             </LoaderComponent>
//         </SectionComponent>
//     )
// }

export default CalendarRow;