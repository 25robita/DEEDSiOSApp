import React, { Component } from 'react';
import { TextInput, View, Animated, Image, TouchableOpacity, Linking } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { customColours } from '../colours';
import { loginForgotPasswordLink, loginForgotUsernameLink } from '../consts';
import { loginForgottenPasswordLabel, loginForgottenUsernameLabel, loginPromptLabel, loginSubmitLabel, loginPasswordPlaceholderLabel, loginUsernamePlaceholderLabel, loginCredentialsErrorLabel, loginUnknownErrorLabel } from '../lang';
import { loginStyles } from '../styles';
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
            this.setState({
                errorMessage: (isIncorrectPassword.ok)
                    ? loginCredentialsErrorLabel
                    : loginUnknownErrorLabel
            })
        })
    }
    handleOpenBrowserUsername() {
        Linking.openURL(loginForgotUsernameLink)
    }
    handleOpenBrowserPassword() {
        Linking.openURL(loginForgotPasswordLink)
    }
    render() {
        return (
            <Animated.View
                style={[
                    loginStyles.halfContainer,
                    {
                        transform:
                            [{
                                translateY: this.state.moveAnim
                            }]
                    }]}
            >
                <Image
                    source={logoImage}
                    resizeMode={'contain'}
                    style={{
                        width: "100%",
                        height: "40%",
                        alignSelf: "center"
                    }}
                />
                <ContentText
                    style={[
                        loginStyles.text,
                        loginStyles.loginHeader,
                        {
                            marginBottom: (this.state.errorMessage ? 25 : 50)
                        }
                    ]}
                >
                    {loginPromptLabel}
                </ContentText>
                {
                    this.state.errorMessage
                        ? <View style={[loginStyles.errorContainer]}>
                            <ContentText
                                style={loginStyles.error}
                            >
                                {this.state.errorMessage}
                            </ContentText>
                        </View>
                        : null
                }
                <View style={loginStyles.inputView}>
                    <TextInput
                        onChange={this.handleUnameChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        style={[loginStyles.input, loginStyles.usernameInput]}
                        placeholder={loginUsernamePlaceholderLabel}
                        placeholderTextColor={customColours.loginText}
                        value={this.state.username}
                    />
                    <TextInput
                        onChange={this.handlePwordChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        style={[loginStyles.input, loginStyles.passwordInput]}
                        secureTextEntry={true}
                        placeholder={loginPasswordPlaceholderLabel}
                        placeholderTextColor={customColours.loginText}
                    />
                    <View style={loginStyles.buttonsContainer}>
                        <View style={loginStyles.iForgotContainer}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.handleOpenBrowserUsername}>
                                <ContentText style={loginStyles.iForgot}>
                                    {loginForgottenUsernameLabel}
                                </ContentText>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.handleOpenBrowserPassword}>
                                <ContentText style={loginStyles.iForgot}>
                                    {loginForgottenPasswordLabel}
                                </ContentText>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onLogin}>
                            <View style={loginStyles.submitButton}>
                                <ContentText style={loginStyles.submitText}>
                                    {loginSubmitLabel}
                                </ContentText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View >

        )
    }
}

export default LoginComponent;