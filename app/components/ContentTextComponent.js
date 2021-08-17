import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "../styles";

export function ContentText(props) {
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
