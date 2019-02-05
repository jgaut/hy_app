import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class TestPageScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      username: 'ok',
      code: '',
      err: '',
      data: ''
    }
  }

  componentWillMount(){
    const data = {"list":[{"type":"Text", "text":"mon texte"}, {"type":"TextInput", "text":"mon TextInput"}]};
    this.setState({ data });
  

  }

  Story(props) {
  // Correct! JSX type can be a capitalized variable.
  console.log(props);
  props.list.forEach(item => {
    console.log(item);
  })
  return <Text>{this.state.username}</Text>;
}




  render() {
    
    var mydata = this.Story(this.state.data);
    //console.log(mydata);

    return (
      <View>{mydata}</View>
    );
  
}
}

export default TestPageScreen;
