import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard, Dimensions, ScrollView, Image } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { Permissions } from 'expo';
import { Constants } from 'expo';

class CreatePageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {
      data:{"id":'',"list":[]}, 
      isSav:true, 
      fromKey:'', 
      keyboardVerticalOffset:0, 
      position:[], 
      keyboardHeight:290,
      screenH:Dimensions.get('window').height,
    };

    this.props.navigation.addListener('didFocus', () => {
      console.log('time to launch!');
      if(this.props.navigation.state.params.fromKey!=null && this.props.navigation.state.params.fromKey!=''){
        this.launch();
      }else if(this.props.navigation.state.params.image!=null && this.props.navigation.state.params.image!=''){
        console.log('Get image :'+JSON.stringify(this.props.navigation.state.params.image));
        this.AddElement('image', this.props.navigation.state.params.image.uri);
      }
    });

    this.props.navigation.addListener('didBlur', () => {
      console.log('time to sav!');
      this.SavMyData(false);
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e)=>{
      //console.log(e.endCoordinates.height);
      this.state.keyboardHeight=e.endCoordinates.height;
      //console.log('keyboard : ' + this.state.keyboardHeight);
    });
    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    //console.log(this.state);
  }

  launch() {
    if(this.state.isSav){
      const fk = this.props.navigation.state.params.fromKey;
      this.state.fromKey = this.props.navigation.state.params.fromKey;
      //console.log(this.state.fromKey);
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
                //console.log("get result : " +result);
                //result => private url
                fetch(result)
                  .then(response => response.json())
                    .then(data => {
                      this.state.data=data; 
                      this.forceUpdate(); 
                      this.state.isSav=true;
                      //init position array
                      for(var i=0; i<data.length; i++){
                        this.state.position[i]=0;
                      }
                      //console.log(JSON.stringify(this.state.data));
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

  Story(props) {
    
    var returnValue = [];
    if(props.list){
    props.list.forEach(item => {
      switch(item.type) {
        case 'note' :
          var sortKey = item.sort;
          returnValue.push(
          <TextInput 
            style={styles.note} 
            key={sortKey} 
            onBlur={()=>{console.log('on blur'); this.state.keyboardVerticalOffset=0; console.log(this.state.keyboardVerticalOffset);this.forceUpdate();}} 
            onFocus={()=>{console.log('on focus'); this.OffsetKeyboard(sortKey); this.forceUpdate();}} 
            onLayout = {(event) => {this.onLayout(event, sortKey)}} 
            onChangeText={(text) => {this.HandleChange(text, sortKey);}} >
              {this.state.data.list[sortKey].text}
            </TextInput>);
          break;
        case 'text' :
          var sortKey = item.sort;
          returnValue.push(
            <TextInput multiline={true} style={styles.text}
            key={sortKey} 
            onBlur={()=>{console.log('on blur'); this.state.keyboardVerticalOffset=0; console.log(this.state.keyboardVerticalOffset);this.forceUpdate();}} 
            onFocus={()=>{console.log('on focus');this.OffsetKeyboard(sortKey); this.forceUpdate();}} 
            onLayout = {(event) => {this.onLayout(event, sortKey)}} 
            onChangeText={(text) => {this.HandleChange(text, sortKey);}} >
              {this.state.data.list[sortKey].text}
            </TextInput>);
          break;
        case 'image' :
          var sortKey = item.sort;
          returnValue.push(<Image key={sortKey} source={{uri: item.uri}} />);
          break;
        default:
          console.log('Sorry, we are out of ' + item.type + '.');
      }
    });
  }
    return returnValue;
  }

  OffsetKeyboard(sortKey){
    if((this.state.screenH-this.state.keyboardHeight) < this.state.position[sortKey].y){
      this.state.keyboardVerticalOffset=this.state.position[sortKey].y - (this.state.screenH-this.state.keyboardHeight) + this.state.position[sortKey].height;
      console.log('decalage : ' + this.state.keyboardVerticalOffset);
      this.forceUpdate();
    }else if(this.state.keyboardHeight > this.state.position[sortKey].y){
      this.state.keyboardVerticalOffset=(this.state.keyboardHeight - this.state.position[sortKey].y + this.state.position[sortKey].height)*-1
      console.log('decalage : ' + this.state.keyboardVerticalOffset);
      this.forceUpdate();
    }
  }

  onLayout(event, sortKey){
    if(this.state.position[sortKey]==null){
      this.state.position[sortKey]=event.nativeEvent.layout;
    }
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

  AddElement = (element, uri) => {
    const {navigate} = this.props.navigation;
    switch (element) {
      case 'note':
        this.state.data.list.push({"type":"note", "text":'', "sort":this.state.data.list.length});
        console.log('add note');
        break;
      case 'text':
        this.state.data.list.push({"type":"text", "text":'', "sort":this.state.data.list.length});
        console.log('add text');
        break;
      case 'roll':
        navigate('Roll');
        console.log('lauch roll screen');
        break;
      case 'image':
        this.state.data.list.push({"type":"image", "uri":uri, "sort":this.state.data.list.length});
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

  HandleChange = (e, f) => {
    console.log('text : ' +e);
    console.log('position : ' +JSON.stringify(f));
    this.state.data.list[JSON.stringify(f)].text = e;
    this.setState({isSav:false});
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView  behavior="padding" style={styles.container} keyboardVerticalOffset={this.state.keyboardVerticalOffset}>
        <View style={styles.form}>
          {this.Story(this.state.data)}
        </View>
        <View style={styles.submitButton}>
          
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

          <TouchableOpacity key={Math.random()} onPress={() => this.AddElement('roll')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add image</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
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
    paddingTop: Constants.statusBarHeight,
  },
  note: {
      padding:5,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
  },
  text: {
      padding:5,
    height: 150,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
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
