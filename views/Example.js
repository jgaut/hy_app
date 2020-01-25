import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

class Example extends Component {

  state = {
    list: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    }))
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
    console.log(this.state.list);
    return (
      <View style={{ flex: 1 }}>
      </View>
    )
  }
}

export default Example
