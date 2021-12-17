import React, { Component, useState } from 'react';
import { Animated, Appearance, Image, Linking, TextInput, TouchableOpacity, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { coloursDark, coloursLight } from '../colours';
import { loginForgotPasswordLink, loginForgotUsernameLink } from '../consts';
import { loginCredentialsErrorLabel, loginForgottenPasswordLabel, loginForgottenUsernameLabel, loginPasswordPlaceholderLabel, loginPromptLabel, loginSubmitLabel, loginUnknownErrorLabel, loginUsernamePlaceholderLabel } from '../lang';
import { loginStyles } from '../styles';
import { ContentText } from './ContentTextComponent';


const logoImage = { uri: "https://camberwell.files.cloudworkengine.net.au/pub/5EBCDEA4_deeds-logo-with-crest_copy.jpg" }

function LoginFunctionComponent(props) {
    let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
    const [uName, setUName] = useState("")
    const [pWord, setPWord] = useState("")

    return (
        <Animated.View
            style={[
                loginStyles.halfContainer,
                {
                    transform:
                        [{
                            translateY: props.moveAnim
                        }],
                    backgroundColor: customColours.loginContentBackground || customColours.contentBackground
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
                    {
                        color: customColours.loginText
                    },
                    loginStyles.loginHeader,
                    {
                        marginBottom: (props.errorMessage ? 25 : 50)
                    }
                ]}
            >
                {loginPromptLabel}
            </ContentText>
            {
                props.errorMessage
                    ? <View style={[loginStyles.errorContainer, {
                        backgroundColor: customColours.loginErrorBackground,
                        borderColor: customColours.loginErrorBorder
                    }]}>
                        <ContentText
                            style={[loginStyles.error, {
                                color: customColours.loginErrorForeground
                            }]}
                        >
                            {props.errorMessage}
                        </ContentText>
                    </View>
                    : null
            }
            <View style={loginStyles.inputView}>
                <TextInput
                    onChange={({ nativeEvent: { text } }) => setUName(text)}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    style={[loginStyles.input, {
                        backgroundColor: customColours.loginInputBackground,
                        color: customColours.foreground
                    }, loginStyles.usernameInput]}
                    placeholder={loginUsernamePlaceholderLabel}
                    placeholderTextColor={customColours.loginText}
                />
                <TextInput
                    onChange={({ nativeEvent: { text } }) => setPWord(text)}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    style={[loginStyles.input, {
                        backgroundColor: customColours.loginInputBackground,
                        color: customColours.foreground
                    }, loginStyles.passwordInput]}
                    secureTextEntry={true}
                    placeholder={loginPasswordPlaceholderLabel}
                    placeholderTextColor={customColours.loginText}
                />
                <View style={loginStyles.buttonsContainer}>
                    <View style={loginStyles.iForgotContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            Linking.openURL(loginForgotUsernameLink)
                        }}>
                            <ContentText style={[loginStyles.iForgot, {
                                color: customColours.loginIForgotMyForeground
                            }]}>
                                {loginForgottenUsernameLabel}
                            </ContentText>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            Linking.openURL(loginForgotPasswordLink)
                        }}>
                            <ContentText style={[loginStyles.iForgot, {
                                color: customColours.loginIForgotMyForeground
                            }]}>
                                {loginForgottenPasswordLabel}
                            </ContentText>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onLogin(uName.valueOf(), pWord.valueOf())}>
                        <View style={[loginStyles.submitButton, {
                            backgroundColor: customColours.loginSubmitButtonBackground
                        }]}>
                            <ContentText style={[loginStyles.submitText, {
                                color: customColours.loginSubmitButtonForeground
                            }]}>
                                {loginSubmitLabel}
                            </ContentText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View >

    )
}

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
        let value = event?.nativeEvent?.text
        this.setState({ username: value })
    }
    handlePwordChange = (event = {}) => {
        let value = event?.nativeEvent?.text
        this.setState({ password: value })
    }
    onLogin = (username, password) => {
        this.props.onSubmit(username, password, isIncorrectPassword => {
            this.setState({
                errorMessage: (isIncorrectPassword.ok)
                    ? loginCredentialsErrorLabel
                    : loginUnknownErrorLabel
            })
        })
    }
    render() {
        return <LoginFunctionComponent
            moveAnim={this.state.moveAnim}
            errorMessage={this.state.errorMessage}
            username={this.state.username}
            password={this.state.password}
            onLogin={this.onLogin}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
        />
    }
}

export default LoginComponent;