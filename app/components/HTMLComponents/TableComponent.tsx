import { HTMLElement } from 'node-html-parser';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { coloursDark, coloursLight, turnLightnessToTransparency } from '../../colours';
import { renderHTMLElement } from '../../renderHTML';
import { ContentText } from '../ContentTextComponent';

function renderTableCell({ item: { nCells, cell }, index }: { item: { nCells: number, cell: HTMLElement }, index: number }) {
    return <View
        style={{
            // width: `${100 / nCells}%`
            flex: 1
        }}
    >
        <ContentText>
            {cell.innerText}
        </ContentText>
    </View>
}

function renderTableRow({ item, index }: { item: HTMLElement, index: number }) {
    let cells = item.querySelectorAll("td");
    let customColors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
    return <View
        style={{
            flexDirection: "row",
            width: 300,
            justifyContent: 'center',
            alignItems: "center"
        }}
    >
        {
            cells.map(cell => {
                let styleString = cell?.attributes?.style?.toLowerCase()
                let bgColor = styleString?.matchAll?.(/background-color:(#[\da-f]{6});/g)?.next?.()?.value?.[1] || null;
                if (bgColor) {
                    styleString = cell.attributes?.style?.replaceAll(/background-color:[^;]*;/g, '')
                    // console.log("TableComponent.tsx:38 says:", cell.attributes.style, '\n', bgColor, '\n', styleString, '\n\n');
                }
                return <View
                    style={[{
                        flexGrow: 1,
                        flexBasis: 1,
                        flexShrink: 0,
                        height: "100%",
                        borderColor: customColors.foreground,
                        borderWidth: .5,
                        padding: 5,
                    }, bgColor ? { backgroundColor: turnLightnessToTransparency(bgColor).replace(/, (\d+(\.\d+)?)\)/g, (m, p1) => `, ${parseFloat(p1) / 2})`) } : {}]}
                >
                    {
                        renderHTMLElement(cell, [], styleString)
                    }
                </View>
            })
        }
    </View>
}

export default function HTMLTable(props: { elem: HTMLElement }) {
    return <View>
        <FlatList
            style={{
                flexGrow: 1,
                width: 300,
            }}
            renderItem={renderTableRow}
            keyExtractor={(a, b) => a.toString() + b}
            data={props?.elem.querySelectorAll("tr")}
        />
    </View>
}