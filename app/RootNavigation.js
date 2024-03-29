import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { Linking } from 'react-native';
import { serviceURL } from './consts';

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

export function openURL(url, parse = true) {
    if (!parse) {
        if (!url.startsWith("https")) {
            url = serviceURL + url
        }
        Linking.openURL(url)
    }
    else if (/^(\w+):/g.test(url) && !url.startsWith("http")) { // only catches weird urls
        Linking.openURL(url)
    }
    else if (url.startsWith("/") || url.startsWith(serviceURL)) {
        url = url.replace(serviceURL, '')
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
            Linking.openURL(serviceURL + url) // open deeds page
        }
    }
    else {
        if (url.startsWith('http')) { // catches both http and https dont be fooled
            Linking.openURL(url)
            return
        }
        Linking.openURL(serviceURL + url)
    }

}