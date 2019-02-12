import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './views/Home';
import ProfileScreen from './views/Profile';
import TestPageScreen from './views/TestPage';

class AppAuth extends React.Component {

  constructor() {
    super();
  }

  componentWillMount(){
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
    <View style={{ height: 30}}>
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
  Home: HomeScreen,
  Profile: ProfileScreen,
  'Create Page': TestPageScreen
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


export default MyDrawer;
