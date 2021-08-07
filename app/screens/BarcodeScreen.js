import React, { Component } from "react";
import { DOMImplementation, XMLSerializer } from 'xmldom';
import JsBarcode from 'jsbarcode';
import { View } from "react-native";
import Svg, { Rect, SvgUri, SvgXml } from "react-native-svg";

const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

console.log("BarcodeScreen.js:9 says:", JsBarcode);

JsBarcode(svgNode, '18334', {
    xmlDocument: document,
});

const svgText = xmlSerializer.serializeToString(svgNode);

console.log("BarcodeScreen.js:19 says:", svgText);

class BarcodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <SvgXml xml={svgText} />
            // <View>

            // </View>
        );
    }
}

export default BarcodeScreen;