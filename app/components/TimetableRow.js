import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View } from 'react-native';
import { styles, timetableStyles } from "../styles"
import { getNowOnwards } from '../getters/timetable';
import { ContentText, Meta, SectionHeading } from './TextComponents';
import LoaderComponent from './LoaderComponent';
import TimeComponent from './TimeComponent';
import SectionComponent from './SectionComponent';
import { navigate, openURL } from '../RootNavigation';
import { darkMode } from '../consts';

function invertHexColour(color) {
    // console.log("TimetableRow.js:13 says:", color);
    let newColor =
        "#" +
        [...color.matchAll(/[0123456789abcdef]{2}/g)]
            .map(i => (
                255 - parseInt(i[0], 16)
            )
                .toString(16)
                .padStart(2, "0")
            )
            .join("")
    // console.log("TimetableRow.js:15 says:", newColor);
    return newColor
}

function getColorHue([r, g, b]) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

function hueToRGB([hue, saturation]) {
    let h = hue, s = saturation, l = .5;
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

function turnLightnessToTransparency(color) {
    color = [...color.matchAll(/[1234567890abcdef]{2}/g)]
        .map(i =>
            parseInt(i[0], 16)
        )
    let [h, s, l] = getColorHue(color)
    console.log("TimetableRow.js:85 says:", h, s, l);
    let alpha = Math.floor(200 * (1 - l)) / 100
    console.log("TimetableRow.js:87 says:", alpha);
    let output = `rgba(${hueToRGB([h, s, l]).map(i => Math.floor(i)).join(", ")}, ${alpha})`
    console.log("TimetableRow.js:89 says:", output);
    return output
}

function TimetableSubject(props) {
    return (
        props.data ?
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
                            : <View style={[timetableStyles.cell, { backgroundColor: turnLightnessToTransparency(props.data.color) }]}>
                                <ContentText style={[((props.data.isLinked) ? styles.link : {}), timetableStyles.subjectText, timetableStyles.subjectName]}>{props.data.name}</ContentText>
                                <Meta style={[timetableStyles.subjectText]}>{props.data.code}</Meta>
                                <ContentText style={[timetableStyles.subjectText]}>{props.data.location}</ContentText>
                            </View>
                    }
                </View>
            </TouchableOpacity>
            : null
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
                        ? (
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
                        : null
                }
            </View>
        );
    }

}

export { TimetableSubject };
export default TimetableRow;