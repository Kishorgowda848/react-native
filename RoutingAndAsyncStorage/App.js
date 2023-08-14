import React from "react";
import { Text } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import pages
import Home from "./pages/home";
import Add from "./pages/add";
import Edit from "./pages/edit";

const Stack= createStackNavigator();
const App = ()=>{
  return(
    <NavigationContainer>
             <Stack.Navigator initialRouteName="Home">
               <Stack.Screen
                name="Home"
                component={Home}
               >
               </Stack.Screen>
               <Stack.Screen
                name="Add"
                component={Add}
               >
               </Stack.Screen>
               <Stack.Screen
                name="Edit"
                component={Edit}
               >
               </Stack.Screen>
             </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;