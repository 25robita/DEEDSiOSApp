import React, { useContext, useEffect, useState } from "react";
import { AccessibilityInfo, Text } from "react-native";
import Animated from "react-native-reanimated";
import { ThemeContext } from "../../ThemeProvider";

export function ContentText(props) {
    const [isBold, setBold] = useState(false);
    const { colors: customColours } = useContext(ThemeContext)

    useEffect(async () => {
        setBold(await AccessibilityInfo.isBoldTextEnabled())
    }, [])

    AccessibilityInfo.addEventListener('boldTextChanged', async () => {
        setBold(await AccessibilityInfo.isBoldTextEnabled())
    })

    let textStyles = {
        color: customColours.foreground
    }
    return (
        props.animated
            ? (<Animated.Text style={[
                textStyles,
                props.style,
                isBold
                    ? { fontWeight: "bold" }
                    : {}
            ]}>
                {props.children}</Animated.Text>)
            : (
                <Text
                    {...props}
                    style={[
                        textStyles,
                        props.style,
                        isBold
                            ? { fontWeight: "bold" }
                            : {}
                    ]}
                >
                    {props.children}
                </Text>)
    );
}
