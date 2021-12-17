import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../ThemeProvider';
import HTMLSpan from './SpanComponent';

export default function HTMLBlockQuote(props) {
    const { colors } = useContext(ThemeContext);
    return <View
        style={{
            width: '100%',
            backgroundColor: colors.blockquoteBackground,
            borderColor: colors.blockquoteBorder,
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