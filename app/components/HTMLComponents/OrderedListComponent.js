import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { renderHTMLElement } from '../../renderHTML';
import HTMLSpan from './SpanComponent';

export default class HTMLOrderedList extends Component {
    constructor(props) {
        super(props)
    }
    keyExtractor(a, b) {
        return a + b
    }
    renderItem = ({ item, index }) => {
        console.log("OrderedListComponent.js:14 says:", item.childNodes.map(i => i.text));
        if (item.tagName == "LI") {
            return <View style={{
                flexDirection: 'row',
                marginBottom: 5,
            }}>
                <HTMLSpan
                    style={{
                        marginHorizontal: 10
                    }}
                >
                    {index + 1}.
                </HTMLSpan>
                <HTMLSpan
                    style={{
                        flex: 1,
                        flexWrap: 'wrap'
                    }}
                >
                    {item.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, this.props.style) : i.text))}
                </HTMLSpan>
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