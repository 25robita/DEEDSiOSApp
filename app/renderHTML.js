import parse from "node-html-parser";
import React, { Component } from "react";
import { FlatList, Image, Linking, Pressable, View } from "react-native";
import { ContentText } from "./components/TextComponents";
import { customColours } from "./colours";
import { openURL } from "./RootNavigation";
import WebView from "react-native-webview";

function HTMLSpan(props) {
    return <ContentText {...props} style={props.style}>
        {props.children}
    </ContentText>
}

function HTMLParagraph(props) {
    return <HTMLSpan style={[{ marginBottom: 10 }, ...props.style]}>
        {props.children}
    </HTMLSpan>
}

class HTMLAnchor extends Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        console.log("renderHTML.js:25 says:", this.props.href);
        openURL(this.props.href)
    }
    render() {/*<Pressable  style={{ display: "inline" }}>*/
        return <HTMLSpan onPress={this.onPress} style={[{ color: customColours.harshBlue }, ...this.props.style]}>
            {this.props.children}
        </HTMLSpan>
        // </Pressable>
    }
}

class HTMLUnorderedList extends Component {
    constructor(props) {
        super(props)
    }
    keyExtractor(a, b) {
        return a + b
    }
    renderItem = ({ item }) => {
        if (item.tagName == "LI") {
            return <HTMLSpan style={this.props.style}><HTMLSpan style={{ fontWeight: "700" }}>•</HTMLSpan> {item.text}</HTMLSpan>
        }
        // return item.nodeType == 1 ? renderHTMLElement(item) : <HTMLSpan style={this.props.style}>{item.text}</HTMLSpan>
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

function HTMLImage(props) {
    let uri = (!props.src.startsWith("https") ? "https://deeds.cgs.vic.edu.au" : "") + props.src
    console.log("renderHTML.js:60 says:", uri);
    return <View style={{
        width: "100%",
        display: 'flex',
        alignItems: "center",
        paddingHorizontal: 100
    }}>
        <Image
            resizeMode='contain'
            style={[{ width: 300, height: 300, paddingHorizontal: 100 }, ...props.style]} // good enough
            source={{ uri }}
        />
    </View>
}

function parseStyle(style) {
    let properties = {
        "text-align": "textAlign",
        "color": "color"
    }
    let outputStyle = {}
    let _, property, value;
    for ([_, property, value] of style.matchAll(/(\w+)\s*:\s*([^;]*);/g)) {
        if (properties[property]) {
            outputStyle[properties[property]] = value;
        }
    }
    return outputStyle
}

class HTMLWebView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    onLoad = (syntheticEvent) => {
        console.log("renderHTML.js:98 says:", syntheticEvent.nativeEvent.title);
        let title = syntheticEvent.nativeEvent.title;
        title = (title.length > 30)
            ? title.slice(0, 27) + "..."
            : title
        this.setState({ title })
    }
    render() {
        return <View>
            <View
                style={{
                    backgroundColor: customColours.lightBlue,
                    padding: 10
                }}
            >
                <ContentText
                    style={{
                        fontSize: 20
                    }}
                >{this.state.title}</ContentText>
            </View>
            <WebView
                style={{ backgroundColor: 'pink', width: 400, height: 500 }}
                containerStyle={{ backgroundColor: 'pink' }}
                source={{ uri: this.props.uri }}
                originWhitelist={['*']}
                onLoad={this.onLoad}
                contentMode='desktop'
            />
        </View>
    }
}

function renderHTMLElement(elem, style) {
    // console.log("renderHTML.js:7 says:", JSON.stringify(elem.attributes));
    let elemAttributes = elem.attributes
    let styles = [...style];
    (elem.attributes && elem.attributes.style)
        ? styles.push(parseStyle(elem.attributes.style))
        : null
    // if (elem.nodeType == 3) { idk what to do here
    //     return <HTMLSpan style={styles}>{elem.text}</HTMLSpan>
    // }
    switch (elem.tagName) {
        case "P":
            return <HTMLParagraph style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLParagraph>
        case "STRONG":
        case "B":
            styles.push({ fontWeight: "700" })
            return <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
        case "SPAN":
            return <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
        case "A":
            return <HTMLAnchor href={elem.attributes.href} style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLAnchor>
        case "UL":
            return <HTMLUnorderedList style={styles} data={[...elem.childNodes]}></HTMLUnorderedList>
        case "IMG":
            return <HTMLImage style={style} src={elem.attributes.src}></HTMLImage>
        default:
            if (elem.outerHTML && elem.outerHTML.includes('data-oembed-url')) {
                return <HTMLWebView uri={elem.outerHTML.matchAll(/data-oembed-url="([^"]*)"/g).next().value[1]} />
            }
            return <View style={styles}>{elem.childNodes.map(i => renderHTMLElement(i, styles))}</View>
    }
}

export function renderHTMLText(string) {
    return renderHTMLElement(parse(string), []);
}