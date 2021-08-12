import { darkMode } from "./consts";

export const coloursLight = {
    // theme colours (theme~)
    themePrimary: "#041e42",
    themeSeconday: "#e5f4ff",
    themeTertiary: "#daaa00",

    // other important colours
    background: "#ededed",
    link: "#0066b0",
    foreground: "#242424",
    neutralHighContrast: "#9a9a9a",
    neutralLowContrast: "#ddd",

    // Login Colours (login~)
    loginText: "#5b5b5b",
    loginContentBackground: "", // optional, defaults to contentBackground
    loginInputBackground: "#e0e0e0",
    loginErrorBackground: "#ffaaaa",
    loginErrorForeground: "red",
    loginErrorBorder: "red",
    loginSubmitButtonBackground: "#5598fe",
    loginSubmitButtonForeground: "white",
    loginIForgotMyForeground: "#5598fe",

    // Timetable Colours (timetable~)
    timetableContentBackground: "", // optional, defaults to contentBackground

    // Main Page Colours
    componentTitleBar: "#e5eff7",
    contentBackground: "#ffffff",

    // Header Colours (header~)
    headerForeground: "#ffffff",
    headerBackground: "", // optional, defaults to themePrimary

    // Blockquote Colours (blockquote~)
    blockquoteBackground: '#f6f6f6',
    blockquoteForeground: '#6f6f6f',
    blockquoteBorder: '#aaa',

    // News Item Colours (newsItem~)
    newsItemBackground: "", // defaults to contentBackground
    newsItemPinnedBackground: "", // defaults to themeSecondary

    // Barcode Colours (barcode~)
    barcodeColor: "",

    // Calendar Colours (calendar~)
    calendarBackground: "#f0f0f0",
    calendarHeaderBackground: "#f8f8f8",
    calendarIndentBackground: "white",

    // Navigation Page Colours (navigation~)
    navigation: "", // defaults to themePrimary

    // Homepage Colours (homepage~)
    // Social Stream Colours (homepageSocialStream~)
    homepageSocialStream: "#fafafa",
}

export const coloursDark = {
    // theme colours (theme~)
    themePrimary: "#041e42",
    themeSeconday: "#e5f4ff",
    themeTertiary: "#daaa00",

    // other important colours
    background: "#101114",
    link: "#33a0f3",
    foreground: "#fdfdfd",
    neutralHighContrast: "#ddd",
    neutralLowContrast: "#9a9a9a",

    // Main Page Colours
    contentBackground: "#202124",
    componentTitleBar: "#30313a",

    // Login Colours (login~)
    loginText: "#f0f0f0",
    loginContentBackground: "", // optional, defaults to contentBackground
    loginInputBackground: "#808080",
    loginErrorBackground: "#ffaaaa",
    loginErrorForeground: "red",
    loginErrorBorder: "red",
    loginSubmitButtonBackground: "#5598fe",
    loginSubmitButtonForeground: "white",
    loginIForgotMyForeground: "#5598fe",

    // Timetable Colours (timetable~)
    timetableContentBackground: "", // optional, defaults to contentBackground

    // Header Colours (header~)
    headerForeground: "#ffffff",
    headerBackground: "", // optional, defaults to themePrimary

    // Blockquote Colours (blockquote~)
    blockquoteBackground: '#f6f6f6',
    blockquoteForeground: '#6f6f6f',
    blockquoteBorder: '#aaa',

    // News Item Colours (newsItem~)
    newsItemBackground: "", // defaults to contentBackground
    newsItemPinnedBackground: "#1a2935", // defaults to themeSecondary

    // Barcode Colours (barcode~)
    barcodeColor: "#daaa00", // defaults to themePrimary

    // Calendar Colours (calendar~)
    calendarBackground: "#2f2f2f",
    calendarHeaderBackground: "#101010",
    calendarIndentBackground: "", // defaults to contentBackground

    // Navigation Page Colours (navigation~)
    navigation: "#daaa00", // defaults to themePrimary

    // Homepage Colours (homepage~)
    // Social Stream Colours (homepageSocialStream~)
    homepageSocialStream: "#fafafa",
}

export const customColours = darkMode ? coloursDark : coloursLight;