import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider';
import { icons } from '../consts';
import { styles } from '../styles';
import { ContentText } from './ContentTextComponent';

function IconComponent(props: { name: string, style: object | null } | { id: string, style: object | null }) {
    // let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
    const { colors } = useContext(ThemeContext)
    return (
        <ContentText
            {...props}
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