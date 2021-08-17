import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { styles } from '../styles';
import { navigate } from '../RootNavigation';
import IconComponent from './IconComponent';
import { ContentText } from './ContentTextComponent';

export class SectionHeading extends Component {
    constructor(props) {
        super(props)
    }
    navigate = () => {
        navigate(this.props.navigatorName)
    }
    render() {
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