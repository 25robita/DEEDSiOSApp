import React, { Component } from 'react';
import { customColours } from '../../colours';
import HTMLSpan from './SpanComponent';
import { openURL } from '../../RootNavigation';
import { TouchableOpacity } from 'react-native';

export default class HTMLAnchor extends Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        openURL(this.props.href)
    }
    render() {
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