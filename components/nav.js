import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from '../screens/MainScreen.js';
import DetailScreen from '../screens/DetailScreen.js';

function DetailsScreen(props) {
  return (
    <DetailScreen coin={props.route.params.coin} />
  );
}

function HomeScreen({ navigation }) {
  
  return (
    <MainScreen navigation={navigation} />
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Coinler" component={HomeScreen}  />
      <HomeStack.Screen name="Details" component={DetailsScreen} options={({route}) => ({title: route.params.name, headerRight: route.params.hright})} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function MyNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Coinler') {
              iconName = focused
                ? 'logo-bitcoin'
                : 'logo-bitcoin';
            } else if (route.name === 'Hesaplama') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Coinler" component={HomeStackScreen} />
        <Tab.Screen name="Hesaplama" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
