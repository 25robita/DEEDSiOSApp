import React, { Component } from 'react';
import { Appearance, TouchableOpacity } from 'react-native';
import { coloursDark, coloursLight } from '../../colours';
import { openURL } from '../../RootNavigation';
import HTMLSpan from './SpanComponent';

export default class HTMLAnchor extends Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        openURL(this.props.href)
    }
    render() {
        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        return <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.onPress}
        >
            <HTMLSpan
                style={[
                    {
                        color: customColours.link
                    },
                    ...this.props.style
                ]}
            >
                {this.props.children}
            </HTMLSpan>
        </TouchableOpacity>
    }
}