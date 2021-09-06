import React from 'react';
import { Appearance, FlatList, TouchableOpacity } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { coloursDark, coloursLight } from '../../colours';
import { openURL } from '../../RootNavigation';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';
import SchoolboxComponent from './SchoolboxComponent';

class SchoolboxLinks_Link extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onPress = () => {
        openURL(this.props.url)
    }

    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        let icon;
        switch (this.props.type) {
            case "file":
                icon = 'document'
                break
            case "homepage":
                icon = "home"
                break
            default:
                icon = 'link'
        }
        return <TouchableOpacity
            onPress={this.onPress}
            activeOpacity={0.5}
            style={{
                padding: 10,
                borderBottomColor: customColours.neutralLowContrast,
                borderBottomWidth: this.props.isLast ? 0 : 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <IconComponent
                name={icon}
                style={{
                    marginRight: 10,
                    fontSize: 20
                }}
            />
            <ContentText
                style={{
                    color: customColours.link
                }}
            >
                {this.props.text}
            </ContentText>
        </TouchableOpacity>
    }
}

export default class SchoolboxLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderListItem = ({ item: { url, text, isLast } }) => {
        return <SchoolboxLinks_Link
            type={this.props.type}
            url={url}
            text={text.trim ? text.trim() : ""}
            isLast={isLast}
        />
    }

    keyExtractor(a, b) {
        return a + b
    }

    render() {
        return <SchoolboxComponent
            collapsed={this.props.collapsed}
            title={this.props.title}
            noTitle={!Boolean(this.props.title)}
            contentStyle={{
                padding: 0
            }}
        >
            <FlatList
                renderItem={this.renderListItem}
                keyExtractor={this.keyExtractor}
                data={this.props.links}
            />
        </SchoolboxComponent>
    }
}