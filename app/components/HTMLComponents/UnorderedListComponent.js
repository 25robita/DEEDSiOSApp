import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { renderHTMLElement } from '../../renderHTML';
import HTMLSpan from './SpanComponent';

export default class HTMLUnorderedList extends Component {
    constructor(props) {
        super(props)
    }
    keyExtractor(a, b) {
        return a + b
    }
    renderItem = ({ item }) => {
        if (item.tagName == "LI") {
            return <View style={{
                flexDirection: 'row',
                marginBottom: 5,
            }}>
                <HTMLSpan
                    style={{
                        fontWeight: "700",
                        marginHorizontal: 10
                    }}
                >
                    •
                </HTMLSpan>
                <View
                    style={{
                        flexDirection: 'column'
                    }}
                >
                    {item.childNodes.filter(i => i.text.trim() || i?.tagName == "IMG")
                        .map(i => (
                            i.nodeType == 1
                                ? renderHTMLElement(i, this.props.style)
                                : <HTMLSpan>{i.text.trim()}</HTMLSpan>
                        ))}
                </View>
            </View>
        }
    }
    render() {
        return <FlatList
            style={{ marginBottom: 10 }}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            data={this.props.data}
        />
    }
}