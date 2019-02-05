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

  Story() {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = 'Text';
  return <SpecificStory>{this.state.username}</SpecificStory>;
}




  render() {
    
    var mydata = this.Story();
    //console.log(mydata);

    return (
      <View>{mydata}</View>
    );
  
}
}

export default TestPageScreen;
