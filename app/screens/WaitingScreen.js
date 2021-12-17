import React, { useContext } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';

function WaitingScreen() {
    let { colors } = useContext(ThemeContext);
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

export default WaitingScreen;