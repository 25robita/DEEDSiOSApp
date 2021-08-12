import React from 'react';
import { ActivityIndicator, ShadowPropTypesIOS, Text, View } from 'react-native';
import { styles } from '../styles';
import { ContentText, Meta } from './TextComponents';


function LoaderComponent(props) {
    return (
        <View style={props.style}>
            {
                (props.state == "loading")
                    ? <ActivityIndicator
                        style={[styles.loader, props.loaderStyle]}
                        size={props.size}
                    />
                    : null
            }
            {
                (props.state == "failed")
                    ? <Meta style={[styles.failedLoad, props.loaderStyle]}>
                        {props.failText}
                    </Meta>
                    : null
            }
            {
                props.state == "loaded"
                    ? props.children
                    : null
            }
        </View>

    );
}

export default LoaderComponent;