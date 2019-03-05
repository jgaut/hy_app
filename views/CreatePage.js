import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Storage from '@aws-amplify/storage';

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
        this.launch();
      });
  }

  componentWillMount(){

  }

  launch(){
    var fk="2019-10-26";
    Storage.get(fk+'.json', {level: 'private'})
      .then(result => {
        fetch(result)
          .then(response => response.json())
            .then(data => {
              console.log("data :" + JSON.stringify(data));
              this.state.data=data;
              var tmp=this.state.data.list.map((d, index) => ({
                                key: `item-${index}`,
                                label: d.text,
                                backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
                              }));
              this.state.list=tmp;
            })
            .catch(error => {console.log(error);});
      })
      .catch(err => console.log(err));

  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
     console.log("item : " +item);
    console.log("item : " +item.label);
    
    return (
      <TouchableOpacity
        style={{ 
          height: 100, 
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{ 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 32,
        }}>{item.label}</Text>
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
          onMoveEnd={({ data }) => {this.state.data.list=data; console.log(data); console.log(this.state.data.list);}}
        />
      </View>
    )
  }
}

export default Example