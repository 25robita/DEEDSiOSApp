import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ThemeContext } from '../../../ThemeProvider';
import { openURL } from '../../RootNavigation';
import { styles } from '../../styles';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';

export default function SchoolboxComponent(props) {
    let [collapsed, setCollapsed] = useState(false);

    const { colors } = useContext(ThemeContext)

    useEffect(() => (props.collapsed || false) != collapsed && props.title && setCollapsed(true), [])

    return <View style={[{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        overflow: 'hidden'
    }, styles.shadow, props.style]}>
        <View
            style={{
                backgroundColor: colors.componentTitleBar,
                paddingHorizontal: 10,
                paddingVertical: 7,
                display: (props.title || !props.children) ? 'flex' : "none",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                zIndex: 2
            }}
        >
            <ContentText
                style={{
                    fontSize: 18,
                    // fontWeight: "500"
                }}
            >{props.title || "No title"}</ContentText>

            <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                onPress={() => props.url
                    ? openURL(props.url, false)
                    : setCollapsed(!collapsed)}
            >
                <IconComponent
                    name={
                        props.children
                            ? (collapsed ? "down-arrow" : "up-arrow")
                            : "external-link"
                    }
                    style={{
                        color: colors.neutralHighContrast,
                        fontSize: 16
                    }} />
            </TouchableOpacity>

        </View>
        <Collapsible collapsed={collapsed}>
            <View style={[{
                backgroundColor: colors.contentBackground,
                padding: (props.children && !props.noTitle) ? 20 : 0
            }, props.contentStyle]}>
                {props.children}
            </View>
        </Collapsible>
    </View>
}
