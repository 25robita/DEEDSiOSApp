import React, { useContext } from "react";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { ThemeContext } from "../../ThemeProvider";
import { renderHTMLText } from "../renderHTML";
import ScrollingScreenTemplate from "./ScrollingScreenTemplate";

export default class ContentScreenTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ScrollingScreenTemplate
                onRefresh={this.props.onRefresh}
            >
                <View
                    style={{
                        paddingTop: 20
                    }}
                >
                    {this.props.children}
                </View>
            </ScrollingScreenTemplate>
        );
    }
}


export function HorizontalRule(props) {
    const { colors } = useContext(ThemeContext);

    return <View style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
    }}>
        <View
            style={[
                {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.neutralLowContrast,
                    marginVertical: 15,
                    width: "90%"

                },
                props.style]}
        />
    </View>
}

export function HTMLTextView(props) {
    const { colors } = useContext(ThemeContext);

    return <View
        style={[
            {
                backgroundColor: colors.contentBackground,
                marginBottom: 50
            },
            props.style
        ]}
    >
        {renderHTMLText(props.children)}
    </View>
}