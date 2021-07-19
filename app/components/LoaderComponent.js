import React from 'react';
import { ActivityIndicator, ShadowPropTypesIOS, Text, View } from 'react-native';
import { styles } from '../consts';
import { ContentText } from './TextComponents';


function LoaderComponent(props) {
    return (
        <View>
            {
                (props.state == "loading")
                    ? <ActivityIndicator style={styles.loader} />
                    : null
            }
            {
                (props.state == "failed")
                    ? <Meta style={[styles.failedLoad]}>
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