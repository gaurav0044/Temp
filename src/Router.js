import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator ,TransitionPresets} from '@react-navigation/stack';
const { height, width } = Dimensions.get('window');

const AppStack = createStackNavigator();
// This file is for setting up the app routes 

import Splash from './Splash'
import AddEmployee from './AddEmployee'
import Home from './Home'
function Router() {
    return (
      <NavigationContainer>
            <AppStack.Navigator 
                initialRouteName='Splash'
                screenOptions={{ 
                  headerShown: false ,
                  gestureEnabled:false,
                  gestureDirection:'horizontal',
                  ...TransitionPresets.SlideFromRightIOS
                }}
                headerMode='screen'>
                    <AppStack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <AppStack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
                    <AppStack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }}  />
            </AppStack.Navigator>
      </NavigationContainer>
    );
}
export default Router;