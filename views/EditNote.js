import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';

class EditNote extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      text: 0,
    };
  }

  render() {
    
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          >{this.state.text}</TextInput>
          <View style={styles.submitButton}>
          
          <TouchableOpacity key={Math.random()} onPress={() => {navigate('Create Page', {'type':'note', 'text':this.state.text});}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={Math.random()} onPress={() => {navigate('Create Page')}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingTop: Constants.statusBarHeight,
  },
  nothing: {

  },
  MovingBlock: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
  },
  note: {
    padding:5,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
  },
  text: {
    padding:5,
    height: 150,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editMode: {
    position: 'absolute',
    flex: 1,
  },
});

export default EditNote;
