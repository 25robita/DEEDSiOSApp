import React from 'react';
import { ActivityIndicator, ShadowPropTypesIOS, Text, View } from 'react-native';
import { styles } from '../consts';
import { ContentText, Meta } from './TextComponents';


function LoaderComponent(props) {
    return (
        <View style={props.style}>
            {
                (props.state == "loading")
                && <ActivityIndicator
                    style={[styles.loader, props.loaderStyle]}
                    size={props.size}
                />
            }
            {
                (props.state == "failed")
                && <Meta style={[styles.failedLoad, props.loaderStyle]}>
                    {props.failText}
                </Meta>
            }
            {
                props.state == "loaded"
                && props.children
            }
        </View>

    );
}

export default LoaderComponent;