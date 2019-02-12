import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

class CreatePageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {data:'', isSav:true};
    this.launch();

    this.props.navigation.addListener('didFocus', () => {
     this.launch();
    });
  }

  launch = () => {
    if(this.state.isSav){
      const uuidv4 = require('uuid/v4');
      let myTmp = {"id":uuidv4(),"list":[]};
      this.state.data = myTmp;
      //console.log(JSON.stringify(this.state.data));
      this.forceUpdate();
    }
  }

  componentWillMount(){
    //const data = {"list":[{"type":"TextInput", "text":"mon texte", "sort":"0"}, {"type":"TextInput", "text":"mon TextInput", "sort":"1"}]};
    //this.setState({ data });
    console.log('mount');
  }

  Story(props) {
    
    var returnValue = [];
    var key=0;
    if(props.list){
    props.list.forEach(item => {
    
      if(item.type=='TextInput'){
        //console.log(item.type);
        //Fixer la clef
        let myKey = key;
        returnValue.push(<TextInput style={styles.input} key={key} onChangeText={(text) => {this.HandleChange(text, myKey); this.value=text;}} >{this.state.data.list[myKey].text}</TextInput>);
      }
      key++;
    });
  }
    return returnValue;
  }

  SavMyData = () => {
    //If user logged
    //console.log(Auth.currentCredentials());
    //var f = new File([], this.state.data.id+".json");
    Storage.put(this.state.data.id+".json", JSON.stringify(this.state.data), {
      level: 'private',
      contentType: 'text/plain'
    })
    .then (result => {console.log(result); this.setState({isSav:false});})
    .catch(err => console.log(err));
  }

  AddElement = () => {
    //console.log('AddTextInput function !');
    //console.log(this.state.data.list.length);
    this.state.data.list.push({"type":"TextInput", "text":'', "sort":this.state.data.list.length});
    //console.log(this.state.data.list.length);
    //console.log(this.state.data.list[this.state.data.list.length-1]);
    this.setState({isSav:false});
    this.forceUpdate();
  }

  RemoveElement = () => {
    //console.log('RemoveTextInput function !');
    this.state.data.list.splice(this.state.data.list.length-1, 1);
    //console.log(this.state.data.list.length);
    //console.log(this.state.data.list[this.state.data.list.length-1]);
    this.setState({isSav:false});
    this.forceUpdate();
  }

  HandleChange = (e, f) => {
    //console.log("e : " + e);
    //console.log("f : " + JSON.stringify(f));
    //console.log(this.state);
    //console.log("avant : " + this.state.data.list[JSON.stringify(f)].text);
    this.state.data.list[JSON.stringify(f)].text = e;
    //console.log("après : " + this.state.data.list[JSON.stringify(f)].text);
    //this.setState({e: e});
    this.setState({isSav:false});
  }

  render() {
    
      let tt = this.Story(this.state.data);
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          {tt}
        </View>
        <View style={styles.submitButton}>
          
          <TouchableOpacity key={Math.random()} onPress={() => this.SavMyData()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity key={Math.random()} onPress={() => this.AddElement()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={Math.random()} onPress={() => this.RemoveElement()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Remove</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
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
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default CreatePageScreen;
