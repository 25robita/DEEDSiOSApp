import React from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";
import ScrollingScreenTemplate from "./ScrollingScreenTemplate";

class ContentScreenTemplate extends Component {
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

export default ContentScreenTemplate;