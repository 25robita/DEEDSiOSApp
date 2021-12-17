import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
import { navigate } from '../RootNavigation';
import { styles } from '../styles';
import { ContentText } from './ContentTextComponent';
import IconComponent from './IconComponent';
export function SectionHeading(props) {
    const { colors: customColours } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigate(props.navigatorName)}
        >
            <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: "row",
                alignItems: 'baseline'
            }}>
                <ContentText
                    style={[

                        styles.heading,
                        {
                            color: customColours.neutralHighContrast
                        },
                        styles.sectionHeading
                    ]}
                >
                    {props.children}
                </ContentText>
                <IconComponent
                    name="next"
                    style={{
                        fontSize: 16
                    }}
                />
            </View>
        </TouchableOpacity>

    )
}