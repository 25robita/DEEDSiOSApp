import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Component } from 'react/cjs/react.production.min';
import { styles } from '../consts';
import { navigate } from '../RootNavigation';
import IconComponent from './IconComponent';

function ContentText(props) {
    text = props.animated ? Animated.Text : Text
    return (
        props.animated
            ? (<Animated.Text style={[styles.text, props.style]}>
                {props.children}</Animated.Text>)
            : (<Text {...props} style={[styles.text, props.style]}>
                {props.children}
            </Text>)


    );
}

function Meta(props) {
    return (
        <ContentText {...props} style={[styles.meta, props.style]}>
            {props.children}
        </ContentText>
    );
}

class SectionHeading extends Component {
    constructor(props) {
        super(props)
    }
    navigate = () => {
        navigate(this.props.navigatorName)
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.navigate}>
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: "row",
                    alignItems: 'baseline'
                }}>
                    <ContentText style={[styles.heading, styles.sectionHeading]}>
                        {this.props.children}
                    </ContentText>
                    <IconComponent name="next" style={{ fontSize: 16 }} />
                </View>
            </TouchableOpacity>

        )
    }
}

export { ContentText, Meta, SectionHeading };