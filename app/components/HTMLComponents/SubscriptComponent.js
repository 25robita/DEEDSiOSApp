import React from 'react';
import { View } from 'react-native';
import { getLastStyleDecleration } from '../../renderHTML';
import HTMLSpan from './SpanComponent';

export default function HTMLSubscript(props) {
    let fontSize = getLastStyleDecleration(props.style, 'fontSize', 16, 1);
    return <View
        style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            transform: [{
                translateY: fontSize / 2.5
            }]
        }}
    >
        <HTMLSpan style={props.style}>
            {props.children}
        </HTMLSpan>
    </View>
}