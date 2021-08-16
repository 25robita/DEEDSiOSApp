export const barcodeExplanation = `
<b>Barcode</b>
<p>This barcode can be used to sign in at Student Services as well as the Middle School Office. It can also allow you to borrow books at the library. It is identical to the one on your Student ID.
</p>
`

const authoredLabel = "By"; // used to indicate content author
const accept = "Yes";
const decline = "No";

export const maxNavigationTitleLength = 27; // cuts off title at length
export function sliceNavigationTitle(string, maxLength = maxNavigationTitleLength) {
    return string.length > maxLength
        ? string.slice(0, maxLength - 3) + '...'
        : string
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

// Homepage (homepage~Label)
// News Row (homepageNews~Label)
export const homepageNewsFailTextLabel = "No news could be found at the moment"
export const homepageNewsTitle = "news" // auto capitalizes

// Timetable Row (homepageTimetable~Label)
export const homepageTimetableFailTextLabel = "Unable to load the timetable at the moment";
export const homepageTimetableTitle = "timetable" // auto capitalizes

// Due Work Row (homepageDueWork~Label)
export const homepageDueWorkFailTextLabel = "Due work coming soon";
export const homepageDueWorkTitle = "due work" // auto capitalizes