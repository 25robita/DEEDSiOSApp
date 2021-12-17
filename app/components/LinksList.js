import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ThemeContext } from "../../ThemeProvider";
import IconComponent from "../components/IconComponent";
import { generateGenericEmptyMessage } from '../lang';
import { openURL } from "../RootNavigation";
import { styles } from "../styles";
import { ContentText } from "./ContentTextComponent";
import { Meta } from "./MetaTextComponent";

function keyExtractor(a, b) {
    return a + b
}

var emptyTimes = 0;

class LinksList extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props)
    }
    onComponentMount() {
        emptyTimes = 0;
    }
    renderItem = ({ item }) => {
        return <TouchableOpacity activeOpacity={0.5}
            onPress={_ => {
                openURL(item.href)
            }}
        >
            <View
                style={[{
                    backgroundColor: this.context.colors.contentBackground,
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
                        color: this.context.colors.link,
                        fontSize: 20,
                        marginRight: 15
                    }}
                />
                <ContentText
                    style={{
                        color: this.context.colors.link,
                        fontSize: 16
                    }}
                >{item.text}</ContentText>
            </View>
        </TouchableOpacity>
    }

    render() {
        return <View
            style={{
                padding: 20,
                overflow: "visible"
            }}
        >
            {
                this.props.data.length ?

                    <FlatList
                        scrollEnabled={false}
                        style={{
                            overflow: 'visible'
                        }}
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={keyExtractor}
                    />
                    : <Meta style={{ textAlign: "center", paddingVertical: 40 }}>{generateGenericEmptyMessage(Math.floor(emptyTimes / 16))}</Meta>
            }
        </View >
    }
}



// class LinksList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             emptyTimes: 0
//         }
//     }

//     handleTier = () => {
//         this.state.emptyTimes += 1
//         console.log(this.state.emptyTimes)
//         return Math.floor(this.state.emptyTimes / 5)
//     }
//     render() {
//         return (

//         );
//     }
// }

export default LinksList;