import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { ImageBackground, SafeAreaView, Text, TextInput, View } from 'react-native';
import LoginComponent from '../components/LoginComponent';
import { loginStyles, styles } from '../styles';
import { fetchHTMLResource } from '../getters/get';

const backgroundImage = { uri: "https://camberwell.files.cloudworkengine.net.au/pub/5EABB6EF_190220CGS-339.jpg" };

class LoginScreen extends Component {
    constructor(props) {
        super(props)
    }
    handleLogin = (u, p, cb) => {
        setItemAsync("u", u);
        setItemAsync("p", p);
        fetchHTMLResource("/")
            .then(d => {
                let js = d
                    .querySelectorAll("script")
                    .filter(i => !i.src && /schoolboxUser\s+=/g.test(i.innerText))
                    .map(i => i.innerText)[0]
                js = js.replaceAll(/\n\s+/g, "\n").replaceAll(/\s+=\s+/g, " = ")
                js = js.slice(js.indexOf("var schoolboxUser"), js.lastIndexOf("\n//"))
                let jsVars = Array.from(
                    js.matchAll(/(\w+) = ([^\n;]*)/g)
                )
                    .map(([_, name, value]) =>
                        [
                            name,
                            (value.startsWith("Boolean")
                                ? Boolean(
                                    JSON.parse(
                                        Array.from(
                                            value.matchAll(/Boolean\(([^\)]+)\)/g)
                                        )[0][1]
                                            .replaceAll("'", '"')
                                    )
                                )
                                : JSON.parse(value)
                            )
                        ]);
                setItemAsync("userMeta", JSON.stringify(
                    Object.fromEntries(
                        jsVars
                    )
                ))
                this.props.navigation.navigate("Home")
            }, cb)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.topBar, { height: "10%" }]}></View>
                <ImageBackground
                    source={backgroundImage}
                    style={{ width: "100%", height: "100%" }}
                >
                    <SafeAreaView style={[loginStyles.mainContainer, { opacity: 0.92 }]}>
                        <LoginComponent
                            onSubmit={this.handleLogin}
                        />
                    </SafeAreaView>
                </ImageBackground>
            </View >
        );
    }
}

export default LoginScreen;