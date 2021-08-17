import React from 'react';
import WebView from 'react-native-webview';
import SchoolboxComponent from './SchoolboxComponent';

export default function SchoolboxLTI(props) {
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}>
        <WebView
            source={{ uri: props.url }}
            originWhitelist={['*']}
            style={{
                height: '100%',
                width: '100%'
            }}
            containerStyle={{
                height: 400
            }}
        />
    </SchoolboxComponent>
}