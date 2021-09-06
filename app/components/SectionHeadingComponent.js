import React from 'react';
import { Appearance, TouchableOpacity, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { coloursDark, coloursLight } from '../colours';
import { navigate } from '../RootNavigation';
import { styles } from '../styles';
import { ContentText } from './ContentTextComponent';
import IconComponent from './IconComponent';

export class SectionHeading extends Component {
    constructor(props) {
        super(props)
    }
    navigate = () => {
        navigate(this.props.navigatorName)
    }
    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.navigate}
            >
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: "row",
                    alignItems: 'baseline'
                }}>
                    <ContentText
                        style={[

                            styles.heading,
                            {
                                color: customColours.neutralHighContrast
                            },
                            styles.sectionHeading
                        ]}
                    >
                        {this.props.children}
                    </ContentText>
                    <IconComponent
                        name="next"
                        style={{
                            fontSize: 16
                        }}
                    />
                </View>
            </TouchableOpacity>

        )
    }
}