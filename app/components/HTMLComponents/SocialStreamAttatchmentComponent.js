import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { openURL } from '../../RootNavigation';
import { ContentText } from '../ContentTextComponent';
import IconComponent from '../IconComponent';

export default function SocialStreamAttatchment(props) {
    const { colors } = useContext(ContentText)
    return <View>
        <TouchableOpacity
            onPress={() => openURL(props.url)}
            activeOpacity={0.5}
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <IconComponent
                style={{
                    fontSize: 20,
                    marginRight: 10
                }}
                name="document"
            />
            <ContentText
                style={{
                    color: colors.link
                }}
            >
                {props.text}
            </ContentText>
        </TouchableOpacity>
    </View>
}