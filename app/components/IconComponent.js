import React from 'react';
import { Text } from 'react-native';
import { icons, styles } from '../consts';
import { ContentText } from './TextComponents';


function IconComponent(props) {
    return (
        <ContentText style={[styles.icon, { fontSize: 10 }, props.style]}>
            {icons[props.name] || props.id}
        </ContentText>
    );
}

export default IconComponent;