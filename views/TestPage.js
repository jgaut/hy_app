import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      code: '',
      err: '',
      data: ''
    }
  }

  componentWillMount(){
    var data = {
      items: [{
          itemClass: 'Item',
          id: 1,
          contentsHTML: Math.random(),
          text: 'Item 1'
      }, {
          itemClass: 'Item',
          id: 2,
          contentsHTML: Math.random(),
          text: 'Item 2'
      }, {
          itemClass: 'Item',
          id: 3,
          contentsHTML: Math.random(),
          text: 'Item 3'
      }, {
          itemClass: 'Item',
          id: 4,
          contentsHTML: Math.random(),
          text: 'Item 4'
      }, {
          itemClass: 'Item',
          id: 5,
          contentsHTML: Math.random(),
          text: 'Item 5'
      }]
    };

    this.setState({ data });
  }



  render() {
    var React = window.React;

        var data = {
            items: [{
                itemClass: 'Item',
                id: 1,
                contentsHTML: '',
                text: 'Item 1'
            }, {
                itemClass: 'Item',
                id: 2,
                contentsHTML: '',
                text: 'Item 2'
            }, {
                itemClass: 'Item',
                id: 3,
                contentsHTML: '',
                text: 'Item 3'
            }, {
                itemClass: 'Item',
                id: 4,
                contentsHTML: '',
                text: 'Item 4'
            }, {
                itemClass: 'Item',
                id: 5,
                contentsHTML: '',
                text: 'Item 5'
            }]
        };

        var MyCatalog = React.createClass({
            getInitialState: function() {
                return {
                    data: {
                        items: []
                    }
                };
            },

            componentDidMount: function() {
                this.setState({
                    data: this.props.data
                });
            },

            render: function() {
                return ( < div className = "catalog" > HELLO !! !I AM A CATALOG !! !

                < ItemList data = {
                    this.state.data
                }
                />
            </div > );
            }
        });

        var ItemList = React.createClass({
            render: function() {
                console.log(this.props);

                var items = this.props.data["items"].map(function(itemData) {
                    var component = Components[itemData['itemClass']];
                    return React.createElement(component, {
                        data: itemData,
                        key: itemData['id']
                    });
                });
                console.log(items);
                return (
                    <div className="list">
                        <div>And I am an ItemList</div>
                        <div>{items}</div>
                    </div>
                );
            }
        });

        var Item = window.Item = React.createClass({
            render: function() {
                return ( < div className = "item" > < button > Regular item.Nothing special. < /button>
              {this.props.children}
            </div > );
            }
        });

        var Components = {
            'Item': Item
        };

        React.render( < MyCatalog data = {data}/>);
    
    return (
      <View>
          {items}
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
  input: {
    height: 26, 
    fontSize: 20, 
    color: '#000', 
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  label: {
    paddingTop: 30,

    color: 'black'
  },
  button: {    
    padding: 20,
    backgroundColor: '#2196F3',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white'
  }
});

export default ProfileScreen;
