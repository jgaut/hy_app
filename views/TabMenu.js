import React from 'react';
import { Platform } from "react-native";
import { View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import CreatePageScreen from './CreatePage';
import ListPageScreen from './ListPage';
import SvgUri from 'react-native-svg-uri';
import menu from './menu.svg';
import Image from 'react-native-remote-svg'

class TabMenuScreen extends React.Component {

  constructor() {
    super();
  }

  componentWillMount(){
  }

  render() {
    console.log(menu);
    console.log("okokokokok");
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
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Icon name={Platform.OS === "ios" ? "ios-grid" : "md-grid"} size={30} color="black"/>)
    }),
  },
  'Create Page':{
    screen: CreatePageScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Icon name={Platform.OS === "ios" ? "ios-add" : "md-add"} size={30} color="black"/>)
    }),
  },
  'Menu': {
    screen: () => {},
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Image source={require('./menu.svg')} />), 
      tabBarOnPress: (...props) => {props[0].navigation.openDrawer();},
    }),
  },
  //'Open': {{console.log('open')}}
}, 
{
  navigationOptions: {
    headerMode: 'none'
  },
});

const MyTab = createAppContainer(MyTabNavigator);

export default MyTab;

//this.props.navigation.navigate('DrawerOpen');