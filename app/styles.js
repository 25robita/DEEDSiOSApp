import { customColours } from "./colours";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    topBar: {
        backgroundColor: customColours.darkBlue,
    },
    topBarHeading: {
        color: "white",
    },
    container: {
        backgroundColor: customColours.backgroundColor,
        height: "100%"
    },
    section: {
        marginBottom: 10
    },
    sectionHeading: {
        marginBottom: 13
    },
    heading: {
        color: customColours.grey,
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 7
    },
    meta: {
        color: customColours.grey,
        fontStyle: "italic"
    },
    text: {
        color: customColours.foreground
    },
    link: {
        color: customColours.harshBlue,
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
        color: customColours.grey
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
    nowCell: {
        // shadowRadius: 10,
        // shadowOpacity: 0.5
    },
    nowCellHeader: {
        backgroundColor: customColours.lightBlue,
    },
    header: {
        backgroundColor: "#fff"
    },
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
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: "10%",
        paddingBottom: 0,
        marginBottom: 100,
    },
    text: {
        textAlign: "center",
        color: "#5b5b5b"
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
        backgroundColor: "#e0e0e0",
        borderRadius: 3,
        fontWeight: "700"
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
        color: "red",
        textAlign: "center",
        fontWeight: "700",
        // margin: 25
    },
    errorContainer: {
        padding: 20,
        overflow: "visible",
        backgroundColor: "#ffaaaa",
        marginBottom: 25,
        borderRadius: 10,
        borderWidth: 2,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "red",
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
        backgroundColor: "#5598fe",
        width: "100%",
        borderRadius: 5,
        margin: 7,
        marginRight: 0,
        alignSelf: "flex-end",
        // marginBottom: 10
    },
    submitText: {
        fontWeight: "800",
        color: "white",
        alignSelf: "center"
    },
    iForgot: {
        color: "#5598fe",
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
        backgroundColor: customColours.contentBackground,
        padding: 20,
        marginBottom: 20
    },
    newsTitle: {
        fontWeight: "600",
        color: customColours.harshBlue,
        fontSize: 16
    }
})

