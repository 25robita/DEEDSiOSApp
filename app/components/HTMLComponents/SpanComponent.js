import React from 'react';
import { ContentText } from '../ContentTextComponent';

export default function HTMLSpan(props) {
    return <ContentText
        {...props}
        style={props.style}
    >
        {props.children}
    </ContentText>
}