import React from 'react';
import { Text } from 'react-native';
import { styles } from '../consts';

function ContentText(props) {
    return (
        <Text style={[styles.text, props.style]}>
            {props.children}
        </Text>
    );
}

function Meta(props) {
    return (
        <ContentText style={[styles.meta, props.style]}>
            {props.children}
        </ContentText>
    );
}

function SectionHeading(props) {
    return (
        <ContentText style={[styles.heading, styles.sectionHeading]}>
            {props.children}
        </ContentText>
    )
}

export { ContentText, Meta, SectionHeading };