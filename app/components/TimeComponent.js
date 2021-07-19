import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../consts';
import { Meta } from './TextComponents';
import IconComponent from './IconComponent';

function TimeComponent(props) {
    return (
        <View style={[{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
        }, props.style]}>
            <IconComponent
                name={
                    props.date
                        ? "calendar"
                        : "clock"
                } />
            <Meta style={{ marginLeft: 5 }}>
                {props.time}
            </Meta>
        </View>
    );
}



export default TimeComponent;