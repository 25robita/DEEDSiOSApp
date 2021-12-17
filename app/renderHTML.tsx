import parse, { HTMLElement } from "node-html-parser";
import React from "react";
import { Appearance, View } from "react-native";
import { coloursDark, coloursLight } from "./colours";
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
import HTMLTable from "./components/HTMLComponents/TableComponent";
import HTMLUnorderedList from "./components/HTMLComponents/UnorderedListComponent";
import HTMLWebView from "./components/HTMLComponents/WebViewComponent";
import { serviceURL } from "./consts";
import {
    HTMLStyles,
    HTMLSubscriptSuperscriptFontSizeMultiplier
} from "./styles";

function parseStyle(style: any) {
    const properties: any = {
        // map of known properties to render
        "text-align": "textAlign",
        color: "color",
        "background-color": "backgroundColor",
    };
    let outputStyle: Record<string, string> = {};
    let _, property, value;
    for ([_, property, value] of style.matchAll(/([\w-]+)\s*:\s*([^;]*);/g)) {
        if (properties[property]) {
            outputStyle[properties[property]] = value;
        }
    }


    // in case forground color is too dark for dark mode
    if (Appearance.getColorScheme() == "dark" && outputStyle.color && !outputStyle.backgroundColor) {
        let doInvert = true;
        let red: number, green: number, blue: number;
        if (outputStyle.color.startsWith("#")
            && !outputStyle.color.replace(/[#012]/g, '').length) {
            let value = parseInt(outputStyle.color.replace("#", ''), 16);
            blue = value % 256;
            value = Math.floor(value / 256)
            green = value % 256
            value = Math.floor(value / 256)
            red = value % 256
        } else if (outputStyle.color.startsWith("rgb")) {
            [red, green, blue] = outputStyle.color.matchAll(/(\d+).*[,)]?/g).next().value.slice(1).map(i => parseInt(i))
            doInvert = (red + green + blue > 102)
        } else {
            doInvert = false;
        }
        if (doInvert) {
            let color = [red, green, blue];
            let outputColor: number[] = [-1, -1, -1];

            let minIndex = color.indexOf(Math.min(...color));
            let maxIndex = color.lastIndexOf(Math.max(...color));
            let midIndex =
                (![minIndex, maxIndex].includes(0))
                    ? 0
                    : (
                        (![minIndex, maxIndex].includes(1))
                            ? 1
                            : 2
                    );
            outputColor[minIndex] = 255 - Math.max(...color);
            outputColor[maxIndex] = 255 - Math.min(...color);

            outputColor[outputColor.indexOf(-1)] = 255 - color[midIndex];

            outputStyle.color = "#" + outputColor.map(number => number.toString(16)).join("");
        }
    }

    return outputStyle;
}

function renderChildren(elem: HTMLElement, styles: any[]) {
    // renders children of an element
    return elem.childNodes.map((i: any) =>
        i.nodeType == 1 ? renderHTMLElement(i, styles) : i.text
    );
}

export function getLastStyleDecleration(
    styles: any[],
    property: string,
    fallback: any,
    ignore: number = 0
): any {
    let values: any[] = [];
    Array.from(styles)
        .reverse()
        .forEach((style) => {
            if (style[property]) {
                values.push(style[property]);
            }
        });
    return values[ignore] ?? fallback;
}

export function renderHTMLElement(elem: any, style: any[], forceStyleString?: string) {
    let customColours = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
    let elemAttributes = elem.attributes;
    let styles = [...style];
    let styleString = forceStyleString ?? elemAttributes?.style ?? ""
    let fontSize = getLastStyleDecleration(styles, "fontSize", 16);
    styleString && styles.push(parseStyle(styleString));
    [...(elem?.parentNodes || [])].filter((i) => i.tagName == "LI").length &&
        console.log("renderHTML.js:56 says:", styleString);
    switch (elem.tagName) {
        case "P":
            if (
                elem?.attributes?.style &&
                styles?.[styles.length - 1]?.textAlign == "right"
            ) {
                style.push({ alignSelf: "flex-end" });
            } else {
                console.log(
                    "renderHTML.js:63 says:",
                    elem?.attributes?.style && styles?.[styles.length - 1]
                );
            }
            return (
                <HTMLParagraph style={styles}>
                    {renderChildren(elem, styles)}
                </HTMLParagraph>
            );
        case "STRONG":
        case "B":
            let fontWeightNumber: number = parseInt(
                getLastStyleDecleration(styles, "fontWeight", 400)
            );
            if (fontWeightNumber < 400) {
                fontWeightNumber = 400;
            } else if (fontWeightNumber < 600) {
                fontWeightNumber = 700;
            } else {
                fontWeightNumber = 900;
            }
            let fontWeight: string = fontWeightNumber.toString();
            styles.push({
                fontWeight, // bolder, which is the spec
            });
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "EM":
        case "I":
            styles.push(HTMLStyles.em);
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "U":
            styles.push(HTMLStyles.underline);
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "FONT": // idk why this tag exists but sure
            styles.push({
                fontSize: elem?.attributes?.size * 8,
                lineHeight: getLastStyleDecleration(styles, "fontSize", 16),
            });
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "S":
            styles.push(HTMLStyles.strikethrough);
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "SUB":
            styles.push({
                fontSize: fontSize * HTMLSubscriptSuperscriptFontSizeMultiplier,
            });
            return (
                <HTMLSubscript style={styles}>
                    {renderChildren(elem, styles)}
                </HTMLSubscript>
            );
        case "SUP":
            styles.push({
                fontSize: fontSize * HTMLSubscriptSuperscriptFontSizeMultiplier,
            });
            return (
                <HTMLSuperscript style={styles}>
                    {renderChildren(elem, styles)}
                </HTMLSuperscript>
            );
        case "BLOCKQUOTE":
            styles.push({
                ...HTMLStyles.blockquote,
                color: customColours.blockquoteForeground
            });
            return (
                <HTMLBlockQuote style={styles}>
                    {renderChildren(elem, styles)}
                </HTMLBlockQuote>
            );
        case "H1":
            styles.push(HTMLStyles.h1);
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "H2":
            styles.push(HTMLStyles.h2);
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "SPAN":
            return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>;
        case "A":
            return (
                <HTMLAnchor href={elem.attributes.href} style={styles}>
                    {renderChildren(elem, styles)}
                </HTMLAnchor>
            );
        case "UL":
            return (
                <HTMLUnorderedList
                    style={styles}
                    data={[...elem.childNodes].filter((i: any) => i.text.trim())}
                />
            );
        case "OL":
            return (
                <HTMLOrderedList
                    style={styles}
                    data={[...elem.childNodes].filter((i: any) => i.text.trim())}
                />
            );
        case "IMG":
            return <HTMLImage style={styles} src={elem.attributes.src} />;
        case "TABLE":
            return <HTMLTable style={styles} elem={elem}></HTMLTable>
        // case "TR":
        //     return <HTMLTableRow style={styles}>{renderChildren(elem, styles)}</HTMLTableRow>
        // case "TD":
        //     return <HTMLSpan style={styles}>{renderChildren(elem, styles)}</HTMLSpan>
        default:
            if (elem?.classList?.contains?.("socialstream-attachment")) {
                if (elem.querySelector("iframe")) {
                    console.log(
                        "renderHTML.js:104 says:",
                        elem.querySelector("iframe").attributes.src
                    );
                    return (
                        <HTMLWebView uri={elem.querySelector("iframe").attributes.src} />
                    );
                }
                let urlElem = elem.querySelector("a");
                let url = urlElem && urlElem.attributes.href;
                let text = urlElem && urlElem.text.trim();

                let imgElem = elem.querySelector("img");
                let imageURI = imgElem && imgElem.attributes.src;
                let mimeTypeRegex =
                    imgElem &&
                    imgElem.attributes.src.matchAll(/\/([\w-]+)\..*/g).next().value;
                let mimeType = mimeTypeRegex && mimeTypeRegex[1].replace("-", "/");
                return (
                    <SocialStreamAttatchment
                        url={url}
                        text={text}
                        mimeType={mimeType}
                        imageURI={serviceURL + imageURI}
                    />
                );
            }
            if (elem?.attributes?.["data-oembed-url"]) {
                return <HTMLWebView uri={elem.attributes["data-oembed-url"]} />;
            }
            return (
                <View style={styles}>
                    {elem.childNodes.map((i: any) => renderHTMLElement(i, styles))}
                </View>
            );
    }
}

export function renderHTMLText(HTML: string): any {
    if (!/<.*>/g.test(HTML)) {
        return <ContentText>{HTML}</ContentText>;
    }
    return renderHTMLElement(parse(HTML), []);
}
