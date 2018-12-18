import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './aws-exports';
import Auth from '@aws-amplify/auth';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);

  var t = require('tcomb-form-native');

  var Form = t.form.Form;

  // here we are: define your domain model
  var Person = t.struct({
        email: t.String              // a required string
  });

  var Password = t.struct({
        password: t.String              // a required string
  });

var options = {
  fields: {
    password: {
      secureTextEntry: true
    }
  }
};

var options = {}; // optional rendering options (see documentation)

export default class App extends React.Component {


  render() {
    return (
<View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <Form
          ref="form"
          type={Password}
          options={options}
        />

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
});
