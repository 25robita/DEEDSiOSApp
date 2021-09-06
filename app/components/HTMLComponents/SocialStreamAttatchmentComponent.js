import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { coloursDark, coloursLight } from '../../colours';
import { openURL } from '../../RootNavigation';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';

export default class SocialStreamAttatchment extends Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        openURL(this.props.url)
    }
    render() {
        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        return <View>
            <TouchableOpacity
                onPress={this.onPress}
                activeOpacity={0.5}
                style={{
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <IconComponent
                    style={{
                        fontSize: 20,
                        marginRight: 10
                    }}
                    name="document"
                />
                <ContentText
                    style={{
                        color: customColours.link
                    }}
                >
                    {this.props.text}
                </ContentText>
            </TouchableOpacity>
        </View>
    }
}