import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class TestPageScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      code: '',
      err: '',
      data: 'ok'
    }
  }

  componentWillMount(){
  
  }




  render() {

  var MyCatalog = React.createClass({
  render: function () {
    return (
      <div className="catalog">
        HELLO!!! I AM A CATALOG!!!

        <ItemList data={this.state.data}/>
      </div>
    );
  }
});
    
    return (
      <MyCatalog data={data}/>
    );
  
}
}

export default TestPageScreen;
