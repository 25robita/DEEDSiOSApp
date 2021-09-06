import React, { Component } from 'react';
import { ActivityIndicator, Appearance, ImageBackground, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
import { coloursDark, coloursLight } from '../colours';

class WaitingScreen extends Component {
    static contextType = ThemeContext;
    render() {
        let colors = Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight
        return (
            <ImageBackground
                source={require("../assets/school-logo-with-photo.png")}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                    <ActivityIndicator
                        style={{
                            marginBottom: 100
                        }}
                        size="large"
                        color={colors.waitingActivityColor}
                    />
                </View>
            </ImageBackground>
        );
    }
}

export default WaitingScreen;