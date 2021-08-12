import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { NewsList } from "../components/NewsRow"
import { styles } from "../styles"

export default function NewsScreen({ navigation }) {
    return <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 30 }}>
            <NewsList />
        </View>
    </ScrollView>
}