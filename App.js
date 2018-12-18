import React from 'react';
import { StyleSheet, Input, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './aws-exports';
import Auth from '@aws-amplify/auth';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);

export default class App extends React.Component {


  render() {
    return (
<View style={styles.container}>
  <Input label="Password" secureTextEntry={true} style={styles.fieldsForm}/>

      </View>
    );
  }
}

function test(){
	alert("ok");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldsForm: {
    backgroundColor: '#fff',
    },
});
