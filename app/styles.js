import { StyleSheet } from "react-native";
import { customColours } from "./colours";

export const styles = StyleSheet.create({
    contentHeading: {
        fontSize: 25,
        fontWeight: '500'
    },
    topBar: {
        backgroundColor: customColours.headerBackground || customColours.themePrimary,
    },
    topBarHeading: {
        color: customColours.headerForeground,
    },
    container: {
        height: "100%"
    },
    section: {
        marginBottom: 10,
    },
    sectionHeading: {
        marginBottom: 13
    },
    heading: {
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 7
    },
    meta: {
        fontStyle: "italic"
    },
    loader: {
        marginTop: 20,
        marginBottom: 20
    },
    failedLoad: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center"
    },
    icon: {
        fontFamily: "schoolbox",
        marginTop: 5,
        marginBottom: 4,
    },
    shadow: {
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .3,
        marginBottom: 17
    }
});

export const timetableStyles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row"
    },
    cell: {
        padding: "5%",
        width: "50%"
    },
    longCell: {
        width: "100%"
    },
    // nowCell: {
    // shadowRadius: 10,
    // shadowOpacity: 0.5
    // },
    // header: {
    //     backgroundColor: customColours.timetableContentBackground || customColours.contentBackground,
    // },
    subjectText: {
        textAlign: "right",
    },
    subjectName: {
        marginBottom: 7
    }
});

export const loginStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    halfContainer: {
        width: "90%%",
        alignSelf: "center",
        borderRadius: 10,
        padding: "10%",
        paddingBottom: 0,
        marginBottom: 100,
    },
    text: {
        textAlign: "center",
        // marginRight: 10
    },
    inputView: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        // backgroundColor: customColours.lightBlue,
        width: "100%",
        fontSize: 16,
        padding: 10,
        borderRadius: 3,
        fontWeight: "700",
    },
    usernameInput: {
        marginBottom: 14
    },
    loginHeader: {
        // marginBottom: 50,
        fontWeight: "800",
        fontSize: 17
    },
    error: {
        textAlign: "center",
        fontWeight: "700",
        // margin: 25
    },
    errorContainer: {
        padding: 20,
        overflow: "visible",
        marginBottom: 25,
        borderRadius: 10,
        borderWidth: 2,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: .7
    },
    buttonsContainer: {
        // flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%"
    },
    submitButton: {
        padding: 20,
        width: "100%",
        borderRadius: 5,
        margin: 7,
        marginRight: 0,
        alignSelf: "flex-end",
        // marginBottom: 10
    },
    submitText: {
        fontWeight: "800",
        alignSelf: "center"
    },
    iForgot: { // apple ceo now has dementia
        fontWeight: "700",
    },
    iForgotContainer: {
        // height: "90%",
        flex: 1,
        justifyContent: "space-evenly",
        flexDirection: "column",
        // top: -5,
        padding: 0
    }
})

export const newsStyles = StyleSheet.create({
    newsItem: {
        padding: 20,
        marginBottom: 20
    },
    newsTitle: {
        fontWeight: "600",
        fontSize: 16
    }
})

export const HTMLStyles = StyleSheet.create({
    strong: {
        fontWeight: '700'
    },
    em: {
        fontStyle: 'italic'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    strikethrough: {
        textDecorationLine: 'line-through'
    },
    blockquote: {
        fontStyle: 'italic',
    },
    h1: {
        fontSize: 20
    },
    h2: {
        fontSize: 18
    }
})

export const HTMLSubscriptSuperscriptFontSizeMultiplier = 1 / 1.5;