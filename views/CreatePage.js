import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

class CreatePageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {data:{"id":'',"list":[]}, isSav:true, fromKey:''};

    this.props.navigation.addListener('didFocus', () => {
     this.launch();
    });
  }

  launch = () => {

    if(!this.state.isSav){
      Alert.alert(
        'Attention',
        'Une page est en cours de création. Voulez-vous abandonner ?',
        [
          {text: 'Sauvegarder et continuer', onPress: () => {console.log('Sauvegarder et continuer'); this.SavMyData(true);} },
          {text: 'Retour au brouillon', onPress: () => console.log('Retour au brouillon')},
        ],
        {cancelable: false},
      );
    }

    if(this.state.isSav){
      const fk = this.props.navigation.state.params.fromKey;
      this.state.fromKey = this.props.navigation.state.params.fromKey;
      //console.log(this.state.fromKey);
      if(this.state.fromKey=='' || this.state.fromKey==null){
        const uuidv4 = require('uuid/v4');
        let myTmp = {"id":uuidv4(),"list":[]};
        this.state.data = myTmp;
        this.forceUpdate();
      }else{
        console.log('create page : ' + this.state.fromKey);
        //Page exist ?
        Storage.list(this.state.fromKey+'.json', {level: 'private'})
        .then(result => {
          console.log('result : ' +result);
          //si page non existante
          if(result==''){
            this.state.data.id=fk;
            this.state.data.list=[];
            this.forceUpdate();
            this.state.isSav=true;
          }else{
            Storage.get(fk+'.json', {level: 'private'})
              .then(result => {
                console.log("get result : " +result);
                //result => private url
                fetch(result)
                  .then(response => response.json())
                    .then(data => {
                      console.log("data : "+data);
                      this.state.data=data; 
                      this.forceUpdate(); 
                      this.state.isSav=true;
                      console.log(JSON.stringify(this.state.data));
                    })
                    .catch(error => {console.log(error);});
              })
              .catch(err => console.log(err));
          }
          this.state.fromKey=null;
          this.props.navigation.state.params.fromKey=null;  
        })
        .catch(err => console.log('err : ' +err));
      }
    }
  }

  Story(props) {
    
    var returnValue = [];
    if(props.list){
    props.list.forEach(item => {
      switch(item.type) {
        case 'note' :
          var sortKey = item.sort;
          returnValue.push(<TextInput style={styles.note} key={sortKey} onChangeText={(text) => {this.HandleChange(text, sortKey);}} >{this.state.data.list[sortKey].text}</TextInput>);
          break;
        case 'text' :
          var sortKey = item.sort;
          returnValue.push(<TextInput multiline={true} style={styles.text} key={sortKey} onChangeText={(text) => {this.HandleChange(text, sortKey);}} >{this.state.data.list[sortKey].text}</TextInput>);
          break;
        case 'image' :
          //var fromKey = item.sort;
          //returnValue.push(<TextInput multiline={true} style={styles.note} key={key} onChangeText={(text) => {this.HandleChange(text, fromKey); this.value=text;}} >{this.state.data.list[fromKey].text}</TextInput>);
          break;
        default:
          console.log('Sorry, we are out of ' + item.type + '.');
      }
    });
  }
    return returnValue;
  }

  SavMyData = (e) => {
    if(!this.state.isSav){
      Storage.put(this.state.data.id+".json", JSON.stringify(this.state.data), {
        level: 'private',
        contentType: 'text/plain'
      })
      .then (result => {/*console.log(result);*/ this.setState({isSav:true}); if(e){this.launch();}})
      .catch(err => console.log(err));
    }
  }

  AddElement = (element) => {
    switch (element) {
      case 'note':
        this.state.data.list.push({"type":"note", "text":'', "sort":this.state.data.list.length});
        console.log('add note');
        break;
      case 'text':
        this.state.data.list.push({"type":"text", "text":'', "sort":this.state.data.list.length});
        console.log('add text');
        break;
      case 'image':
        this.state.data.list.push({"type":"image", "text":'', "sort":this.state.data.list.length});
        console.log('add image');
        break;
      default:
        console.log('Sorry, we are out of ' + element + '.');
    }

    //unsave
    this.setState({isSav:false});
    
    //force to refresh
    this.forceUpdate();
  }

  RemoveElement = () => {
    this.state.data.list.splice(this.state.data.list.length-1, 1);
    this.setState({isSav:false});
    this.forceUpdate();
  }

  NouvellePage = () => {
    this.launch();
  }

  HandleChange = (e, f) => {
    console.log('text : ' +e);
    console.log('position : ' +JSON.stringify(f));
    this.state.data.list[JSON.stringify(f)].text = e;
    this.setState({isSav:false});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          {this.Story(this.state.data)}
        </View>
        <View style={styles.submitButton}>
          
          <TouchableOpacity key={Math.random()} onPress={() => this.SavMyData(false)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity key={Math.random()} onPress={() => this.AddElement('note')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add note</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={Math.random()} onPress={() => this.AddElement('text')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add text</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={Math.random()} onPress={() => this.AddElement('image')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add image</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  
}
}

const styles = StyleSheet.create({
  form: { 
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
  note: {
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  text: {
    height: 150,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  image: {
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
