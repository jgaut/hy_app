import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
 
const moment = extendMoment(Moment);

const numColumns = 3;

class ListPageScreen extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {data: {"list":[]}};
    this.ListAllElement();
    
  }

  componentWillMount(){
   // this.scrollToItem('item' : this.state.data.list[112]);
  }

  ListAllElement = () => {
    const range = moment.range('2010-01-01', '2015-01-01');
 
    for (let month of range.by('month')) {
      let item = {key:month.format('YYYY-MM-DD');};
      this.state.data.list.push(item);
    }
      
      
    }
  }

  render() {

    return (
      <FlatList
        data={formatData(this.state.data.list, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        progressViewOffset={(number)=>{console.log('offset : '+number)}}
        //onEndReached={(number) => {console.log("distance from end : " + JSON.stringify(number))}}
        onViewableItemsChanged={(info) => {
          for(let i=0; i<info.viewableItems.length; i++){
            let n = info.viewableItems[i].item.key;
            //console.log(n);
            //console.log('new max : '+n);
            //console.log(this.state.data);
          };
          //console.log("viewableItems : " + JSON.stringify(viewableItems)); 
        }
      }
      />
    );
  
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        key = { item.key }
        style={styles.item}
      >
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
      </TouchableOpacity>
    );
  };
}

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});

export default ListPageScreen;
