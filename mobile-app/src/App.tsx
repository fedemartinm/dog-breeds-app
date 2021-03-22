import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { WishListScreen } from './screens/WishListScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const App = () => (
    <Provider store={store}>
        <SafeAreaProvider>
            <WishListScreen />
        </SafeAreaProvider>
    </Provider>
);
