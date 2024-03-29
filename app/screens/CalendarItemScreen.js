import { decode } from 'html-entities';
import React, { Component } from "react";
import { View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../../ThemeProvider';
import { foregroundContrastBreakpoint, getRoughColorLightness, turnLightnessToTransparency } from "../colours";
import { ContentText } from "../components/ContentTextComponent";
import IconComponent from '../components/IconComponent';
import LoaderComponent from "../components/LoaderComponent";
import UserLinkComponent from "../components/UserLinkComponent";
import { UserList } from "../components/UserListComponent";
import { fetchJSONResource } from "../getters/get";
import { eventAttendAcceptLabel, eventAttendancePromptLabel, eventAttendDeclineLabel, eventAuthorLabel, eventDateAndTimeLabel, eventFailTextLabel, eventLocationLabel, eventNavigationTitle, eventNumberAcceptedLabel, eventNumberDeclinedLabel, eventNumberPendingLabel, sliceNavigationTitle } from "../lang";
import { postJSON } from '../posters/post';
import { openURL } from '../RootNavigation';
import { styles } from "../styles";
import ContentScreenTemplate, { HorizontalRule, HTMLTextView } from "./ContentScreenTemplate";



const infoSectionStyle = {
    marginBottom: 15
}

function parseDate(dateString) { // because the dates they give us are in a weird format
    let nativeAttempt = new Date(dateString);
    if (nativeAttempt != "Invalid Date") { // sees if native js can do it for you
        return nativeAttempt
    }
    let dateRegex = dateString.matchAll(/(\d+)-(\d+)-(\d)+\s((\d+):(\d+):(\d+))?/g).next().value
    let dateOutput = new Date(dateRegex[1], dateRegex[2], dateRegex[3], dateRegex[5], dateRegex[6], dateRegex[7]) // ignores bad values
    return dateOutput;
}

class CalendarItemScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = { attendance: {}, attending: null };
    }

    componentDidMount = () => {
        if (this.props.route.params?.item?.data?.meta?.eventId) {
            fetchJSONResource(`/calendar/event/attendance/${this.props.route.params?.item?.data?.meta?.eventId}`)
                .then(j => {
                    this.setState({ attendance: j, attending: [null, null, true, false][j.currentUser.status] })
                })
        }

        this.props.navigation.setOptions({
            title: sliceNavigationTitle(`${eventNavigationTitle} – ${this.props.route.params?.item?.title}`),
            headerRight: () =>
                <TouchableOpacity
                    onPress={() => {
                        openURL(`/calendar/event/${this.props.route.params?.item?.data?.meta?.eventId}`, false)
                    }}
                >
                    <IconComponent
                        id={"\ue921"}
                        maxFontSizeMultiplier={1.2}
                        style={{
                            fontSize: 20,
                            color: this.context.colors.headerForeground,
                            paddingRight: 20
                        }} />
                </TouchableOpacity>

        })
    }

    render() {
        const dataHeaderStyle = {
            fontSize: 18,
            color: this.context.colors.neutralHighContrast,
            marginBottom: 20
        }
        return (
            <ContentScreenTemplate>
                <View
                    style={{
                        backgroundColor: this.context.colors.contentBackground,
                        marginBottom: 70
                    }}
                >
                    <LoaderComponent
                        state={this.props.route.params?.item
                            ? 'loaded'
                            : "failed"}
                        failText={eventFailTextLabel}
                    >
                        <View
                            style={{
                                paddingHorizontal: 15,
                                paddingTop: 15,
                                paddingBottom: 10,
                                flexDirection: "column"
                            }}
                        >
                            <ContentText
                                style={styles.contentHeading}
                            >
                                {this.props.route.params?.item?.title}
                            </ContentText>
                            <View
                                style={{
                                    backgroundColor: turnLightnessToTransparency(this.props.route.params?.item?.color),
                                    padding: 5,
                                    marginTop: 10
                                }}
                            >
                                <ContentText
                                    style={{
                                        textAlign: "center",
                                        fontWeight: '800',
                                        fontSize: 13,
                                        color: (
                                            (
                                                getRoughColorLightness(this.props.route.params?.item?.color)
                                                > foregroundContrastBreakpoint // if color is lighter than midpoint of foreground and foregroundContrast
                                            )
                                        )
                                            ? this.context.colors.foregroundContrast
                                            : this.context.colors.foreground // may be the wrong way around i haven't tested it
                                    }}
                                >
                                    {this.props.route.params?.item?.data?.meta?.type.toUpperCase?.()}
                                </ContentText>
                            </View>
                            <UserLinkComponent
                                style={{
                                    marginTop: 10
                                }}
                                isMeta={true}
                                textBefore={eventAuthorLabel}
                                userName={this.props.route.params?.item?.data?.meta?.author}
                                id={this.props.route.params?.item?.data?.meta?.authorId}
                            />
                            {
                                this.props.route.params?.item?.data?.meta?.detail
                                    ? <View>
                                        <HorizontalRule />
                                        <HTMLTextView
                                            style={{
                                                paddingHorizontal: 5,
                                                paddingTop: 5,
                                                marginBottom: 0
                                            }}
                                        >
                                            {
                                                this.props.route.params?.item?.data?.meta?.detail?.match(/<.*>/g) // is plaintext
                                                    ? this.props.route.params?.item?.data?.meta?.detail
                                                    : `<p>${this.props.route.params?.item?.data?.meta?.detail}</p>`
                                            }
                                        </HTMLTextView>
                                    </View>
                                    : null
                            }
                            {
                                this.props.route.params?.item?.start
                                    ? <View>
                                        <HorizontalRule />
                                        <View
                                            style={infoSectionStyle}
                                        >
                                            <ContentText
                                                style={dataHeaderStyle}
                                            >
                                                {eventDateAndTimeLabel}
                                            </ContentText>
                                            <ContentText>
                                                {
                                                    [
                                                        parseDate(this.props.route.params?.item?.start)
                                                            .toLocaleDateString('EN-au', {
                                                                weekday: 'long',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                day: 'numeric'
                                                            }) // inlcude end time
                                                        ,
                                                        decode(this.props.route.params?.item?.data?.meta?.time.trim())
                                                    ].filter(i => i).join(", ")
                                                }
                                            </ContentText>
                                        </View>
                                    </View>
                                    : null
                            }
                            {
                                this.props.route.params?.item?.data?.meta?.location
                                    ? <View
                                        style={infoSectionStyle}
                                    >
                                        <ContentText
                                            style={dataHeaderStyle}
                                        >
                                            {eventLocationLabel}
                                        </ContentText>
                                        <ContentText>
                                            {this.props.route.params?.item?.data?.meta?.location}
                                        </ContentText>
                                    </View>
                                    : null
                            }
                            {
                                this.state.attendance?.attendees && this.props.route.params?.item?.data?.attendance?.hasAttendance
                                    ? <View>
                                        <HorizontalRule />
                                        {
                                            (this.state.attendance?.attendees?.available ?? 1)
                                                ? <View>
                                                    <ContentText
                                                        style={{
                                                            fontWeight: '600',
                                                            marginBottom: 10
                                                        }}
                                                    >
                                                        {eventAttendancePromptLabel}
                                                    </ContentText>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            marginBottom: 20
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                backgroundColor: this.state.attending ? this.context.colors.themePositive : this.context.colors.themeSeconday,
                                                                flex: 1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                padding: 10,
                                                                marginRight: 2
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    postJSON(
                                                                        `/calendar/event/attendance/${this.props.route.params?.item?.data?.meta?.eventId}/accept?returnUrl=L2NhbGVuZGFyLzAxLTEyLTIwMjEvMTc4`
                                                                    ).then(async res => {
                                                                        this.setState({
                                                                            attending: (await res.json()).currentUser.status == 2
                                                                        })
                                                                    })
                                                                }}
                                                                hitSlop={{
                                                                    top: 10,
                                                                    bottom: 10,
                                                                    right: 75,
                                                                    left: 75,
                                                                }}
                                                            >
                                                                <ContentText
                                                                    style={{
                                                                        color: this.context.colors.link
                                                                    }}
                                                                >
                                                                    {eventAttendAcceptLabel}
                                                                </ContentText>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View
                                                            style={{
                                                                backgroundColor: this.state.attending === false ? this.context.colors.themeNegative : this.context.colors.themeSeconday,
                                                                flex: 1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                padding: 10,
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    postJSON(
                                                                        `/calendar/event/attendance/${this.props.route.params?.item?.data?.meta?.eventId}/decline`
                                                                    ).then(async res => {
                                                                        this.setState({
                                                                            attending: false
                                                                            // (await res.json()).currentUser.status == 3
                                                                        })
                                                                    }, rej => {
                                                                        console.log(`/calendar/event/attendance/${this.props.route.params?.item?.data?.meta?.eventId}/decline`)
                                                                    })
                                                                }}
                                                                hitSlop={{
                                                                    top: 10,
                                                                    bottom: 10,
                                                                    right: 75,
                                                                    left: 75,
                                                                }}
                                                            >

                                                                <ContentText
                                                                    style={{
                                                                        color: this.context.colors.link
                                                                    }}
                                                                >
                                                                    {eventAttendDeclineLabel}
                                                                </ContentText>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                </View>
                                                : null
                                        }
                                        <ContentText
                                            style={{
                                                fontWeight: '600',
                                                marginBottom: 20
                                            }}
                                        >
                                            {this.state.attendance?.attendees?.accepted} {eventNumberAcceptedLabel}, {this.state.attendance?.attendees?.declined} {eventNumberDeclinedLabel}, {this.state.attendance?.attendees?.pending} {eventNumberPendingLabel}
                                        </ContentText>
                                        <UserList
                                            users={this.state.attendance?.attendees?.guests}
                                        />
                                    </View>
                                    : null
                            }
                        </View>
                    </LoaderComponent>
                </View>
            </ContentScreenTemplate>
        );
    }
}

export default CalendarItemScreen;