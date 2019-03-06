import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, InputText, Dimensions, Image } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { Constants } from 'expo';

class CreatePage extends Component {

  state = {
    list: [...Array(1)].map((d, index) => ({
      key: `item-${index}`,
      type: "Loading",
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    })),
    isMoving: false,
    isSav: false,
  }

  constructor(...args) {
    super(...args);

    this.props.navigation.addListener('didFocus', () => {
      console.log('time to launch!');
      //From listPage
      if(this.props.navigation.state.params.fromKey!=null && this.props.navigation.state.params.fromKey!=''){
        console.log("constructor ! : "+this.props.navigation.state.params.fromKey);
        this.setState({'fromKey' : this.props.navigation.state.params.fromKey});
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

  }

  componentWillMount(){
    
  }



  launch(){
    console.log("launch ! : "+this.props.navigation.state.params.fromKey);
    var key = this.props.navigation.state.params.fromKey;
    Storage.get(key+'.json', {level: 'private'})
      .then(result => {
        fetch(result)
          .then(response => response.json())
            .then(data => {
              //console.log("data :" + JSON.stringify(data));
              this.state.data=data;
              var tmp = this.state.data.list.map((d, index) => ({
                                key: `item-${index}`,
                                type: d.type,
                                text: d.text,
                                uri: d.uri,
                                width: d.width,
                                height: d.height,
                              }));
              this.setState({'list': tmp});
              this.forceUpdate(); 
              this.state.isSav=true;
            })
            .catch(error => {console.log(error);});
      })
      .catch(err => console.log(err));
  }

  SavMyData(e) {
    if(!this.state.isSav){
      this.state.data.list = this.list;
      Storage.put(this.state.data.id+".json", JSON.stringify(this.state.data), {
        level: 'private',
        contentType: 'text/plain'
      })
      .then (result => {/*console.log(result);*/ this.setState({isSav:true}); if(e){this.launch();}})
      .catch(err => console.log(err));
    }
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    //console.log("item : " +item);
    //console.log("item : " +item.text||item.uri);
    //console.log("compo : " +JSON.stringify(this.state.isMoving));
    switch(item.type) {
      case 'note':
        return (
          <TouchableOpacity
            style={this.state.isMoving ? styles.MovingBlock : styles.nothing}
            onLongPress={()=>{console.log("onLongPress!");if(this.state.isMoving){move();}}}
            onPressOut={()=>{console.log("onPressOut!");if(this.state.isMoving){move();}}}
          >
            <Text 
              style={this.state.isMoving ? styles.nothing : styles.note}
              key={Math.random()} 
            >
              {item.text}
            </Text>

          </TouchableOpacity>
        );
        break;

      case 'text':
        return (
          <TouchableOpacity
            style={this.state.isMoving ? styles.MovingBlock : styles.nothing}
            onLongPress={()=>{console.log("onLongPress!");if(this.state.isMoving){move();}}}
            onPressOut={()=>{console.log("onPressOut!");if(this.state.isMoving){move();}}}
          >
            <Text 
              style={this.state.isMoving ? styles.nothing : styles.text}
              key={Math.random()} 
            >
              {item.text}
            </Text>

          </TouchableOpacity>
        );
        break;

      case 'image':
        return (
          <TouchableOpacity
            //style={} 
            style={this.state.isMoving ? styles.MovingBlock : styles.nothing}
            onLongPress={()=>{console.log("onLongPress!");if(this.state.isMoving){move();}}}
            onPressOut={()=>{console.log("onPressOut!");if(this.state.isMoving){move();}}}
          >
            <Image 
            style={this.state.isMoving ? styles.nothing : {width: Dimensions.get('window').width, height: Math.min((item.height * Dimensions.get('window').width / item.width), item.height) || 100}}
            //style={this.state.isMoving ? styles.nothing : styles.nothing}
              key={Math.random()} 
              source={{uri: item.uri}} 
            />

          </TouchableOpacity>
        );
        break;

        case 'loading':
        return (
          
            <Text 
            style={styles.button}
              key={Math.random()}>Loading...</Text>

        );
        break;

        default:
          console.log('Sorry, we are out of ' + item.type + '.');
  }
  }

  render() {
    return (
      <View style={styles.container}>

        <DraggableFlatList
          data={this.state.list}
          renderItem={( item, index, move, moveEnd, isActive ) => this.renderItem(item, index, move, moveEnd, isActive)}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ 'list': data, isSav:false}})}
        />


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
        
          <TouchableOpacity key={Math.random()} onPress={() => {console.log("onPressButton");this.setState({'isMoving':this.state.isMoving?false:true});}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.isMoving?"End move":"Start move"}</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    )
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
  nothing: {

  },
  MovingBlock: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
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
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default CreatePage