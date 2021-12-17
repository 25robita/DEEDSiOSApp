import React, { Component, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
import { turnLightnessToTransparency } from '../colours';
import { getNowOnwards } from '../getters/timetable';
import { homepageTimetableFailTextLabel, homepageTimetableTitle } from '../lang';
import { navigate, openURL } from '../RootNavigation';
import { styles, timetableStyles } from "../styles";
import { ContentText } from './ContentTextComponent';
import LoaderComponent from './LoaderComponent';
import { Meta } from './MetaTextComponent';
import SectionComponent from './SectionComponent';
import TimeComponent from './TimeComponent';

function TimetableSubject(props) {
    const { colors } = useContext(ThemeContext);

    return (
        props.data ?
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                    props?.data?.empty || openURL(`/homepage/code/` + this.props?.data?.code)}>
                <View style={[
                    timetableStyles.row,
                    {
                        backgroundColor: colors.contentBackground
                    }, styles.shadow
                ]}>
                    <View style={[
                        timetableStyles.cell,
                        {
                            backgroundColor: colors.timetableContentBackground || colors.contentBackground,
                        },
                        (props.data.empty) ? timetableStyles.longCell : {}
                    ]}>
                        <ContentText style={[{ color: colors.neutralHighContrast }, styles.heading]}>{props.data.period}</ContentText>
                        <TimeComponent time={props.data.time} />
                    </View>
                    {
                        (props.data.empty)
                        || <View
                            style={[
                                timetableStyles.cell,
                                {
                                    backgroundColor: turnLightnessToTransparency(props.data.color)
                                }]
                            }
                        >
                            <ContentText
                                style={[
                                    (
                                        (props.data.isLinked)
                                            ? {
                                                color: colors.link
                                            }
                                            : {}
                                    ),
                                    timetableStyles.subjectText,
                                    timetableStyles.subjectName
                                ]}
                            >
                                {props.data.name}
                            </ContentText>
                            <Meta
                                style={[
                                    timetableStyles.subjectText
                                ]}
                            >
                                {props.data.code}
                            </Meta>
                            <ContentText
                                style={[
                                    timetableStyles.subjectText
                                ]}
                            >
                                {props.data.location}
                            </ContentText>
                        </View>
                    }
                </View>
            </TouchableOpacity>
            : null
    )

}

class TimetableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timetable: [],
            showActivity: false,
            failed: false,
            isFilled: false,
            willUpdate: false,
            willUpdateCh2: false,
            noTimetable: false
        }
    }
    componentDidMount = () => {
        this.state.willUpdate = true // won't trigger event
        getNowOnwards()
            .then(timetable => {
                console.log("obtained timetable")
                if (timetable == null) {
                    return this.setState({ failed: true, noTimetable: true })
                }
                this.setState({ timetable, isFilled: true })
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
        getNowOnwards()
            .then(timetable => {
                if (timetable == null) {
                    return this.setState({ failed: true, noTimetable: true, showActivity: false })
                }
                this.setState({ timetable, isFilled: true, showActivity: false })
            }, _ => {
                this.setState({ failed: true, showActivity: false })
            })
    }

    handleScreenToTimetable = () => {
        navigate("Timetable", { day: new Date().getDay() + 6 % 7 });

    }

    render(props) {
        return (
            <View>
                {
                    (this.state.timetable.length || !this.state.isFilled)
                        ? (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.handleScreenToTimetable}
                            >
                                <SectionComponent
                                    title={homepageTimetableTitle}
                                    navigatorName="Timetable"
                                >
                                    <LoaderComponent
                                        state={
                                            !(this.state.timetable.length || this.state.failed || this.state.isFilled) || this.state.showActivity
                                                ? "loading"
                                                : (this.state.failed)
                                                    ? "failed"
                                                    : "loaded"
                                        }
                                        failText={homepageTimetableFailTextLabel}
                                    >
                                        <TimetableSubject data={this.state.timetable[0]} />
                                        <TimetableSubject data={this.state.timetable[1]} />
                                    </LoaderComponent>
                                </SectionComponent>
                            </TouchableOpacity>
                        )
                        : null
                }
            </View>
        );
    }

}

export { TimetableSubject };
export default TimetableRow;