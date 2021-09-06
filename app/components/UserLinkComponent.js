import React, { Component } from "react";
import { Appearance, TouchableOpacity } from "react-native";
import { coloursDark, coloursLight } from "../colours";
import { openURL } from "../RootNavigation";
import { ContentText } from "./ContentTextComponent";
import { Meta } from "./MetaTextComponent";

class UserLinkComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onPress = () => {
        console.log("UserLinkComponent.js:13 says:", this.props.id);
        (this.props.nonPressable || !this.props.id)
            || openURL(`/search/user/${this.props.id}`)
    }
    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
        return (
            this.props.userName
                ? <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.onPress}
                    style={[{
                        flexDirection: 'row'
                    }, this.props.style]}
                >
                    {
                        this.props.textBefore
                            ? <Meta>{this.props.textBefore} </Meta>
                            : null
                    }
                    {
                        this.props.isMeta
                            ? <Meta
                                style={{
                                    color: customColours.link
                                }}
                            >
                                {this.props.userName}
                            </Meta>
                            : <ContentText
                                style={{
                                    color: customColours.link
                                }}
                            >
                                {this.props.userName}
                            </ContentText>
                    }
                    {
                        this.props.textAfter
                            ? <Meta>{this.props.textAfter} </Meta>
                            : null
                    }
                </TouchableOpacity>
                : null
        );
    }
}

export default UserLinkComponent;