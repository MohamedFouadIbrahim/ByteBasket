import { RootNavigator } from '@/navigation';
import createStore from "@/redux/store";
import { linkingConfig } from '@/utils';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = createStore();

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer linking={linkingConfig} >
                <RootNavigator />
            </NavigationContainer>
        </PersistGate>
    </Provider>
  );
}