import React, { ReactChildren, useContext, useState } from 'react'
import { Text, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { ThemeContext } from '../../ThemeProvider'
import { ContentText } from '../components/ContentTextComponent'
import ScrollingScreenTemplate from './ScrollingScreenTemplate'

function SettingsIsland(props: { title?: string, children?: ReactChildren }) {
    const { colors } = useContext(ThemeContext)
    return <View
        style={{
            padding: 20
        }}
    >
        <Text
            style={{
                textTransform: "uppercase",
                fontSize: 14,
                margin: 10,
                color: colors.neutralLowContrast
            }}
        >
            {props.title}
        </Text>
        <View
            style={{
                padding: 15,
                borderRadius: 20,
                backgroundColor: colors.contentBackground,
            }}
        >
            {props.children}
        </View>
    </View>
}

function SettingsSwitch(props: { label: string, disabled?: boolean, value?: boolean, onValueChange?: (value: boolean) => any, first?: boolean }) {
    return <View
        style={[{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }, !props.first ? {
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#3f3f3f'
        } : {}]} >
        <ContentText
            style={{
                fontSize: 16
            }}
        >
            {props.label}
        </ContentText>
        <Switch
            disabled={props.disabled}
            value={props.value}
            onValueChange={props.onValueChange}
        />
    </View>
}

export default function SettingsScreen(props: any) {
    const [isDark, setIsDark] = useState(true);
    const [isAuto, setIsAuto] = useState(true);

    const [isCool, setCool] = useState(true);

    const { colors } = useContext(ThemeContext);

    return <View>
        <ScrollingScreenTemplate>
            <SettingsIsland
                title="Appearance"
            >
                <SettingsSwitch
                    label="Theme"
                    value={isDark}
                    onValueChange={setIsDark}
                    disabled={isAuto}
                    first={true}
                />
                <SettingsSwitch
                    label="Automatic"
                    value={isAuto}
                    onValueChange={setIsAuto}
                />
            </SettingsIsland>
            <SettingsIsland
                title="coolness"
            >
                <SettingsSwitch
                    label="Is Cool?"
                    value={isCool}
                    onValueChange={setCool}
                    first={true}
                />
            </SettingsIsland>
        </ScrollingScreenTemplate>

    </View>
}