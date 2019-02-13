import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import CreatePageScreen from './CreatePage';
import ListPageScreen from './ListPage';

class TabMenuScreen extends React.Component {

  constructor() {
    super();
  }

  componentWillMount(){
  }

  render() {
    return (
      <View>
      <Text>DrawerOpen</Text>
      </View>
    );
  }
}

const MyTabNavigator = createBottomTabNavigator({
  'Journal': ListPageScreen,
  'Create Page': CreatePageScreen
}, 
{
  navigationOptions: {
    headerMode: 'none'
  },
});

const MyTab = createAppContainer(MyTabNavigator);

export default MyTab;

//this.props.navigation.navigate('DrawerOpen');