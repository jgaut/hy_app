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
    
    var returnValue = [];;

    props.list.forEach(item => {
      console.log(item);
    
      if(item.type=='Text'){
        console.log(item.type);
          returnValue.push(<Text>okokokok !!!!!</Text>);
      }else if(item.type=='TextInput'){
        console.log(item.type);
          returnValue.push(<TextInput>okokokok !!!!!</TextInput>);
      }
    });
    return returnValue;
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
