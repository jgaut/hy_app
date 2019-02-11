import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class TestPageScreen extends React.Component {


  constructor() {
    super();
    this.state = {data: ''};
  }

  componentWillMount(){
    const data = {"list":[{"type":"TextInput", "text":"mon texte"}, {"type":"TextInput", "text":"mon TextInput"}]};
    this.setState({ data });
  

  }

  Story(props) {
    // Correct! JSX type can be a capitalized variable.
    //console.log(this.state);
    
    var returnValue = [];;
    var key=0;
    props.list.forEach(item => {
      //console.log(item);
      //console.log(key);
      //console.log(this.state.data.list[key].text);
    
      if(item.type=='TextInput'){
        //console.log(item.type);
          returnValue.push(<TextInput style={styles.label} key={key} onChangeText={this.handleChange}>{this.state.data.list[key].text}</TextInput>);
      }else if(item.type=='TextInput'){
        console.log(item.type);
          returnValue.push(<TextInput style={styles.input} key={key}>okokokok !!!!!</TextInput>);
      }
      key++;
    });
    return returnValue;
  }


  handleChange = (e) =>{
    console.log("e : " + e);
    //this.setState({e: e});
  }

  render() {
    
    var mydata = this.Story(this.state.data);
    //console.log(mydata);

    return (
      <View style={styles.form}>{mydata}</View>
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
    marginTop:10,
    paddingTop:40,
    backgroundColor: '#2196F3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
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
});

export default TestPageScreen;
