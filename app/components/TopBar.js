import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import IconComponent from './IconComponent';
import { ContentText } from './TextComponents';

function TopBarHeading(props) {
    return (
        <ContentText style={[styles.topBarHeading]}>{props.children}</ContentText>
    );
}

class TopBarBackButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5}
                onPress={this.props.onPress}
                style={[
                    {
                        position: "absolute",
                        left: 15,
                        bottom: "25%",
                    }
                ]}
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
                <IconComponent
                    style={[
                        {
                            color: "white",
                            fontSize: 20
                        },
                        this.props.style
                    ]}
                    name="previous"
                />
            </TouchableOpacity>
        )
    }
}

export { TopBarHeading, TopBarBackButton };