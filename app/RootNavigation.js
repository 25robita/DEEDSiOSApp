import { createNavigationContainerRef } from '@react-navigation/native';

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