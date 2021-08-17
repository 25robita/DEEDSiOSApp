import React from "react";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";

export function Meta(props) {
    return (
        <ContentText
            {...props}
            style={[
                styles.meta,
                props.style
            ]}
        >
            {props.children}
        </ContentText>
    );
}