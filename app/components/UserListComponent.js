import React from "react"
import { Image, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Component } from "react/cjs/react.production.min"
import { customColours } from "../colours"
import { serviceURL } from "../consts"
import { Meta } from "./TextComponents"
import UserLinkComponent from "./UserLinkComponent"

export class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    renderItem = ({ item }, a, b, c, d) => {
        return <View
            style={{
                flexDirection: 'row',
                borderBottomColor: customColours.neutralLowContrast,
                borderBottomWidth: 1,
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            <Image
                style={{
                    width: 50,
                    height: 50,
                    margin: 0
                }}
                source={{ uri: `${serviceURL}/portrait.php?id=${item.id}&size=square64` }}
            />
            <View>
                <View
                    style={{
                        flexDirection: 'column',
                        paddingHorizontal: 20,
                    }}
                >
                    <UserLinkComponent
                        style={{
                            margin: 0
                        }}
                        id={item.id}
                        userName={item.name}
                    />
                    {
                        item.meta
                            ? <Meta
                                style={{
                                    // flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    flex: 1,
                                    marginRight: 50
                                }}
                            >{item.meta}</Meta>
                            : null
                    }
                </View>
            </View>

        </View>

    }
    keyExtractor(a, b) {
        return a + b
    }
    render() {
        return <FlatList
            data={this.props.users}
            renderItem={this.props.renderItem || this.renderItem}
            keyExtractor={this.keyExtractor}
        />
    }
}
