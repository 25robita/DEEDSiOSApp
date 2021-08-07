import parse from "node-html-parser";
import React, { Component } from "react";
import { FlatList, Image, Linking, Pressable, View } from "react-native";
import { ContentText } from "./components/TextComponents";
import { customColours } from "./consts";
import { openURL } from "./RootNavigation";

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
    return <Image
        resizeMode='contain'
        style={[{ width: 300, height: 300 }, ...props.style]} // good enough
        source={{ uri }}
    ></Image>
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

function renderHTMLElement(elem, style) {
    console.log("renderHTML.js:7 says:", JSON.stringify(elem.attributes));
    let styles = [...style];
    (elem.attributes && elem.attributes.style)
        ? styles.push(parseStyle(elem.attributes.style))
        : null
    switch (elem.tagName) {
        case "P":
            return <HTMLParagraph style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLParagraph>
        case "STRONG":
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
            return <View style={styles}>{elem.childNodes.map(i => renderHTMLElement(i, styles))}</View>
    }
}

export function renderHTMLText(string) {
    return renderHTMLElement(parse(string), []);
}