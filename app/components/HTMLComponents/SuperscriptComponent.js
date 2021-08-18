import React from 'react';
import { View } from 'react-native';
import { getLastStyleDecleration } from '../../renderHTML';
import HTMLSpan from './SpanComponent';

export default function HTMLSuperscript(props) {
    let fontSize = getLastStyleDecleration(props.style, 'fontSize', 16, 1);
    return <View
        style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: fontSize
        }}
    >
        <HTMLSpan style={props.style}>
            {props.children}
        </HTMLSpan>
    </View>
}