import React from 'react';
import { styles } from '../styles';
import { icons } from '../consts';
import { ContentText } from './ContentTextComponent';


function IconComponent(props) {
    return (
        <ContentText
            style={[
                styles.icon,
                {
                    fontSize: 10
                },
                props.style
            ]}
        >
            {icons[props.name] || props.id}
        </ContentText>
    );
}

export default IconComponent;