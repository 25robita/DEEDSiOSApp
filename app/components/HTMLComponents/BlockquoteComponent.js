import React from 'react';
import { View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { coloursDark, coloursLight } from '../../colours';
import HTMLSpan from './SpanComponent';

export default function HTMLBlockQuote(props) {
    let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
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