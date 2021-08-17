import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { customColours } from '../../colours';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';
import { openURL } from '../../RootNavigation';

export default class HTMLWebView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uri: props.uri
                && (
                    props.uri.startsWith("//")
                        ? "https:" + props.uri.replaceAll("www.youtube.com/embed/", "www.youtube.com/watch?v=")
                        : props.uri.replaceAll("www.youtube.com/embed/", "www.youtube.com/watch?v=")
                )
        }
    }
    onLoad = (syntheticEvent) => {
        console.log("renderHTML.js:98 says:", syntheticEvent.nativeEvent);
        let title = syntheticEvent.nativeEvent.title;
        title = (title.length > 30)
            ? title.slice(0, 27) + "..."
            : title
        this.setState({ title })
    }
    onOpenInBrowser = () => {
        openURL(this.state.uri)
    }
    render() {
        return <View>
            <View
                style={{
                    backgroundColor: customColours.themeSeconday,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <ContentText
                    style={{
                        fontSize: 20
                    }}
                >{this.state.title}</ContentText>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.onOpenInBrowser}
                    hitSlop={{ top: 10, bottom: 10, right: 10, left: 20 }}
                >
                    <IconComponent id=''
                        style={{
                            color: customColours.neutralHighContrast,
                            fontSize: 16
                        }}
                    />
                </TouchableOpacity>

            </View>
            <WebView
                style={{
                    width: 400,
                    height: 500
                }}
                source={{ uri: this.state.uri }}
                originWhitelist={['*']}
                onLoad={this.onLoad}
                contentMode={this.state.uri.includes("docs.google") ? "desktop" : "mobile"}
            />
        </View>
    }
}