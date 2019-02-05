import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      code: '',
      err: '',
      data: ''
    }
  }

  componentWillMount(){
    var data = {
      items: [{
          itemClass: 'Item',
          id: 1,
          contentsHTML: Math.random(),
          text: 'Item 1'
      }, {
          itemClass: 'Item',
          id: 2,
          contentsHTML: Math.random(),
          text: 'Item 2'
      }, {
          itemClass: 'Item',
          id: 3,
          contentsHTML: Math.random(),
          text: 'Item 3'
      }, {
          itemClass: 'Item',
          id: 4,
          contentsHTML: Math.random(),
          text: 'Item 4'
      }, {
          itemClass: 'Item',
          id: 5,
          contentsHTML: Math.random(),
          text: 'Item 5'
      }]
    };

    this.setState({ data })};
  }



  render() {
    const {navigate} = this.props.navigation;
    var test=<Text style='color:black'>blabla</Text>

    var items = this.state.data["items"].map(function(itemData) {
                    var component = Components[itemData['itemClass']];
                    return React.createElement(component, {
                        data: itemData,
                        key: itemData['id']
                    });
                });
                console.log(items);
    
    return (
      <View>
          {items}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  form: {
    padding: 60, 
    backgroundColor: '#f5fcff',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {
    height: 26, 
    fontSize: 20, 
    color: '#000', 
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  label: {
    paddingTop: 30,

    color: 'black'
  },
  button: {    
    padding: 20,
    backgroundColor: '#2196F3',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white'
  }
});

export default ProfileScreen;
