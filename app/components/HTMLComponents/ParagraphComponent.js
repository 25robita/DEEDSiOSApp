import React from 'react';
import HTMLSpan from './SpanComponent';

export default function HTMLParagraph(props) {
    return <HTMLSpan
        style={[
            {
                marginBottom: 10
            },
            ...props.style
        ]}
    >
        {props.children}
    </HTMLSpan>
}