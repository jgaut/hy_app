import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import PhotoGrid from 'react-native-image-grid';
import { createStackNavigator } from 'react-navigation';

class ListPageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {data: {"list":[]}, width:''};
    this.props.navigation.addListener('didFocus', () => {
     this.ListAllElement();
    });
    this.state.width = (Dimensions.get('window').width/3)-4*2;
  }

  Story(props) {
    
    var returnValue = [];
    const {navigate} = this.props.navigation;
    if(props.list){
    props.list.forEach(item => {
      let myKey = item.key;
      //console.log(myKey);
      returnValue.push(
        <TouchableOpacity key={Math.random()} onPress={() => {
          //console.log(myKey);
          navigate('Create Page', {myKey: myKey});
        }
        }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{myKey}</Text>
            </View>
          </TouchableOpacity>);
    });
  }
    return returnValue;
  }

  ListAllElement = () => {
    this.state.data.list = [];
    Storage.list('', {level: 'private'})
      .then(result => {
        result.forEach(item => {
          this.state.data.list.push(item);
        });
        this.forceUpdate();
      })
      .catch(err => console.log(err));
  }

  render() {

    let {width, height} = Dimensions.get('window');
    console.log(width, height);

    return (
      <PhotoGrid
        data = { this.state.data.list }
        //itemsPerRow = { 3 }
        //itemMargin = { 2 }
        //itemPaddingHorizontal={2}
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
        style={{marginLeft:1}}
      />
    );
  
  }

  renderHeader() {
    return(
      <Text style={{height:25}}></Text>
    );
  }

  renderItem = (item, itemSize, itemPaddingHorizontal) => {
    const {navigate} = this.props.navigation;
    const styles = StyleSheet.create({
button: {
  backgroundColor: '#2196F3',
  alignItems: 'stretch',
  height:this.state.width,
  width: this.state.width,
  borderColor:"grey",
  borderWidth:0.5,
  borderRadius:5,
  margin: 1,
  
    },
  buttonText: {
    color: 'white'
  },
});
    return(
      <TouchableOpacity
        key = { item.key }
        //style = {{ width: 98, height: itemSize, paddingHorizontal: itemPaddingHorizontal, border:1, borderColor:"black" }}
        onPress = { () => {
          //console.log(item.key);
          //console.log(itemSize);
          navigate('Create Page', {myKey: item.key});
        }}>
        <View style={styles.button}>
              <Text style={styles.buttonText}>{item.key}</Text>
            </View>
      </TouchableOpacity>
    )
  }
}



export default ListPageScreen;
