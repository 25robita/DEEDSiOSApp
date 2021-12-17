import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../ThemeProvider';
import { openURL } from '../../RootNavigation';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';
import SchoolboxComponent from './SchoolboxComponent';

function SchoolboxLinks_Link(props) {
    const { colors: customColours } = useContext(ThemeContext);
    let icon;
    switch (props.type) {
        case "file":
            icon = 'document'
            break
        case "homepage":
            icon = "home"
            break
        default:
            icon = 'link'
    }
    return <TouchableOpacity
        onPress={() => openURL(props.url)}
        activeOpacity={0.5}
        style={{
            padding: 10,
            borderBottomColor: customColours.neutralLowContrast,
            borderBottomWidth: props.isLast ? 0 : 1,
            flexDirection: 'row',
            alignItems: 'center'
        }}
    >
        <IconComponent
            name={icon}
            style={{
                marginRight: 10,
                fontSize: 20
            }}
        />
        <ContentText
            style={{
                color: customColours.link
            }}
        >
            {props.text}
        </ContentText>
    </TouchableOpacity>
}

export default function SchoolboxLinks(props) {
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}
        noTitle={!Boolean(props.title)}
        contentStyle={{
            padding: 0
        }}
    >
        <FlatList
            renderItem={({ item: { url, text, isLast } }) => {
                return <SchoolboxLinks_Link
                    type={props.type}
                    url={url}
                    text={text.trim ? text.trim() : ""}
                    isLast={isLast}
                />
            }}
            keyExtractor={(a, b) => a + b}
            data={props.links}
        />
    </SchoolboxComponent>
}

