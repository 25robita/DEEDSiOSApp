import React, { Component } from "react";
import { View } from "react-native";
import { ThemeContext } from '../../ThemeProvider';
import { NewsList } from "../components/NewsRow";
import ScrollingScreenTemplate from "./ScrollingScreenTemplate";

export default class NewsScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props)
        this.state = { refreshListeners: [] }
    }
    addRefreshListener = (cb) => {
        this.state.refreshListeners.push(cb)
    }
    onRefresh = () => {
        this.state.refreshListeners.forEach(i => i())
    }
    render() {
        return <ScrollingScreenTemplate
            onRefresh={this.onRefresh}
        >
            <View
                style={{
                    padding: 20,
                    marginBottom: 30
                }}
            >
                <NewsList
                    addRefreshListener={this.addRefreshListener}
                />
            </View>
        </ScrollingScreenTemplate>
    }
}