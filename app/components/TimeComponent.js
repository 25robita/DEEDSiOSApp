import React from 'react';
import { View } from 'react-native';
import IconComponent from './IconComponent';
import { Meta } from './MetaTextComponent';

function TimeComponent(props) {
    return (
        <View
            style={[
                {
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                },
                props.style
            ]}
        >
            <IconComponent
                name={
                    props.date
                        ? "calendar"
                        : "clock"
                }
            />
            <Meta
                style={{
                    marginLeft: 5
                }}
            >
                {props.time}
            </Meta>
        </View>
    );
}



export default TimeComponent;