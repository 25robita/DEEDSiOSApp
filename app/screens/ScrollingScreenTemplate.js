import React from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";

class ScrollingScreenTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ScrollView
                style={[{
                    backgroundColor: customColours.background,
                    minHeight: '100%',
                }, this.props.style]}
            >
                <RefreshControl
                    onRefresh={this.props.onRefresh}
                    tintColor={customColours.neutralHighContrast}
                />
                {this.props.children}
            </ScrollView>
        );
    }
}

export default ScrollingScreenTemplate;