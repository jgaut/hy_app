import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Icon } from 'react-native';
import { createDrawerNavigator, DrawerItems, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './views/Home';
import ProfileScreen from './views/Profile';
import CreatePageScreen from './views/CreatePage';
import ListPageScreen from './views/ListPage';

class AppAuth extends React.Component {

  constructor() {
    super();
  }

  componentWillMount(){
  }

  renderTab = () => {
    return <View />
  }
  
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <MyDrawer/>
      </View>
    );
  }
}

const CustomdrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 10}}>
      <Text></Text>
    </View>
    <View>
      <Text>My Logo is here !</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
  );


const MyDrawerNavigator = createDrawerNavigator({
  'Home': HomeScreen,
  'Profile': ProfileScreen,
  'Journal': ListPageScreen,
  'Create Page': CreatePageScreen
},
{
  contentComponent: CustomdrawerComponent
}, 
{
  navigationOptions: {
    headerMode: 'none'
  },
});

const MyTabNavigator = createBottomTabNavigator({
  'Home': HomeScreen,
  'Profile': ProfileScreen,
  'Journal': ListPageScreen,
  'Create Page': CreatePageScreen
},
{
  contentComponent: CustomdrawerComponent
}, 
{
  navigationOptions: {
    headerMode: 'none'
  },
});

const MyDrawer = createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
  form: {
    padding: 80, 
    backgroundColor: '#f5fcff',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    color: '#000000'
  },
button: {
  padding:5,
  margin:5,
  height: 40,
  backgroundColor: '#2196F3',
      alignItems: 'stretch',
  justifyContent: 'center',
    },
  buttonText: {
    color: 'white'
  },
container: {
    backgroundColor: '#f5fcff',
    flex: 1,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default MyDrawer;
