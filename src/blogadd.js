import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import firebase from "./firebase";
import { NavigationActions } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export default class blogadd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: "     Blog Creation",
    headerTitleStyle: {
      alignSelf: "center",
      marginLeft: 0,
      color: "#2F2E2F",
      fontFamily: "Avenir-Medium"
    }
  });

  publish = () => {
    console.log("titile state in publish", this.state.title);
    if (this.state.title == null) {
      ToastAndroid.showWithGravity(
        "Please Add the title",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else if (this.state.content == null) {
      ToastAndroid.showWithGravity(
        "Please Add Content",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else {
      firebase
        .firestore()
        .collection("blogs")
        .doc(this.state.title)
        .set({ title: this.state.title, content: this.state.content },{merge:true}).then((docref)=>{
            ToastAndroid.showWithGravity(
                "Published Successfully",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
              this.props.navigation.navigate('blog',{docid:this.state.title})
        });
    }
  };
  render() {
    console.log("title state", this.state.title);

    return (
      <View style={styles.maincontainer}>
        <View style={styles.row1}>
          <TextInput
            style={styles.textinput}
            placeholder="Title"
            onChangeText={text => this.setState({ title: text })}
          />
        </View>
        <View style={styles.row2}>
          <TextInput
            style={styles.content}
            multiline={true}
            numberOfLines={4}
            placeholder="Content"
            onChangeText={text => this.setState({ content: text })}
          />
        </View>
        <View style={styles.row3}>
          <TouchableOpacity style={styles.buttonstyle} onPress={this.publish}>
            <Text>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  row1: {
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  row2: {
    flex: 6
    // backgroundColor: "#add8e6"
  },
  row3: {
    flex: 1,

    justifyContent: "center",
    alignItems: "flex-end"
  },

  textinput: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 25,

    marginTop: 8,
    width: wp("100%"),
    backgroundColor: "#add8e6",
    borderRadius: 8
  },
  content: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 18,

    width: wp("100%")
  },

  buttonstyle: {
    padding: 13,
    backgroundColor: "#ffc130",
    borderRadius: 5,
    marginRight: 25
  }
});
