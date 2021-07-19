import { StyleSheet } from "react-native";

const customColours = {
    backgroundColor: "#ededed",
    darkBlue: "#041e42",
    harshBlue: "#0066b0",
    grey: "#9a9a9a",
    foreground: "#242424",
    lightBlue: "#e5f4ff",
    highlightGold: "#daaa00"
}

const dummyUserDetails = { // definitely not my username and password
    username: "25robita",
    password: "Mone[4.C]tisingFLI{7\\5}TCHVaccin(6^E)ator<6*1>"
}

const styles = StyleSheet.create({
    topBar: {
        height: "13%",
        width: "100%",
        backgroundColor: customColours.darkBlue,
        zIndex: 1000
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

const timetableStyles = StyleSheet.create({
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

const loginStyles = StyleSheet.create({
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

const newsStyles = StyleSheet.create({
    newsItem: {
        backgroundColor: "white",
        padding: 20,
        marginBottom: 20
    },
    newsTitle: {
        fontWeight: "600",
        color: customColours.harshBlue,
        fontSize: 16
    }
})

const icons = {
    "add": "",
    "masonry": "",
    "plus": "",
    "alert": "",
    "anchor": "",
    "approve": "",
    "tick": "",
    "archive": "",
    "attach": "",
    "audio": "",
    "masonry-Component_Homepage_AudioController": "",
    "badge": "",
    "breadcrumbs": "",
    "masonry-Component_Homepage_BreadcrumbController": "",
    "calendar": "",
    "masonry-Schoolbox_Calendar_Component_Dashboard_Controller": "",
    "masonry-Schoolbox_Calendar_Component_Homepage_Controller": "",
    "camera": "",
    "chat": "",
    "masonry-Component_Dashboard_GreetingController": "",
    "masonry-Component_Homepage_ChatController": "",
    "close": "",
    "cancel": "",
    "x": "",
    "collapse": "",
    "minus": "",
    "comment": "",
    "masonry-Schoolbox_Blog_Homepage_Component_Controller": "",
    "blog": "",
    "masonry-Schoolbox_Blog_Eportfolio_Component_Controller": "",
    "components": "",
    "copy": "",
    "countdown": "",
    "masonry-Component_Homepage_CountdownController": "",
    "course": "",
    "criteria": "",
    "masonry-Component_Homepage_RubricController": "",
    "curriculum": "",
    "masonry-Schoolbox_Curriculum_Component_CurriculumOverviewController": "",
    "danger": "",
    "delete": "",
    "bin": "",
    "directory": "",
    "division": "",
    "document": "",
    "dollar": "",
    "download": "",
    "dropdown": "",
    "sort-down": "",
    "submissions": "",
    "import": "",
    "email": "",
    "mail": "",
    "eportfolio": "",
    "equals": "",
    "export": "",
    "favourite": "",
    "masonry-Schoolbox_Learning_Moment_StudentToolkit_Component_Dashboard_Controller": "",
    "star": "",
    "files": "",
    "masonry-Component_Eportfolio_FileListController": "",
    "masonry-Component_Homepage_FileListController": "",
    "filter": "",
    "folder": "",
    "masonry-Component_Homepage_FolderListController": "",
    "masonry-Component_Homepage_ManageFolderController": "",
    "forms": "",
    "forum": "",
    "masonry-Component_Homepage_ForumListController": "",
    "geosnapshot": "",
    "masonry-Schoolbox_Geosnapshot_Component_Homepage_Controller": "",
    "masonry-Schoolbox_Geosnapshot_Component_Dashboard_Controller": "",
    "goal": "",
    "grip": "",
    "players": "",
    "group": "",
    "masonry-Schoolbox_Resource_Folder_Component_Dashboard_GroupController": "",
    "masonry-Component_Dashboard_ChildSubjectController": "",
    "masonry-Component_Homepage_MembersController": "",
    "team": "",
    "help": "",
    "questionmark": "",
    "history": "",
    "home": "",
    "house": "",
    "homepagefeed": "",
    "masonry-Component_Homepage_FeedController": "",
    "image": "",
    "masonry-Component_Eportfolio_ImageController": "",
    "masonry-Component_Homepage_ImageController": "",
    "play": "",
    "info": "",
    "masonry-Component_Dashboard_ActivityController": "",
    "link": "",
    "masonry-Component_Eportfolio_LinkListController": "",
    "masonry-Component_Homepage_LinkListController": "",
    "itineraryitem": "",
    "list": "",
    "masonry-Component_Eportfolio_BasicListController": "",
    "location": "",
    "venue": "",
    "locked": "",
    "padlock": "",
    "logout": "",
    "lti": "",
    "masonry-Schoolbox_LTI_Component_Homepage_Controller": "",
    "match": "",
    "menu": "",
    "hamburger": "",
    "mic": "",
    "mobile": "",
    "modify": "",
    "pen": "",
    "more": "",
    "overflow": "",
    "mute": "",
    "network": "",
    "news": "",
    "masonry-Component_Dashboard_NewsController": "",
    "masonry-Schoolbox_Comms_News_Component_Dashboard_Controller": "",
    "masonry-Schoolbox_Comms_News_Component_Homepage_Controller": "",
    "next": "",
    "goto": "",
    "notifications": "",
    "bell": "",
    "open": "",
    "pause": "",
    "phone": "",
    "pin": "",
    "pinterest": "",
    "masonry-Component_Homepage_PinterestController": "",
    "podcast": "",
    "masonry-Component_Homepage_PodcastController": "",
    "poll": "",
    "masonry-Component_Homepage_PollController": "",
    "position": "",
    "previous": "",
    "print": "",
    "project": "",
    "result": "",
    "progress": "",
    "report": "",
    "masonry-Component_Dashboard_HomepageNewsController": "",
    "quiz": "",
    "masonry-Schoolbox_Learning_Assessment_Quiz_Component_Homepage_Controller": "",
    "refresh": "",
    "reply": "",
    "rss": "",
    "masonry-Component_Dashboard_RssController": "",
    "masonry-Component_Homepage_RSSController": "",
    "icons": "",
    "schoolbox": "",
    "search": "",
    "settings": "",
    "cog": "",
    "share": "",
    "achievement": "",
    "showcase": "",
    "trophy": "",
    "shuffle": "",
    "sport": "",
    "masonry-Schoolbox_Fixtures_Component_Homepage_Controller": "",
    "masonry-Schoolbox_Fixtures_Component_Dashboard_Controller": "",
    "ball": "",
    "staff": "",
    "users": "",
    "pastoral": "",
    "player": "",
    "staff-students": "",
    "user": "",
    "surveys": "",
    "masonry-Component_Homepage_SurveyController": "",
    "synergetic": "",
    "task": "",
    "masonry-Schoolbox_Learning_Assessment_Task_Component_Homepage_Controller": "",
    "teacher": "",
    "masonry-Schoolbox_Learning_Component_Dashboard_ClassController": "",
    "masonry-Component_Homepage_TeachersController": "",
    "graduate": "",
    "textbox": "",
    "masonry-Component_Dashboard_TextboxController": "",
    "masonry-Component_Eportfolio_TextboxController": "",
    "masonry-Schoolbox_Resource_Textbox_Component_Homepage_Controller": "",
    "tiles": "",
    "masonry-Schoolbox_Tile_Component_DashboardTileController": "",
    "masonry-Schoolbox_Tile_Component_HomepageTileController": "",
    "timetable": "",
    "masonry-Component_Dashboard_TimetableController": "",
    "clock": "",
    "hourglass": "",
    "twitter": "",
    "masonry-Schoolbox_Twitter_Component_Dashboard_Controller": "",
    "masonry-Schoolbox_Twitter_Component_Homepage_Controller": "",
    "undo": "",
    "unlocked": "",
    "unit": "",
    "sortable": "",
    "upload": "",
    "video": "",
    "masonry-Component_Dashboard_VideoController": "",
    "masonry-Component_Eportfolio_VideoController": "",
    "masonry-Component_Homepage_VideoController": "",
    "view": "",
    "eye": "",
    "weather": "",
    "masonry-Schoolbox_Weather_Component_Dashboard_Controller": "",
    "mostly-cloudy": "",
    "thunder": "",
    "storm": "",
    "rain": "",
    "cloud": "",
    "cloudy": "",
    "clear": "",
    "sunny": "",
    "wiki": "",
    "masonry-Component_Homepage_WikiController": ""
}

export { icons, newsStyles, customColours, dummyUserDetails, styles, timetableStyles, loginStyles }