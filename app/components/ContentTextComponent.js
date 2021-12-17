import React, { useContext } from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import { ThemeContext } from "../../ThemeProvider";

export function ContentText(props) {
    const { colors: customColours } = useContext(ThemeContext)
    let text = props.animated ? Animated.Text : Text
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
