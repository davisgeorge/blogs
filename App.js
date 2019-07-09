// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Fragment} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App = () => {
//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React from "react";
import { List, ListItem } from "react-native-elements";
// import {View , Flatlist, Button} from 'reac-native'
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  WebView,
  Switch,
  Button,
  Alert,
  AsyncStorage,
  Dimensions,
  FlatList
} from "react-native";
import firebase from "./src/firebase";
import blogadd from "./src/blogadd";
import blog from "./src/blog";
import flatlist from "./src/flatlist";
import { createStackNavigator, NavigationActions } from "react-navigation";

import { Container, Header, Content, Card, CardItem, Right } from "native-base";
import { Icon } from "react-native-elements";

var items = [];
var margintLeftValue = 0;
if (Platform.OS === "android") {
  margintLeftValue = -18;
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      items: []
    };
  }
  getkey = (title, index) => {
    var name = title;

    var key = index;
    console.log("get key function ", name, "   ", key);
    this.props.navigation.navigate("blog", { docid: name });
  };
  static navigationOptions = ({ navigation }) => ({
    title: "     Home",
    headerTitleStyle: {
      alignSelf: "center",
      marginLeft: margintLeftValue,
      color: "#2F2E2F",
      fontFamily: "Avenir-Medium"
    }
    // headerLeft: (
    // <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
    //   <Image
    //     source={require("./../images/menu.png")}
    //     style={styles.drawerIcon}
    //   />
    // </TouchableOpacity>
    // )
  });
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
          // if (this.state.items!= null){
          //   items=[];
          // }
            items.push({
              title: data.title
            });
            this.setState({ items: items });
          
        });
      });
  }
  add() {}
  componentDidMount() {
    this.forceUpdate;
  }
  render() {
    // console.log("data in list ",this.state.data)
    return (
      <View style={styles.maincontainer}>
        <View style={styles.row1}>
          <Container>
            <Content>
              <Card>
                <CardItem>
                  <Text>BLOGS</Text>
                  <Right>
                    <TouchableOpacity
                      style={styles.buttonstyle}
                      onPress={() => this.props.navigation.navigate("blogadd")}
                    >
                      <Icon
                        // raised
                        name="plus-circle"
                        type="font-awesome"
                        style={{ fontSize: 10 }}
                        // onPress={() => console.log("hello")}
                      />
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            </Content>
          </Container>
        </View>
        <View style={styles.row2}>
          <Container>
            <Content>
              <Card>
                {this.state.items.map((item, index) => {
                  return (
                    <CardItem bordered key={index}>
                      <Text>{item.title}</Text>
                      <Right
                        style={{
                          marginLeft: 18
                        }}
                      >
                        <TouchableOpacity
                          style={styles.buttonstyle}
                          onPress={() => this.getkey(item.title, index)}
                        >
                          <Icon
                            // raised
                            name="arrow-circle-right"
                            type="font-awesome"
                            style={{ fontSize: 10 }}
                            // onPress={() => console.log("hello")}
                          />
                        </TouchableOpacity>
                      </Right>
                    </CardItem>
                  );
                })}
                {/* {this.state.routes.map((item, index) => {
                  return (
                    <CardItem bordered key={index}>
                      <Text>{item.id}</Text>
                     
                      <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() => this.delete(item.id)}
          >
            <Text>Next</Text>
          </TouchableOpacity>
                    </CardItem>
                  );
                })} */}
              </Card>
            </Content>
          </Container>
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    blogadd: blogadd,
    blog: blog,
    flatlist: flatlist
  },
  {
    initialRouteName: "Home"
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  row1: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 5
  },
  row2: {
    flex: 4,
    backgroundColor: "#add8e6"
  },
  buttonstyle: {
    padding: 13,
    backgroundColor: "#ffc130",
    borderRadius: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  title: {
    fontSize: 18
  }
});
