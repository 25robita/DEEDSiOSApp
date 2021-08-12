import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Component } from "react/cjs/react.production.min"
import { customColours } from "../colours"
import { NewsList } from "../components/NewsRow"
import { styles } from "../styles"
import ScrollingScreenTemplate from "./ScrollingScreenTemplate"

export default class NewsScreen extends Component {
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
            <View style={{ padding: 20, marginBottom: 30 }}>
                <NewsList
                    addRefreshListener={this.addRefreshListener}
                />
            </View>
        </ScrollingScreenTemplate>
    }
}