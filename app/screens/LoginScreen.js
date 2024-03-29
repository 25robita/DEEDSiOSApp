import { setItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
import LoginComponent from '../components/LoginComponent';
import { authenticate } from '../getters/authenticate';
import { fetchHTMLResource } from '../getters/get';
import { loginStyles, styles } from '../styles';

const backgroundImage = { uri: "https://camberwell.files.cloudworkengine.net.au/pub/5EABB6EF_190220CGS-339.jpg" };

class LoginScreen extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props)
    }
    handleLogin = (username, password, callback) => {
        console.log(username, password)
        setItemAsync("u", username);
        setItemAsync("p", password);
        authenticate(username, password).then((a) => {
            console.log(a)
            fetchHTMLResource("/")
                .then(d => {
                    let js = d
                        .querySelectorAll("script")
                        .filter(i => !i.src && /schoolboxUser\s+=/g.test(i.text))
                        .map(i => i.text)[0]
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
                }, callback)
        })
    }
    render() {
        return (
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: this.context.colors.background
                    }
                ]}
            >
                <View
                    style={[
                        styles.topBar,
                        {
                            height: "10%"
                        }
                    ]}
                ></View>
                <ImageBackground
                    source={backgroundImage}
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: 'hidden'
                    }}
                >
                    <SafeAreaView
                        style={[
                            loginStyles.mainContainer,
                            {
                                opacity: 0.92
                            }
                        ]}
                    >
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