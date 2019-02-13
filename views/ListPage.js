import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

class ListPageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {data: {"list":[]}};
    //this.launch();

    this.props.navigation.addListener('didFocus', () => {
     //console.log('focus');
     this.ListAllElement();
     this.forceUpdate();
    });
  }

  Story(props) {
    
    var returnValue = [];
    var key=0;
    if(props.list){
    props.list.forEach(item => {
      let myKey = item.id;
      returnValue.push(
        <TouchableOpacity key={Math.random()} onPress={() => console.log(myKey)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{myKey}</Text>
            </View>
          </TouchableOpacity>
      key++;
    });
  }
    return returnValue;
  }

  ListAllElement = () => {
    Storage.list('', {level: 'private'})
      .then(result => {
        result.forEach(item => {
          this.state.data.list.push(item);
          console.log(item);});
      })
      .catch(err => console.log(err));
  }

  render() {
    
      let tt = this.Story(this.state.data);
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          {tt}
        </View>
      </View>
    );
  
}
}

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

export default ListPageScreen;
