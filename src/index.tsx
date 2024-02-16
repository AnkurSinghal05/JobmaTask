import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PersonalInfoScreen from './screens/PersonalInfoScreen/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Index = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PersonalInfo">
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});

{
  /* <StatusBar
        barStyle={'light-content'}
        backgroundColor={'red'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
      </ScrollView> */
}
