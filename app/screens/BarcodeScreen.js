import JsBarcode from 'jsbarcode';
import React, { Component } from "react";
import { View } from "react-native";
import { Appearance } from 'react-native-appearance';
import { DOMImplementation, XMLSerializer } from 'xmldom';
import { ThemeContext } from '../../ThemeProvider';
import { coloursDark, coloursLight } from '../colours';
import { barcodeExplanation } from "../lang";
import { renderHTMLText } from "../renderHTML";

class BarcodeScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props);
        this.state = { svgText: "", svgData: [] };
    }
    componentDidMount = () => {
        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        const xmlSerializer = new XMLSerializer();
        const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
        const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        JsBarcode(svgNode, this.props.route.params.id, {
            xmlDocument: document,
            lineColor: customColours.themePrimary,
            height: 100,
            width: 4,
            margin: 0,
            displayValue: false,
            // format: "MSI10"
        });
        const svgText = xmlSerializer.serializeToString(svgNode);

        let svgData = Array.from(svgNode?.lastChild?.childNodes || [])
            .map(i => [
                i.getAttribute("x"),
                i.getAttribute("width")
            ]);

        this.setState({ svgText, svgData })
    }
    render() {
        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        let lastItem,
            width,
            fillColor = customColours.barcodeColor || customColours.themePrimary;
        return (
            <View style={{ height: "100%", paddingHorizontal: 10, display: "flex", justifyContent: "flex-end", backgroundColor: customColours.background }}>
                <View>
                    {renderHTMLText(barcodeExplanation.replaceAll("{STUDENT_ID}", this.props.route.params.id))}
                </View>
                {
                    this.state.svgData.length
                        ? <View style={{ height: "25%" }}>
                            {
                                lastItem = this.state.svgData[this.state.svgData.length - 1],
                                width = lastItem[1] - - lastItem[0],
                                this.state.svgData.map(i =>
                                    <View style={{
                                        backgroundColor: fillColor,
                                        height: '100%',
                                        width: Math.round((Number(i[1]) / width) * 100) + "%",
                                        position: "absolute",
                                        top: 0,
                                        left: Math.round((Number(i[0]) / width) * 100) + "%"
                                    }}></View>
                                )
                            }
                        </View>
                        : null
                }
            </View>
        );
    }
}

export default BarcodeScreen;