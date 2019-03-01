import React from 'react';
import { StyleSheet, View} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker'

class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount(){
  }

  getSelectedImages(a, b){
    console.log(a);
    console.log(b);
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <CameraRollPicker
  callback={this.getSelectedImages} />
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 60, 
    backgroundColor: '#f5fcff',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    paddingTop: 30
  },
});

export default HomeScreen;
