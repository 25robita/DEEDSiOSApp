import React from "react";
import { Appearance, Text } from "react-native";
import Animated from "react-native-reanimated";
import { coloursDark, coloursLight } from "../colours";

export function ContentText(props) {
    let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    text = props.animated ? Animated.Text : Text
    let textStyles = {
        color: customColours.foreground
    }
    return (
        props.animated
            ? (<Animated.Text style={[textStyles, props.style]}>
                {props.children}</Animated.Text>)
            : (<Text {...props} style={[textStyles, props.style]}>
                {props.children}
            </Text>)
    );
}
