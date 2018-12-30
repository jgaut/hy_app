import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class SignInScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
    email: '',
    password: '',
    err: '',
    ErrColor: '#ffffff'
      };
  }

  render() {
    
    const {navigate} = this.props.navigation;

    return (
       <View style={styles.form}>

        <Text style={{color: this.state.ErrColor}} h2>{this.state.err}</Text>
        
        <Text style={styles.label} h2>{this.state.email==''?' ':"Email"}</Text>
        
        <TextInput 
          placeholder="Email" 
          secureTextEntry={false} 
          style={styles.input} 
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          mode="outlined"/>

        <Text style={styles.label} h2>{this.state.password==''?' ':"Password"}</Text>
        
        <TextInput 
          placeholder="Password" 
          secureTextEntry={true} 
          style={styles.input} 
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          mode="outlined"/>

        <TouchableOpacity onPress={() => {

            const username = this.state.email;
            const password = this.state.password;

            Auth.signUp(
              this.state.email,
              this.state.password)
              .then((data) => {
                console.log(data);
                navigate('SignUpConfirm', {username: data.user.username});
              })
              .catch((err) => {
                console.log(err);
                this.setState({ err: err.message || err || ''});
                if(err && err.code && typeof err.code != 'undefined' && err.code == 'UsernameExistsException'){

                  // For advanced usage
                  // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
                  Auth.signIn({
                      username, // Required, the username
                      password, // Optional, the password
                  }).then((user) => {
                    console.log(user);
                    navigate('App', {number: Math.random()});
                    }
                  )
                  .catch((err) => {
                    console.log(err);
                    this.setState({ err: err.message || err || ''});
                    if(err && err.code && typeof err.code != 'undefined' && err.code == 'UserNotConfirmedException'){
                      navigate('SignUpConfirm', {username: this.state.email});
                    }
                    }
                  );
                }
              }
              );
              this.setState({errColor: '#000000'});   
        }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign in / Sign Up</Text>
            </View>
          </TouchableOpacity>
      
      </View>
    );
  };

}

const styles = StyleSheet.create({
  form: {
    padding: 60,
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {
    height: 26, 
    fontSize: 20, 
    color: '#000000', 
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  label: {
    paddingTop: 30,
    color: '#000000'
  },
  button: {    
    paddingTop: 20,
    backgroundColor: '#2196F3',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white'
  }
});

export default SignInScreen;
