import { createNavigationContainerRef } from '@react-navigation/native';
import { Linking } from 'react-native';

export const MainNavigationReference = createNavigationContainerRef()

export function navigate(name, params) {
    if (MainNavigationReference.isReady()) {
        MainNavigationReference.navigate(name, params);
    }
}

export function dispatch(...args) {
    if (MainNavigationReference.isReady()) {
        MainNavigationReference.dispatch(...args);
    }
}

export function openURL(url) {
    if (!url.startsWith("/")) {
        Linking.openURL(url)
    }
    else {
        Linking.openURL("https://deeds.cgs.vic.edu.au" + url) // open deeds page
    }
}