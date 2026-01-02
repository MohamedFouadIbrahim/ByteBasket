import { RootNavigator } from '@/navigation';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';


export default function App() {
  return (
    <NavigationContainer>
        <RootNavigator />
    </NavigationContainer>
  );
}