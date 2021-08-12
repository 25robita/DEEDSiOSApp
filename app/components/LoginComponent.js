import { getItemAsync } from 'expo-secure-store';
import React, { Component } from 'react';
import { Text, TextInput, View, Animated, Image, TouchableOpacity, Linking } from 'react-native';
import { Easing, useDerivedValue } from 'react-native-reanimated';
import { loginStyles, styles } from '../consts';
import { ContentText } from './TextComponents';

const logoImage = { uri: "https://camberwell.files.cloudworkengine.net.au/pub/5EBCDEA4_deeds-logo-with-crest_copy.jpg" }

class LoginComponent extends Component {
    state = {
        moveAnim: new Animated.Value(0),
        username: "",
        password: "",
        errorMessage: ""
    }

    constructor(props) {
        super(props)
        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()
    }
    onFocus = () => {
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: (this.state.errorMessage ? -225 : -150),
                duration: 300,
                useNativeDriver: false
            }
        ).start()
        // this.setState({ marginBottom: 100 })
    }
    onBlur = () => {
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: 0,
                duration: 700,
                easing: Easing.bounce,
                useNativeDriver: false
            }
        ).start()
        // this.setState({ marginBottom: 0 })
    }
    handleUnameChange = (event = {}) => {
        const value = event.nativeEvent.text
        this.setState({ username: value })
    }
    handlePwordChange = (event = {}) => {
        const value = event.nativeEvent.text
        this.setState({ password: value })
    }
    onLogin = _ => {
        this.props.onSubmit(this.state.username, this.state.password, isIncorrectPassword => {
            this.setState({ errorMessage: (isIncorrectPassword.ok) ? "Incorrect username or password" : "Unknown Error encountered" })
        })
    }
    handleOpenBrowserUsername() {
        Linking.openURL("https://camberwell-login.cloudworkengine.net/module.php/accountinfo/forgot-username.php")
    }
    handleOpenBrowserPassword() {
        Linking.openURL("https://camberwell-login.cloudworkengine.net/module.php/accountinfo/start-reset.php")
    }
    render() {
        return (
            <Animated.View style={[loginStyles.halfContainer, { transform: [{ translateY: this.state.moveAnim }] }]}>
                <Image source={logoImage} resizeMode={'contain'} style={{ width: "100%", height: "40%", alignSelf: "center" }}></Image>
                <ContentText style={[loginStyles.text, loginStyles.loginHeader, { marginBottom: (this.state.errorMessage ? 25 : 50) }]}>Please enter your username and password</ContentText>
                {
                    this.state.errorMessage
                    && <View style={[loginStyles.errorContainer]}>
                        <ContentText style={loginStyles.error}>{this.state.errorMessage}</ContentText>
                    </View>
                }
                <View style={loginStyles.inputView}>
                    <TextInput
                        onChange={this.handleUnameChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        style={[loginStyles.input, loginStyles.usernameInput]}
                        placeholder="Username"
                        placeholderTextColor={"#5b5b5b"}
                        value={this.state.username}
                    />
                    <TextInput
                        onChange={this.handlePwordChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        style={[loginStyles.input, loginStyles.passwordInput]}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={"#5b5b5b"}
                    ></TextInput>
                    <View style={loginStyles.buttonsContainer}>
                        <View style={loginStyles.iForgotContainer}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.handleOpenBrowserUsername}>
                                <ContentText style={loginStyles.iForgot}>I forgot my username</ContentText>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.handleOpenBrowserPassword}>
                                <ContentText style={loginStyles.iForgot}>I forgot my password</ContentText>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onLogin}>
                            <View style={loginStyles.submitButton}>
                                <ContentText style={loginStyles.submitText}>Sign In</ContentText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View >

        )
    }
}

export default LoginComponent;