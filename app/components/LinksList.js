import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Component } from "react/cjs/react.production.min";
import { customColours } from "../colours";
import IconComponent from "../components/IconComponent";
import { ContentText } from "./ContentTextComponent";
import { styles } from "../styles";
import { openURL } from "../RootNavigation";

class LinksList extends Component {
    constructor(props) {
        super(props);
    }
    renderItem = ({ item }) => {
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