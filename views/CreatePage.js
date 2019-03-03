import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard, Dimensions, ScrollView, Image, PanResponder } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { Permissions } from 'expo';
import { Constants } from 'expo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DraggableFlatList from 'react-native-draggable-flatlist'

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
      screenScroll:0,
    };

    
    this.props.navigation.addListener('didFocus', () => {
      console.log('time to launch!');
      //From listPage
      if(this.props.navigation.state.params.fromKey!=null && this.props.navigation.state.params.fromKey!=''){
        this.launch();
      }else 
      //From roll photo
      if(this.props.navigation.state.params.image!=null && this.props.navigation.state.params.image!=''){
        console.log('Get image :'+JSON.stringify(this.props.navigation.state.params.image));
        this.AddElement('image', this.props.navigation.state.params.image);
      }
    });

    this.props.navigation.addListener('didBlur', () => {
      console.log('time to sav!');
      this.SavMyData(false);
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e)=>{
      //console.log(e.endCoordinates.height);
      console.log('keaybord show');
      this.state.keyboardHeight=e.endCoordinates.height;
      //console.log('keyboard : ' + this.state.keyboardHeight);
    });

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e)=>{
      console.log('keaybord hide');
      //console.log('keyboard : ' + this.state.keyboardHeight);
    });
    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    this.panResponder = PanResponder.create({
      //onStartShouldSetPanResponder: (evt, gestureState) => {console.log(gestureState); return Math.abs(gestureState.dy) > 500},
      //onStartShouldSetPanResponderCapture: (evt, gestureState) => {console.log(gestureState); return Math.abs(gestureState.dy) > 500},
      //onMoveShouldSetResponderCapture: (evt, gestureState) => {console.log(gestureState); return Math.abs(gestureState.dy) > 500},
      //onMoveShouldSetPanResponderCapture: (evt, gestureState) => {console.log(gestureState); return Math.abs(gestureState.dy) > 500},
      //onMoveShouldSetPanResponder: () => {Alert.alert('move detected'); return true}
    });

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
          console.log('result : ' +JSON.stringify(result));
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

  Story(item2, index, move, moveEnd, isActive, state) {

    //console.log('call story : ' + JSON.stringify(item));
    //var returnValue = [];
    item = item2.item;
    if(item){
      console.log('item : ' + JSON.stringify(item));
      switch(item.type) {
        case 'note' :
          var sortKey = item.sort;
          console.log('returnValue : ' + item.text);
          return(
              <TextInput 
                style={styles.note} 
                key={sortKey} 
                //onBlur={()=>{this.state.keyboardVerticalOffset=0; console.log(this.state.keyboardVerticalOffset);this.forceUpdate();}} 
                //onFocus={()=>{this.OffsetKeyboard(sortKey); this.forceUpdate();}} 
                //onLayout = {(event) => {state.position.push({"sortKey": sortKey, "layout": event.nativeEvent.layout});}} 
                //onChangeText={(text) => {this.HandleChange(text, sortKey);}} 
                //onScroll={(event) => {this.onLayout(event, sortKey)}}
              >
                {item.text}
              </TextInput>
          );
          console.log('returnValue 2: ' + item.text);
          break;
        case 'text' :
          var sortKey = item.sort;
          console.log('returnValue : ' + item.text);
          return(
            <TextInput multiline={true} style={styles.text}
              key={sortKey} 
              //onBlur={()=>{this.state.keyboardVerticalOffset=0; console.log(this.state.keyboardVerticalOffset);this.forceUpdate();}} 
              //onFocus={()=>{this.OffsetKeyboard(sortKey); this.forceUpdate();}}
              //onLayout = {(event) => {state.position.push({"sortKey": sortKey, "layout": event.nativeEvent.layout});}} 
              //onChangeText={(text) => {this.HandleChange(text, sortKey);}} 
            >
              {item.text}
            </TextInput>
          );
          break;
        case 'image' :
          var sortKey = item.sort;
          return(
            <Image 
              style={{width: Dimensions.get('window').width, height: Math.min((item.height * Dimensions.get('window').width / item.width), item.height) || 100}} 
              key={sortKey} 
              source={{uri: item.uri}} 
            />
          );
          break;
        default:
          console.log('Sorry, we are out of ' + item.type + '.');
      }

  }
  }

  OffsetKeyboard(sortKey){

    var sortKeyPosition = this.state.position.find(function(element) { return element.sortKey == sortKey;});

    if((this.state.screenH-this.state.keyboardHeight) < (sortKeyPosition.layout.y - this.state.screenScroll)) {
      this.state.keyboardVerticalOffset=(sortKeyPosition.layout.y - this.state.screenScroll) - (this.state.screenH-this.state.keyboardHeight) + sortKeyPosition.layout.height;
      this.forceUpdate();
    }else if(this.state.keyboardHeight > (sortKeyPosition.layout.y - this.state.screenScroll)){
      this.state.keyboardVerticalOffset=(this.state.keyboardHeight - (sortKeyPosition.layout.y - this.state.screenScroll) + sortKeyPosition.layout.height)*-1
      this.forceUpdate();
    }
  }

  

  SavMyData(e) {
    if(!this.state.isSav){
      Storage.put(this.state.data.id+".json", JSON.stringify(this.state.data), {
        level: 'private',
        contentType: 'text/plain'
      })
      .then (result => {/*console.log(result);*/ this.setState({isSav:true}); if(e){this.launch();}})
      .catch(err => console.log(err));
    }
  }

  AddElement(element, data) {
    const {navigate} = this.props.navigation;
    var maxPosition = 0;
    this.state.data.list.forEach(item => {
      maxPosition=Math.max(maxPosition, item.sort);
    });
    maxPosition = maxPosition +1;

    switch (element) {
      case 'note':
        this.state.data.list.push({"type":"note", "text":'', "sort":maxPosition});
        console.log('add note');
        break;
      case 'text':
        this.state.data.list.push({"type":"text", "text":'', "sort":maxPosition});
        console.log('add text');
        break;
      case 'roll':
        navigate('Roll');
        console.log('lauch roll screen');
        break;
      case 'image':
        this.state.data.list.push({"type":"image", "uri":data.uri, "height":data.height, "width":data.width, "sort":maxPosition});
        console.log('add image:' + JSON.stringify(data));
        break;
      default:
        console.log('Sorry, we are out of ' + element + '.');
    }

    //unsave
    this.setState({isSav:false});
    
    //force to refresh
    this.forceUpdate();
  }

  RemoveElement(sortKey) {
    //console.log(this.state.data.list[sortKey]);
    this.state.data.list = this.state.data.list.filter(item => item.sort != sortKey);
    this.state.position = this.state.position.filter(item => item.sort != sortKey);
    //console.log(this.state.data.list);
    this.setState({isSav:false});
    this.forceUpdate();
  }

  HandleChange(e, f) {
    //console.log('text : ' +e);
    //console.log('position : ' +JSON.stringify(f));
    this.state.data.list.forEach(item => {
      if(item.sort == f){
        item.text = e;
      }
    });
    this.setState({isSav:false});
  }

  handleScroll(event) {
    /*console.log(event);
    console.log(event.nativeEvent);
    console.log(event.nativeEvent.contentOffset);
  */
    this.state.screenScroll=event.nativeEvent.contentOffset.y;
  }
  
  render() {
    return (

      //<KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={this.state.keyboardVerticalOffset}>
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data.list}
          renderItem={(item, index, move, moveEnd, isActive ) => this.Story(item, index, move, moveEnd, isActive, this.state)}
          keyExtractor={(item, index) => `draggable-item-${item.sort}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.state.data.list=data }
        />
        </View>
/*
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
      */

    );
  
}
}

const styles = StyleSheet.create({
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
  contentContainer: {
    //paddingTop: 0,
    //marginBottom: 100,
  },
});

export default CreatePageScreen;
