import React from "react";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";
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
    return <View style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
    }}>
        <View
            style={[
                {
                    borderBottomWidth: 1,
                    borderBottomColor: customColours.neutralLowContrast,
                    marginVertical: 15,
                    width: "90%"

                },
                props.style]}
        />
    </View>
}

export function HTMLTextView(props) {
    return <View
        style={[
            {
                backgroundColor: customColours.contentBackground,
                marginBottom: 50
            },
            props.style
        ]}
    >
        {renderHTMLText(props.children)}
    </View>
}