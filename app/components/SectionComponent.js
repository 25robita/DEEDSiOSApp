import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import { SectionHeading } from "./TextComponents";

function SectionComponent(props) {
    return (
        <View style={[styles.section]}>
            <SectionHeading
                navigatorName={props.navigatorName}
                style={props.titleStyle}
            >
                {props.title}
            </SectionHeading>
            {props.children}
        </View>
    )
}

export default SectionComponent