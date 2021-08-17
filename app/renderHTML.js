import parse from "node-html-parser";
import React from "react";
import { View } from "react-native";
import { customColours } from "./colours";
import HTMLAnchor from "./components/HTMLComponents/AnchorComponent";
import HTMLImage from "./components/HTMLComponents/ImageComponent";
import HTMLParagraph from "./components/HTMLComponents/ParagraphComponent";
import SocialStreamAttatchment from "./components/HTMLComponents/SocialStreamAttatchmentComponent";
import HTMLSpan from "./components/HTMLComponents/SpanComponent";
import HTMLUnorderedList from "./components/HTMLComponents/UnorderedListComponent";
import HTMLWebView from "./components/HTMLComponents/WebViewComponent";
import { serviceURL } from "./consts";


function parseStyle(style) {
    let properties = {
        "text-align": "textAlign",
        "color": "color",
        "background-color": "backgroundColor"
    }
    let outputStyle = {}
    let _, property, value;
    for ([_, property, value] of style.matchAll(/([\w-]+)\s*:\s*([^;]*);/g)) {
        if (properties[property]) {
            outputStyle[properties[property]] = value;
        }
    }
    return outputStyle
}


function getLastStyleDecleration(styles, property, fallback) {
    let value = fallback
    Array.from(styles).forEach(style => {
        if (style[property]) {
            value = style[property]
        }
    })
    return value
}

export function renderHTMLElement(elem, style) {
    let elemAttributes = elem.attributes
    let styles = [...style];
    let fontSize = getLastStyleDecleration(styles, 'fontSize', 16);
    (elemAttributes && elemAttributes.style)
        ? styles.push(parseStyle(elemAttributes.style))
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
        case "EM":
        case "I":
            styles.push({ fontStyle: 'italic' })
            return <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
        case "U":
            styles.push({ textDecorationLine: 'underline' })
            return <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
        case "S":
            styles.push({ textDecorationLine: "line-through" })
            return <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
        case "SUB":
            styles.push({
                fontSize: fontSize / 1.5,
            })
            return <View
                style={{
                    // justifyContent: 'baseline',
                    alignItems: 'flex-end',
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    transform: [{
                        translateY: fontSize / 2.5
                    }]
                }}
            >
                <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
            </View>
        case "SUP":
            fontSize = getLastStyleDecleration(styles, 'fontSize', 16)
            styles.push({
                fontSize: fontSize / 1.5,
            })
            return <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: fontSize
                }}
            >
                <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
            </View>
        case "BLOCKQUOTE":
            styles.push({ fontStyle: 'italic', color: customColours.blockquoteForeground })
            return <View
                style={{
                    width: '100%',
                    backgroundColor: customColours.blockquoteBackground,
                    borderColor: customColours.blockquoteBorder,
                    borderLeftWidth: 5,
                    paddingLeft: 20,
                    marginBottom: 10
                }}
            >
                <HTMLSpan style={styles}>
                    {elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}
                </HTMLSpan>
            </View>
        case "H1":
            styles.push({ fontSize: 20 })
            return <HTMLSpan style={styles}>{elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))}</HTMLSpan>
        case "H2":
            styles.push({ fontSize: 18 })
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
            if (elem.outerHTML && elem.classList.contains("socialstream-attachment")) {
                if (elem.querySelector("iframe")) {
                    return <HTMLWebView
                        uri={elem.querySelector("iframe").attributes.src}
                    />
                }
                let urlElem = elem.querySelector("a")
                let url = urlElem && urlElem.attributes.href
                let text = urlElem && urlElem.text.trim()

                let imgElem = elem.querySelector("img")
                let imageURI = imgElem && imgElem.attributes.src
                console.log("renderHTML.js:311 says:", serviceURL + imageURI);
                let mimeTypeRegex = imgElem && imgElem.attributes.src.matchAll(/\/([\w-]+)\..*/g).next().value
                let mimeType = mimeTypeRegex && mimeTypeRegex[1].replace("-", '/')
                return <SocialStreamAttatchment
                    url={url}
                    text={text}
                    mimeType={mimeType}
                    imageURI={serviceURL + imageURI}
                />
            }
            if (elem.outerHTML && elem.outerHTML.includes('data-oembed-url')) {
                return <HTMLWebView uri={elem.outerHTML.matchAll(/data-oembed-url="([^"]*)"/g).next().value[1]} />
            }
            return <View style={styles}>{elem.childNodes.map(i => renderHTMLElement(i, styles))}</View>
    }
}

export function renderHTMLText(string) {
    return renderHTMLElement(parse(string), []);
}