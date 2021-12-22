import { PixelRatio } from "react-native";

export const barcodeExplanation = `
<b>Barcode</b>
<p>This barcode can be used to sign in at Student Services as well as the Middle School Office. It can also allow you to borrow books at the library. It is identical to the one on your Student ID.
</p>
`

const authoredLabel = "By"; // used to indicate content author
const accept = "Yes";
const decline = "No";

// export const maxNavigationTitleLength.maxNavigationTitleLength = 27; // cuts off title at length

export const maxNavigationTitleLength = {
    get maxNavigationTitleLength() {
        // console.log(PixelRatio.getFontScale());
        // console.log("test test test test")
        let l = Math.floor(PixelRatio.getFontScale() * -19.6 + 47.4);
        console.log(l)
        console.log(PixelRatio.get())

        return l
        // return 31 // 31 at 0.823, 27 at 1, 21 at 1.353
    }
}

export function sliceNavigationTitle(string, maxLength) {
    // console.log('PENIS123')
    maxLength = maxLength ?? maxNavigationTitleLength.maxNavigationTitleLength;
    return string.length > (maxLength)
        ? string.slice(0, (maxLength) - 3) + '...'
        : string
}

export const genericEmptyMessages = [ // there's some joke to be made here about missing assignments
    "Nothing to see here!",
    "This is empty, maybe you've gone down the wrong rabbithole?", // this one sounds terrible
    "Sorry, nothing could be found at this time",
    "Oops! No data found. Perhaps try again later?",
    "Seems a bit empty; I hope it's not a bug...",
    "We've searched the archives; nothing could be found",
    "This is about as empty as my head",
    "There are as many results as stars in the sky! In the daytime...",
    "Maybe try looking next period, I can't see anything here right now."
];

export const genericEmptyMessagesTier2 = [
    "Still nothing here!",
    "Definitely nothing!",
    "Really is empty",
    "Did you think I was lying to you?",
    "You don't have to keep asking",
    "It's empty, I promise"
]

export const genericEmptyMessagesTier3 = [
    "This is pointless",
    "You can stop now",
    "Really? There's nothing here.",
    "I don't think this is productive.",
    "Go do you homework or something, there's nothing here.",
    "Empty as a birds bones!",
]

export const emptyMessageTiers = [
    genericEmptyMessages,
    genericEmptyMessagesTier2,
    genericEmptyMessagesTier3
]

export const generateGenericEmptyMessage = (tier) => {
    console.log(tier)
    let messages = emptyMessageTiers[Math.min(emptyMessageTiers.length - 1, tier)]
    return messages[Math.floor(Math.random() * messages.length)]
}


// Login Page (login~Label)
export const loginSubmitLabel = "Sign In"
export const loginForgottenPasswordLabel = "I forgot my password"
export const loginForgottenUsernameLabel = "I forgot my username"

export const loginPromptLabel = "Please enter your username and password";
export const loginUsernamePlaceholderLabel = "Username"
export const loginPasswordPlaceholderLabel = "Password"

export const loginCredentialsErrorLabel = "Incorrect username or password";
export const loginUnknownErrorLabel = "Unknown error encountered"

// News Item (newsItem~Label)
export const newsItemAuthorLabel = authoredLabel; // used by code, can be changed to differ from default
export const newsItemNavigationTitlePrepend = "Article";

// Timetable (timetable~)
export const timetableNavigationTitle = "Timetable"
export const timetableEmptyMessage = "No timetable could be found"
export const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

// Calendar Events (event~Label)
export const eventNavigationTitle = "Event";

export const eventFailTextLabel = "Failed to load event"

export const eventAuthorLabel = authoredLabel;
export const eventDateAndTimeLabel = "DATE AND TIME"; // wont automatically capitalise
export const eventLocationLabel = "LOCATION";

export const eventAttendancePromptLabel = "Attending?"
export const eventAttendAcceptLabel = accept;
export const eventAttendDeclineLabel = decline;

export const eventNumberAcceptedLabel = "accepted";
export const eventNumberDeclinedLabel = "declined";
export const eventNumberPendingLabel = "pending";

// User profiles (profile~)
export const profileNavigationTitleInitial = "User Profile"
export const profileNavigationTitlePrepend = "Profile"

// Links Screen (links~Label)
export const linksFailTextLabel = "Unable to load your links"

// Subjects Screen (subjects~Label)
export const subjectsFailTextLabel = "Unable to load your classes"

// Groups Screen (groups~Label)
export const groupsFailTextLabel = "Unable to load your groupd"

// Social Stream (socialStream~Label)
export const socialStreamPostLabel = "Share Something";
export const socialStreamPostSubmitLabel = "Post";
export const socialStreamUrlLabel = "http://";
export const socialStreamFailTextLabel = "Nothing here yet! Make a post"
export const socialStreamLoadMoreLabel = "LOAD MORE" // will not auto capitalize
export const socialStreamLoadAllLabel = "LOAD ALL" // will not auto capitalize

// Homepage (homepage~Label)
export const homepageFailTextLabel = ""; // empty
// News Row (homepageNews~Label)
export const homepageNewsFailTextLabel = "No news could be found at the moment"
export const homepageNewsTitle = "news" // auto capitalizes

// Timetable Row (homepageTimetable~Label)
export const homepageTimetableFailTextLabel = "Unable to load the timetable at the moment";
export const homepageTimetableTitle = "timetable" // auto capitalizes

// Due Work Row (homepageDueWork~Label)
export const homepageDueWorkFailTextLabel = "Due work coming soon";
export const homepageDueWorkTitle = "due work" // auto capitalizes