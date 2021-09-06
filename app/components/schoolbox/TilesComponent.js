import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { serviceURL } from '../../consts';
import { openURL } from '../../RootNavigation';
import { ContentText } from '../ContentTextComponent';
import SchoolboxComponent from './SchoolboxComponent';

export default function SchoolboxTiles(props) {
    let tileWidth = props.tileWidth
    if (props.tileWidth.replaceAll('%', '') < 20) {
        tileWidth = '25%'
    }
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}
        noTitle={!Boolean(props.title)}
    >
        <View
            style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}
        >
            {
                props.tiles.map((tile, index) => {
                    let style = props.styles[index],
                        backgroundImageUrl,
                        backgroundImageUrlRegex;
                    if (style) {
                        backgroundImageUrlRegex = style.text.matchAll(/background-image\s*:\s*url\("([^"]*)"\)/g).next().value;
                        backgroundImageUrl = backgroundImageUrlRegex && backgroundImageUrlRegex[1]
                    }
                    let tileTitle = tile.querySelector('span.title');
                    let tileLink = tile.querySelector('a.tile-link');
                    let tileHref = tileLink && tileLink.attributes.href;
                    let justifyContent = tileTitle.classList.contains("text-bottom")
                        ? "flex-end"
                        : (
                            tileTitle.classList.contains("text-middle")
                                ? 'center'
                                : 'flex-start'
                        );
                    let textAlign = tileTitle.classList.contains("text-right")
                        ? 'right'
                        : (
                            tileTitle.classList.contains("text-left")
                                ? 'left'
                                : 'center'
                        )
                    let tileTitleColor,
                        tileTitleBgColor,
                        _a,
                        _b,
                        _ca,
                        _da;

                    let colorStyleRegex = style.text
                        .replaceAll(/\s{2,}/g, ' ')
                        .matchAll(/color\s*:\s*(rgba\(\s*\d+.?\d*\s*,\s*\d+.?\d*\s*,\s*\d+.?\d*\s*,\s*\d+.?\d*\s*\))/g)
                    if (colorStyleRegex[Symbol.iterator]) {
                        [_a, _b, [_ca, tileTitleColor], [_da, tileTitleBgColor]] = colorStyleRegex
                    }
                    return <View
                        style={{
                            width: tileWidth
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={tileHref ? 0.5 : 1}
                            onPress={_ => {
                                tileHref
                                    ? openURL(tileHref)
                                    : null
                            }}
                        >
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: 100,
                                    justifyContent
                                }}
                                resizeMode="contain"
                                source={{ url: serviceURL + backgroundImageUrl }}
                            >
                                <ContentText
                                    style={{
                                        textAlign,
                                        color: tileTitleColor,
                                        backgroundColor: tileTitleBgColor,
                                        width: '100%'
                                    }}
                                >
                                    {tileTitle.text}
                                </ContentText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                }
                )
            }
        </View>
    </SchoolboxComponent>
}