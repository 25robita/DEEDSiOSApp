import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { styles } from '../consts';
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
            <Pressable
                onPress={this.props.onPress}
                style={[
                    {
                        position: "absolute",
                        left: 15,
                        bottom: "25%",
                    }
                ]}
                hitSlop={50}
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
            </Pressable>
        )
    }
}

export { TopBarHeading, TopBarBackButton };