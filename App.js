import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './aws-exports';
import Auth from '@aws-amplify/auth';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);

export default class App extends React.Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
<View style={styles.form}>
  <Text style={styles.label} h2>Email</Text>
  <TextInput 
    placeholder="Email" 
    secureTextEntry={false} 
    style={styles.input} 
    value={this.state.email}
    onChangeText={email => this.setState({ email })}
    mode="outlined"/>

  <Text style={styles.label} h2>Password</Text>
  <TextInput 
    placeholder="Password" 
    secureTextEntry={true} 
    style={styles.input} 
    value={this.state.password}
    onChangeText={password => this.setState({ password })}
    mode="outlined"/>

   <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign in / Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function _onPressButton(){
	alert("ok");
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
    height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' 
  },
  label: {
    
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
