import React from 'react';
import { Platform, StyleSheet, View, Image, Text } from "react-native";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import CreatePageScreen from './CreatePage';
import ListPageScreen from './ListPage';
import ChatBotScreen from './ChatBot';
import NotifScreen from './Notif';

class TabMenuScreen extends React.Component {

  constructor() {
    super();
  }

  componentWillMount(){
  }

  render() {
    return (
      <View>
        <MyTab/>
      </View>
    );
  }
}

const MyTabNavigator = createBottomTabNavigator({
  'Journal': {
    screen: ListPageScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {"Journal"},
      tabBarIcon: ({ tintColor }) => (<Text>Journal</Text>)
    }),
  },
  'Notif': {
    screen: NotifScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {"Notif"},
      tabBarIcon: ({ tintColor }) => (<Text>Notif</Text>)
    }),
  },
  'Create Page':{
    screen: CreatePageScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {"New page"},
      tabBarIcon: ({ tintColor }) => (<Text>Create Page</Text>)
    }),
  },
  'ChatBot':{
    screen: ChatBotScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Text>ChatBot</Text>)
    }),
  },
  'Menu': {
    screen: () => {},
    navigationOptions: () => ({
      tabBarLabel: () => {"Menu"},
      tabBarIcon: ({}) => (<Text>Menu</Text>), 
      tabBarOnPress: (...props) => {props[0].navigation.openDrawer();},
    }),
  },
  //'Open': {{console.log('open')}}
}, 
{
  navigationOptions: {
    headerMode: 'none'
  },
  tabBarOptions: {
      inactiveBackgroundColor: 'white',
      style: {
        height:50,
        padding:0,
        margin:0,
        border:0,

      },
      tabStyle: {
        padding:0,
        margin:0,

      },
      labelStyle: {
        padding:0,
        margin:0,
      },
    },
});

const styles = StyleSheet.create({
  barbouton: {
    height: 40,
    width: 40, 
    padding: 0,
    margin:0,
  },
});

const MyTab = createAppContainer(MyTabNavigator);

export default MyTab;

//this.props.navigation.navigate('DrawerOpen');