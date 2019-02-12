import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class TestPageScreen extends React.Component {


  constructor() {
    super();
    this.state = {data: ''};
    
  }

  componentWillMount(){
    const data = {"list":[{"type":"TextInput", "text":"mon texte", "key":"234"}, {"type":"TextInput", "text":"mon TextInput", "key":"99870999"}]};
    this.setState({ data });
    const mydata = this.Story(this.state.data);

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
        //Fixer la clef
        let myKey = key;
          returnValue.push(<TextInput style={styles.label} key={key} onChangeText={(text) => {this.HandleChange(text, myKey); this.value=text;}} >{this.state.data.list[myKey].text}</TextInput>);
      }
      key++;
    });

    //Add sauvegarde
    returnValue.push(
      <TouchableOpacity key={Math.random()} onPress={() => addTextInput()}>
                      <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
            </TouchableOpacity>);

    //Add TextInput
    returnValue.push(
      <TouchableOpacity key={Math.random()} onPress={() => console.log('ok')}>
                      <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
            </TouchableOpacity>);
    return returnValue;
  }

  AddTextInput = () => {
    console.log('AddTextInput function !');
  }

  HandleChange = (e, f) => {
    console.log("e : " + e);
    console.log("f : " + JSON.stringify(f));
    //console.log(this.state);
    console.log("avant : " + this.state.data.list[JSON.stringify(f)].text);
    this.state.data.list[JSON.stringify(f)].text = e;
    console.log("après : " + this.state.data.list[JSON.stringify(f)].text);
    //this.setState({e: e});
  }

  render() {

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
