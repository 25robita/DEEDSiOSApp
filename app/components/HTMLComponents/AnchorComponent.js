import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../ThemeProvider';
import { openURL } from '../../RootNavigation';
import HTMLSpan from './SpanComponent';

export default function HTMLAnchor(props) {
    const { colors } = useContext(ThemeContext)
    return <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => openURL(props.href)}
    >
        <HTMLSpan
            style={[
                {
                    color: colors.link
                },
                ...props.style
            ]}
        >
            {props.children}
        </HTMLSpan>
    </TouchableOpacity>
}