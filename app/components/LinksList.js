import React from "react";
import { Appearance, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Component } from "react/cjs/react.production.min";
import { coloursDark, coloursLight } from "../colours";
import IconComponent from "../components/IconComponent";
import { openURL } from "../RootNavigation";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";

class LinksList extends Component {
    constructor(props) {
        super(props);
    }
    renderItem = ({ item }) => {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
        return <TouchableOpacity activeOpacity={0.5}
            onPress={_ => {
                openURL(item.href)
            }}
        >
            <View
                style={[{
                    backgroundColor: customColours.contentBackground,
                    marginBottom: 20,
                    padding: 10,
                    paddingLeft: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20
                }, styles.shadow]}
            >
                <IconComponent
                    name={this.props.icon || "link"}
                    style={{
                        color: customColours.link,
                        fontSize: 20,
                        marginRight: 15
                    }}
                />
                <ContentText
                    style={{
                        color: customColours.link,
                        fontSize: 16
                    }}
                >{item.text}</ContentText>
            </View>
        </TouchableOpacity>
    }
    keyExtractor(a, b) {
        return a + b
    }
    render() {
        return (
            <View
                style={{
                    padding: 20,
                    overflow: "visible"
                }}
            >
                <FlatList
                    scrollEnabled={false}
                    style={{
                        overflow: 'visible'
                    }}
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View >
        );
    }
}

export default LinksList;