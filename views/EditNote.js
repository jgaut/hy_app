import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class EditNote extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      text: 0,
    };
  }

  render() {
    
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          mode="outlined"/>
          <View style={styles.submitButton}>
          
          <TouchableOpacity key={Math.random()} onPress={() => {navigate('Create Page', {'type':'note', 'text':this.state.text});}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={Math.random()} onPress={() => {navigate('Create Page')}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});

export default EditNote;
