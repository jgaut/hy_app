import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
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
      <MyTab/>
      </View>
    );
  }
}

const MyTabNavigator = createBottomTabNavigator({
  'Journal': ListPageScreen,
  'Create Page': CreatePageScreen,
   X: {
        screen: ListPageScreen,
        path: '/',
        navigationOptions: () => {
            tabBarIcon: ({ tintColor }) => {
                const iconName = 'X';
                return <Icon name='rowing' />;
            },
        },
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