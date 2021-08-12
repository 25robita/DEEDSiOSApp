import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { Linking } from 'react-native';

export const MainNavigationReference = createNavigationContainerRef()

export function navigate(name, params) {
    if (MainNavigationReference.isReady()) {
        MainNavigationReference.navigate(name, params);
    }
}

export function push(name, params) {
    if (MainNavigationReference.isReady()) {
        MainNavigationReference.dispatch(StackActions.push(name, params));
    }
}

export function dispatch(...args) {
    if (MainNavigationReference.isReady()) {
        MainNavigationReference.dispatch(...args);
    }
}

export function getCurrentRoute() {
    if (MainNavigationReference.isReady()) {
        return MainNavigationReference.getCurrentRoute();
    }
}

export function openURL(url) {
    if (url.startsWith("/") || url.startsWith("https://deeds.cgs.vic.edu.au")) {
        url = url.replace("https://deeds.cgs.vic.edu.au", '')
        if (url.startsWith("/search/user/")) {
            push("User", { id: url.match(/\d+/g)[0] });
            return;
        }
        else if (url.startsWith("/news/")) {
            push("News", { id: url.match(/\d+/g) })
        }
        else if (/\/homepage\/\d+/g.test(url)) {
            push("Homepage", { id: url.match(/\d+/g) })
        }
        else if (url.startsWith("/homepage/code/")) {
            push("Homepage", { code: url.split("/")[3] })
        }
        else {

            Linking.openURL("https://deeds.cgs.vic.edu.au" + url) // open deeds page
        }
    }
    else {
        Linking.openURL(url)
        return
    }

}