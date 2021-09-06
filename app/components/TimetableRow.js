import React, { Component } from 'react';
import { Appearance, TouchableOpacity, View } from 'react-native';
import { coloursDark, coloursLight, turnLightnessToTransparency } from '../colours';
import { getNowOnwards } from '../getters/timetable';
import { homepageTimetableFailTextLabel, homepageTimetableTitle } from '../lang';
import { navigate, openURL } from '../RootNavigation';
import { styles, timetableStyles } from "../styles";
import { ContentText } from './ContentTextComponent';
import LoaderComponent from './LoaderComponent';
import { Meta } from './MetaTextComponent';
import SectionComponent from './SectionComponent';
import TimeComponent from './TimeComponent';

class TimetableSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onPress = () => {
        let url = `/homepage/code/` + this.props?.data?.code;
        this.props?.data?.empty || openURL(url)
    }

    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
        return (
            this.props.data ?
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.onPress}>
                    <View style={[
                        timetableStyles.row,
                        {
                            backgroundColor: customColours.contentBackground
                        }, styles.shadow
                    ]}>
                        <View style={[
                            timetableStyles.cell,
                            {
                                backgroundColor: customColours.timetableContentBackground || customColours.contentBackground,
                            },
                            (this.props.data.empty) ? timetableStyles.longCell : {}
                        ]}>
                            <ContentText style={[{ color: customColours.neutralHighContrast }, styles.heading]}>{this.props.data.period}</ContentText>
                            <TimeComponent time={this.props.data.time} />
                        </View>
                        {
                            (this.props.data.empty)
                            || <View
                                style={[
                                    timetableStyles.cell,
                                    {
                                        backgroundColor: turnLightnessToTransparency(this.props.data.color)
                                    }]
                                }
                            >
                                <ContentText
                                    style={[
                                        (
                                            (this.props.data.isLinked)
                                                ? {
                                                    color: customColours.link
                                                }
                                                : {}
                                        ),
                                        timetableStyles.subjectText,
                                        timetableStyles.subjectName
                                    ]}
                                >
                                    {this.props.data.name}
                                </ContentText>
                                <Meta
                                    style={[
                                        timetableStyles.subjectText
                                    ]}
                                >
                                    {this.props.data.code}
                                </Meta>
                                <ContentText
                                    style={[
                                        timetableStyles.subjectText
                                    ]}
                                >
                                    {this.props.data.location}
                                </ContentText>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
                : null
        );
    }
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