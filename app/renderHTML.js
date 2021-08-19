import parse from "node-html-parser";
import React from "react";
import { View } from "react-native";
import { ContentText } from "./components/ContentTextComponent";
import HTMLAnchor from "./components/HTMLComponents/AnchorComponent";
import HTMLBlockQuote from "./components/HTMLComponents/BlockquoteComponent";
import HTMLImage from "./components/HTMLComponents/ImageComponent";
import HTMLOrderedList from "./components/HTMLComponents/OrderedListComponent";
import HTMLParagraph from "./components/HTMLComponents/ParagraphComponent";
import SocialStreamAttatchment from "./components/HTMLComponents/SocialStreamAttatchmentComponent";
import HTMLSpan from "./components/HTMLComponents/SpanComponent";
import HTMLSubscript from "./components/HTMLComponents/SubscriptComponent";
import HTMLSuperscript from "./components/HTMLComponents/SuperscriptComponent";
import HTMLUnorderedList from "./components/HTMLComponents/UnorderedListComponent";
import HTMLWebView from "./components/HTMLComponents/WebViewComponent";
import { serviceURL } from "./consts";
import { HTMLStyles, HTMLSubscriptSuperscriptFontSizeMultiplier } from "./styles";


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

function renderChildren(elem, styles) { // renders children of an element
    return elem.childNodes.map(i => (i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text))
}

export function getLastStyleDecleration(styles, property, fallback, ignore = 0) {
    let values = []
    Array.from(styles).reverse().forEach(style => {
        if (style[property]) {
            values.push(style[property])
        }
    })
    return values[ignore] ?? fallback
}

export function renderHTMLElement(elem, style) {
    let elemAttributes = elem.attributes
    let styles = [...style];
    let fontSize = getLastStyleDecleration(styles, 'fontSize', 16);
    elemAttributes?.style
        && styles.push(parseStyle(elemAttributes.style))
    // if (elem.nodeType == 3) { idk what to do here
    //     return <HTMLSpan style={styles}>{elem.text}</HTMLSpan>
    // }
    switch (elem.tagName) {
        case "P":
            return <HTMLParagraph style={styles}>{renderChildren(elem, styles)}</HTMLParagraph>
        case "STRONG":
        case "B":
            let fontWeight = parseInt(getLastStyleDecleration(styles, 'fontWeight', 400));
            if (fontWeight < 400) { fontWeight = 400 }
            else if (fontWeight < 600) { fontWeight = 700 }
            else { fontWeight = 900 }
            fontWeight = fontWeight.toString()
            styles.push({
                fontWeight // bolder, which is the spec
            })
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "EM":
        case "I":
            styles.push(HTMLStyles.em)
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "U":
            styles.push(HTMLStyles.underline)
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "S":
            styles.push(HTMLStyles.strikethrough)
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "SUB":
            styles.push({
                fontSize: fontSize * HTMLSubscriptSuperscriptFontSizeMultiplier,
            })
            return <HTMLSubscript style={styles}>{renderChildren(elem, styles)}</HTMLSubscript>
        case "SUP":
            styles.push({
                fontSize: fontSize * HTMLSubscriptSuperscriptFontSizeMultiplier,
            })
            return <HTMLSuperscript style={styles}>{renderChildren(elem, styles)}</HTMLSuperscript>
        case "BLOCKQUOTE":
            styles.push(HTMLStyles.blockquote)
            return <HTMLBlockQuote style={styles}>{renderChildren(elem, styles)}</HTMLBlockQuote>
        case "H1":
            styles.push(HTMLStyles.h1)
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "H2":
            styles.push(HTMLStyles.h2)
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "SPAN":
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        case "A":
            return <HTMLAnchor href={elem.attributes.href} style={styles}>{renderChildren(elem, styles)}</HTMLAnchor>
        case "UL":
            return <HTMLUnorderedList style={styles} data={[...elem.childNodes]} />
        case "OL":
            return <HTMLOrderedList style={styles} data={[...elem.childNodes]} />
        case "IMG":
            return <HTMLImage style={style} src={elem.attributes.src} />
        default:
            if (elem?.classList?.contains?.("socialstream-attachment")) {
                if (elem.querySelector("iframe")) {
                    console.log("renderHTML.js:104 says:", elem.querySelector('iframe').attributes.src);
                    return <HTMLWebView
                        uri={elem.querySelector("iframe").attributes.src}
                    />
                }
                let urlElem = elem.querySelector("a")
                let url = urlElem && urlElem.attributes.href
                let text = urlElem && urlElem.text.trim()

                let imgElem = elem.querySelector("img")
                let imageURI = imgElem && imgElem.attributes.src
                let mimeTypeRegex = imgElem && imgElem.attributes.src.matchAll(/\/([\w-]+)\..*/g).next().value
                let mimeType = mimeTypeRegex && mimeTypeRegex[1].replace("-", '/')
                return <SocialStreamAttatchment
                    url={url}
                    text={text}
                    mimeType={mimeType}
                    imageURI={serviceURL + imageURI}
                />
            }
            if (elem?.attributes?.["data-oembed-url"]) {
                return <HTMLWebView uri={elem.attributes['data-oembed-url']} />
            }
            return <View style={styles}>{elem.childNodes.map(i => renderHTMLElement(i, styles))}</View>
    }
}

export function renderHTMLText(string) {
    if (!/<.*>.*<\/.*>/g.test(string)) {
        return <ContentText>
            {string}
        </ContentText>
    }
    return renderHTMLElement(parse(string), []);
}