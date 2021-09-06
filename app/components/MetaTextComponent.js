import React from "react";
import { Appearance } from "react-native";
import { coloursDark, coloursLight } from "../colours";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";

export function Meta(props) {
    let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    // let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    return (
        <ContentText
            {...props}
            style={[
                styles.meta,
                {
                    color: colors.neutralHighContrast,
                },
                props.style
            ]}
        >
            {props.children}
        </ContentText>
    );
}