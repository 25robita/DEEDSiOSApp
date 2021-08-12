import React, { Component } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { styles, timetableStyles } from "../consts"
import { getNowOnwards } from '../getters/timetable';
import { ContentText, Meta, SectionHeading } from './TextComponents';
import LoaderComponent from './LoaderComponent';
import TimeComponent from './TimeComponent';
import SectionComponent from './SectionComponent';
import { navigate, openURL } from '../RootNavigation';

function TimetableSubject(props) {
    return (
<<<<<<< HEAD
        Boolean(props.data) &&
        <TouchableOpacity activeOpacity={0.5} onPress={_ => {
            let url = `/homepage/code/` + props.data.code;
            props.data.empty ? null : openURL(url)
        }}>
            <View style={[timetableStyles.row, styles.shadow]}>
                <View style={[timetableStyles.cell, timetableStyles.header, (props.data.empty) ? timetableStyles.longCell : {}]}>
                    <ContentText style={[styles.heading]}>{props.data.period}</ContentText>
                    <TimeComponent time={props.data.time} />
                </View>
                {
                    (props.data.empty)
                        ? null
                        : <View style={[timetableStyles.cell, { backgroundColor: props.data.color }]}>
                            <ContentText style={[((props.data.isLinked) ? styles.link : {}), timetableStyles.subjectText, timetableStyles.subjectName]}>{props.data.name}</ContentText>
                            <Meta style={[timetableStyles.subjectText]}>{props.data.code}</Meta>
                            <ContentText style={[timetableStyles.subjectText]}>{props.data.location}</ContentText>
                        </View>
                }
            </View>
        </TouchableOpacity>
=======
        props.data ?
            <Pressable onPress={_ => {
                let url = `/homepage/code/` + props.data.code;
                props.data.empty ? null : openURL(url)
            }}>
                <View style={[timetableStyles.row, styles.shadow]}>
                    <View style={[timetableStyles.cell, timetableStyles.header, (props.data.empty) ? timetableStyles.longCell : {}]}>
                        <ContentText style={[styles.heading]}>{props.data.period}</ContentText>
                        <TimeComponent time={props.data.time} />
                    </View>
                    {
                        (props.data.empty)
                            ? null
                            : <View style={[timetableStyles.cell, { backgroundColor: props.data.color }]}>
                                <ContentText style={[((props.data.isLinked) ? styles.link : {}), timetableStyles.subjectText, timetableStyles.subjectName]}>{props.data.name}</ContentText>
                                <Meta style={[timetableStyles.subjectText]}>{props.data.code}</Meta>
                                <ContentText style={[timetableStyles.subjectText]}>{props.data.location}</ContentText>
                            </View>
                    }
                </View>
            </Pressable>
            : null
>>>>>>> parent of 9aae16e (Various things)
    );
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
            willUpdateCh2: false
        }
    }
    componentDidMount = () => {
        this.state.willUpdate = true // won't trigger event
        getNowOnwards()
            .then(timetable => {
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
                this.setState({ timetable, isFilled: true, showActivity: false })
            }, _ => {
                this.setState({ failed: true, showActivity: false })
            })
    }

    handleScreenToTimetable = () => {
        navigate("Timetable");
    }

    render(props) {
        return (
            <View>
                {
                    (this.state.timetable.length || !this.state.isFilled)
<<<<<<< HEAD
                    && (
                        <TouchableOpacity activeOpacity={0.5} onPress={this.handleScreenToTimetable}>
                            <SectionComponent title="timetable" navigatorName="Timetable">
                                <LoaderComponent
                                    state={
                                        !(this.state.timetable.length || this.state.failed || this.state.isFilled) || this.state.showActivity
                                            ? "loading"
                                            : (this.state.failed)
                                                ? "failed"
                                                : "loaded"
                                    }
                                    failText="Unable to load the timetable at the moment"
                                >
                                    <TimetableSubject data={this.state.timetable[0]} />
                                    <TimetableSubject data={this.state.timetable[1]} />
                                </LoaderComponent>
                            </SectionComponent>
                        </TouchableOpacity>
                    )
=======
                        ? (
                            <Pressable onPress={this.handleScreenToTimetable}>
                                <SectionComponent title="timetable" navigatorName="Timetable">
                                    <LoaderComponent
                                        state={
                                            !(this.state.timetable.length || this.state.failed || this.state.isFilled) || this.state.showActivity
                                                ? "loading"
                                                : (this.state.failed)
                                                    ? "failed"
                                                    : "loaded"
                                        }
                                        failText="Unable to load the timetable at the moment"
                                    >
                                        <TimetableSubject data={this.state.timetable[0]} />
                                        <TimetableSubject data={this.state.timetable[1]} />
                                    </LoaderComponent>
                                </SectionComponent>
                            </Pressable>
                        )
                        : null
>>>>>>> parent of 9aae16e (Various things)
                }
            </View>
        );
    }

}

export { TimetableSubject };
export default TimetableRow;