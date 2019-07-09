import React from "react";
import { FlatList, Text } from "react-native";
import { View } from "native-base";
import firebase from './firebase'

export default class flatlist extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };
  constructor(props){
      super(props);
      this.state={
          data:null,
      }
  }
  componentWillMount() {
    firebase
      .firestore()
      .collection("blogs")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents." + "drivers");
          return;
        }

        snapshot.forEach(doc => {
          console.log("Blogs" + "                ", doc.id, "=>", doc.data());
          var data = doc.data();
          console.log("blog title", data.title);
          this.setState({ data: data.title });
          // console.log("routes array with states",this.state.items+"-----",items)
          // // if(this.state.items == null){
          // items.push({
          //   title: doc.data().name,
          //   id: doc.data().id,
          //   _key: doc.data().id,
          //   switch: false,
          //   test: "tes"
          // });
          // this.setState({ items: items });
          // this.setState({ users: doc.data() });
          // console.log("items array", JSON.stringify(this.state.items));
          // console.log("users array", JSON.stringify(this.state.users));
          // }
        });
      });
  }
  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Text>Test</Text>
      </View>
    );
  }
}
