import React from 'react';
import { View } from 'react-native';
import { customColours } from '../../colours';
import HTMLSpan from './SpanComponent';

export default function HTMLBlockQuote(props) {
    return <View
        style={{
            width: '100%',
            backgroundColor: customColours.blockquoteBackground,
            borderColor: customColours.blockquoteBorder,
            borderLeftWidth: 5,
            paddingLeft: 20,
            marginBottom: 10
        }}
    >
        <HTMLSpan style={props.style}>
            {props.children}
        </HTMLSpan>
    </View>
}