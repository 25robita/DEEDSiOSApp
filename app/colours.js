import { Appearance } from "react-native";
import { darkMode } from "./consts";

export const coloursLight = {
    // theme colours (theme~)
    themePrimary: "#041e42",
    themeSeconday: "#e5f4ff",
    themeTertiary: "#daaa00",
    themePositive: "#77ee77",
    themeNegative: "#ee6666",

    // other important colours
    background: "#ededed",
    link: "#0066b0",
    foreground: "#242424",
    foregroundContrast: "#fdfdfd", // has to be hex
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

    // Waiting Screen colours (waiting~)
    waitingActivityColor: "white"
}

export const coloursDark = {
    // theme colours (theme~)
    themePrimary: "#041e42",
    themeSeconday: "#232B37",
    themeTertiary: "#daaa00",
    themePositive: "#184322",
    themeNegative: "#421922",

    // other important colours
    background: "#101114",
    link: "#33a0f3",
    foreground: "#fdfdfd",
    foregroundContrast: "#242424", // has to be hex
    neutralHighContrast: "#bbb",
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
    blockquoteBackground: '#323235',
    blockquoteForeground: '#f6f6f6',
    blockquoteBorder: '#888',

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
    homepageSocialStream: "#2f2f34",

    // Waiting Screen colours (waiting~)
    waitingActivityColor: "white"
}

export function getColorHSL([r, g, b]) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

function hueToRGB([hue, saturation]) {
    let h = hue, s = saturation, l = .5;
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

export function turnLightnessToTransparency(color) {
    color = [...color.matchAll(/[1234567890abcdef]{2}/g)]
        .map(i =>
            parseInt(i[0], 16)
        )
    let [h, s, l] = getColorHSL(color)
    let alpha = Math.floor(200 * (1 - l)) / 100
    return `rgba(${hueToRGB([h, s, l]).map(i => Math.floor(i)).join(", ")}, ${alpha})`
}

export const customColours = darkMode ? coloursDark : coloursLight;


export function invertBrightness(color, darkOrLight = "light") { // if dark then make dark, if light then make light
    let doInvert = true;
    let red, green, blue;
    if (color.startsWith("#")
        && color.replace(darkOrLight == "light" ? /[#012]/g : /[#fe]/g, '').length >= (darkOrLight == "light" ? 0 : 3)) {
        let value = parseInt(color.replace("#", ''), 16);
        blue = value % 256;
        value = Math.floor(value / 256)
        green = value % 256
        value = Math.floor(value / 256)
        red = value % 256
    } else if (color.startsWith("rgb")) {
        [red, green, blue] = color.matchAll(/(\d+).*[,)]?/g).next().value.slice(1).map(i => parseInt(i))
        doInvert = darkOrLight == "light" ? (red + green + blue > 102) : (red + green + blue < 153)
    } else {
        doInvert = false;
    }
    if (doInvert) {
        let colorArray = [red, green, blue];
        let outputColor = [-1, -1, -1];

        let minIndex = colorArray.indexOf(Math.min(...colorArray));
        let maxIndex = colorArray.lastIndexOf(Math.max(...colorArray));
        let midIndex =
            (![minIndex, maxIndex].includes(0))
                ? 0
                : (
                    (![minIndex, maxIndex].includes(1))
                        ? 1
                        : 2
                );
        outputColor[minIndex] = 255 - Math.max(...colorArray);
        outputColor[maxIndex] = 255 - Math.min(...colorArray);

        outputColor[outputColor.indexOf(-1)] = 255 - colorArray[midIndex];

        console.log(color, outputColor)
        return "#" + outputColor.map(number => number.toString(16)).join("");
    }
    return color
}

export function getRoughColorLightness(hexColor) { // makes a lightness value on a scale of 0 to 1
    if (!hexColor) return getRoughColorLightness(customColours.contentBackground); // fallback just because
    return [
        ...hexColor.matchAll(/\d{2}/g)
    ]
        .reduce((h, j) => ((parseInt(h, 16) / 255) + j), 0) / 3
}

export function getColors() {
    return Appearance.getColorScheme() == "dark" ? coloursDark : coloursLight;
}

export const foregroundContrastBreakpoint = (getRoughColorLightness(customColours.foreground) + getRoughColorLightness(customColours.foregroundContrast)) / 2// on a scale from 0 to 1; used to choose which text colour to use in a calendar event above the event color