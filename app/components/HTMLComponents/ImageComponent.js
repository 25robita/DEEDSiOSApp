import React from 'react';
import { Image, View } from 'react-native';
import { serviceURL } from '../../consts';

export default function HTMLImage(props) {
    let uri = (!props.src.startsWith("https") ? serviceURL : "") + props.src
    return <View style={{
        width: "100%",
        display: 'flex',
        alignItems: "center",
        paddingHorizontal: 100
    }}>
        <Image
            resizeMode='contain'
            style={[
                {
                    width: 300,
                    height: 300,
                    paddingHorizontal: 100
                },
                ...props.style
            ]} // good enough (won't be the right size for all images but itll be fine)
            source={{ uri }}
        />
    </View>
}