import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import ChatRoom from '../pages/ChatRoom';

const AppStack = createNativeStackNavigator();

function AppRoutes(){
    return(
        <AppStack.Navigator initialRouteName='ChatRoom' >
            <AppStack.Screen
                name='ChatRoom'
                component={ChatRoom}
                options={{
                    headerShown: false
                }}
            />

            <AppStack.Screen
                name='SignIn'
                component={SignIn}
                options={{
                    title: 'Faça o login'
                }}
            />
        </AppStack.Navigator>
    )
}

export default AppRoutes;