import React, { Component } from 'react'
import { View, TouchableOpacity, Text, InputText } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

class Example extends Component {

  state = {
    list: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    }))
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
      //TODO
      //this.SavMyData(false);
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
                                label: d.text,
                                //backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
                              }));
              this.setState({'list': tmp});
              this.forceUpdate(); 
              this.state.isSav=true;
            })
            .catch(error => {console.log(error);});
      })
      .catch(err => console.log(err));
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    //console.log("item : " +item);
    console.log("item : " +item.label);
    
    return (
      <TouchableOpacity
        style={{ 
          height: 100, 
          backgroundColor: isActive ? 'blue' : 'grey',
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <InputText style={{ 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 32,
        }}>{item.label}</InputText>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ 'list': data})}
        />
      </View>
    )
  }
}

export default Example