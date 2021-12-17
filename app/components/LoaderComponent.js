import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from '../styles';
import { Meta } from './MetaTextComponent';


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
            <View style={props.state == "loaded" ? {} : { display: "none" }}>
                {props.children}
            </View>
        </View>

    );
}

export default LoaderComponent;