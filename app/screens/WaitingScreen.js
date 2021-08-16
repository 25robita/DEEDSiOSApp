import React from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';

function WaitingScreen() {
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
                    color="white"
                />
            </View>
        </ImageBackground>
    );
}

export default WaitingScreen;