import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import PhotoGrid from 'react-native-image-grid';

class ListPageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {data: {"list":[]}};

    this.props.navigation.addListener('didFocus', () => {
     this.ListAllElement();
    });
  }

  Story(props) {
    
    var returnValue = [];
    const {navigate} = this.props.navigation;
    if(props.list){
    props.list.forEach(item => {
      let myKey = item.key;
      console.log(myKey);
      returnValue.push(
        <TouchableOpacity key={Math.random()} onPress={() => {
          console.log(myKey);
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
          //console.log('item : '+item.key);
        });
        this.forceUpdate();
      })
      .catch(err => console.log(err));
      //console.log('big list : ' +this.state.data.list);
      
  }

  render() {
    
    return (
      <PhotoGrid
        data = { this.state.data.list }
        itemsPerRow = { 3 }
        itemMargin = { 2 }
        itemPaddingHorizontal={2}
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />
    );
  
  }

  renderHeader() {
    return(
      <Text>I'm on top!</Text>
    );
  }

  renderItem(item, itemSize, itemPaddingHorizontal, ...props) {
    return(
      <TouchableOpacity
        key = { item.key }
        style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
        onPress = { () => {
          console.log(item.key);
          const {navigate} = props.navigation;
          navigate('Create Page', {myKey: item.key});
        }}>
        <View style={styles.button}>
              <Text style={styles.buttonText}>{item.key}</Text>
            </View>
      </TouchableOpacity>
    )
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
  backgroundColor: '#2196F3',
  alignItems: 'stretch',
  
    },
  buttonText: {
    color: 'white'
  },
container: {
    backgroundColor: '#f5fcff',
    flex:1,
    margin: 2,

    //flexDirection: "row",
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

export default ListPageScreen;
