import React from 'react';
import { Appearance } from 'react-native';
import { coloursDark, coloursLight } from '../colours';
import { icons } from '../consts';
import { styles } from '../styles';
import { ContentText } from './ContentTextComponent';


function IconComponent(props) {
    let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    return (
        <ContentText
            style={[
                styles.icon,
                {
                    fontSize: 10,
                    color: colors.neutralHighContrast
                },
                props.style
            ]}
        >
            {icons[props.name] || props.id}
        </ContentText>
    );
}

export default IconComponent;