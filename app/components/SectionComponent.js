import React from "react";
import { View } from "react-native";
import { styles } from "../consts";
import { SectionHeading } from "./TextComponents";

function SectionComponent(props) {
    return (
        <View style={[styles.section]}>
            <SectionHeading style={props.titleStyle}>{props.title}</SectionHeading>
            {props.children}
        </View>
    )
}

export default SectionComponent