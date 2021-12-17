import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";

export function Meta(props) {
    // let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    // let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    const { colors } = useContext(ThemeContext);
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