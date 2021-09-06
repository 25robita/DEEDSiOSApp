import React from 'react';
import { Appearance, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Component } from 'react/cjs/react.production.min';
import { coloursDark, coloursLight } from '../../colours';
import { openURL } from '../../RootNavigation';
import { styles } from '../../styles';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';

export default class SchoolboxComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { collapsed: false }
    }
    componentDidMount = () => {
        if ((this.props.collapsed || false) != this.state.collapsed && this.props.title) {
            this.setState({ collapsed: true })
        }
    }
    collapseToggle = () => {
        this.props.url
            ? openURL(this.props.url, false)
            : this.setState({
                collapsed: !this.state.collapsed
            })
    }
    render() {
        let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        return <View style={[{
            display: "flex",
            flexDirection: "column",
            margin: 10,
            overflow: 'hidden'
        }, styles.shadow, this.props.style]}>
            <View
                style={{
                    backgroundColor: customColours.componentTitleBar,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    display: (this.props.title || !this.props.children) ? 'flex' : "none",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    zIndex: 2
                }}
            >
                <ContentText
                    style={{
                        fontSize: 18,
                        // fontWeight: "500"
                    }}
                >{this.props.title || "No title"}</ContentText>

                <TouchableOpacity
                    activeOpacity={0.5}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    onPress={this.collapseToggle}
                >
                    <IconComponent
                        name={
                            this.props.children
                                ? (this.state.collapsed ? "down-arrow" : "up-arrow")
                                : "external-link"
                        }
                        style={{
                            color: customColours.neutralHighContrast,
                            fontSize: 16
                        }} />
                </TouchableOpacity>

            </View>
            <Collapsible collapsed={this.state.collapsed}>
                <View style={[{
                    backgroundColor: customColours.contentBackground,
                    padding: (this.props.children && !this.props.noTitle) ? 20 : 0
                }, this.props.contentStyle]}>
                    {this.props.children}
                </View>
            </Collapsible>
        </View>
    }
}