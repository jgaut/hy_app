import React from 'react';
import { Platform, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import CreatePageScreen from './CreatePage';
import ListPageScreen from './ListPage';
import Image from 'react-native-remote-svg'

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
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Image source={require('../images/notif.svg')} style={styles.barbouton} />)
    }),
  },
  'Notif': {
    screen: ListPageScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Image source={require('../images/notif.svg')} style={styles.barbouton} />)
    }),
  },
  'Create Page':{
    screen: CreatePageScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Image source={require('../images/newpage.svg')} style={styles.barbouton2}/>)
    }),
  },
  'ChatBot':{
    screen: CreatePageScreen,
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({ tintColor }) => (<Image source={require('../images/newpage.svg')} style={styles.barbouton}/>)
    }),
  },
  'Menu': {
    screen: () => {},
    navigationOptions: () => ({
      tabBarLabel: () => {},
      tabBarIcon: ({}) => (<Image source={require('../images/menu.svg')} style={styles.barbouton} />), 
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
        height:60,
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
  barbouton2: {
    height: 50,
    width: 50, 
    padding: 0,
    margin:0,
    marginTop: 0,
  }
});

const MyTab = createAppContainer(MyTabNavigator);

export default MyTab;

//this.props.navigation.navigate('DrawerOpen');