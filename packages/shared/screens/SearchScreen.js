import React from "react";
import { View, Text, Image, Button, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { BottomNavigation, Card} from 'react-native-material-ui';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Kohana
} from 'react-native-textinput-effects';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  fontFamily: 'HelveticaNeue-UltraLight',
  palette: {
    primaryColor: COLOR.white,
  }
};

const randomImages = [
  require('./resources/user1.jpg'),
  require('./resources/user2.jpg'),
  require('./resources/user3.jpg'),
  require('./resources/user4.jpg'),
  require('./resources/user5.jpg')
];


class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: 'search',
      data: [],
      error: null,
      textValue: null,
      loading:false,
      hasSubmit: false,
      image: null
    };
  }
  onSubmit = () =>
  {
    let defaultName = "Bret"
    let name = this.state.textValue || defaultName;
    const base_url = `https://jsonplaceholder.typicode.com/users?username=`;
    const url = base_url + encodeURIComponent(name)

    this.setState({ loading: true, hasSubmit: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
          hasSubmit: true,
          image: randomImages[Math.floor(Math.random()*randomImages.length)]
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, hasSubmit: true });
      });
  };
  buttonGroup(){
    return(
        <View>
            <TouchableOpacity  activeOpacity={0.6} underlayColor='rgba(0,0,0,0.001)' style={styles.buttonOnPress} onPress={() => this.onSubmit()}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Icon name="search" color='white' size={30}/>
                    <Text style={styles.buttonTitle}>Search</Text>
                </View>
            </TouchableOpacity> 
        </View>
    );
}
infoCard(){
  if(this.state.loading&&this.state.hasSubmit){
    return(
      <View
      style={{
        paddingVertical: 30,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" color="#CA5460" />
      </View>
    )
  }
  if(!this.state.loading&&this.state.hasSubmit){
    let item = this.state.data[0];
    return(
    <View>
      <Card>
      <TouchableOpacity style={styles.touchableList} >
        <View style={styles.itemBlock}>
        <Image source={this.state.image} style={styles.itemImage}/>
        <View style={styles.itemMeta}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.detail}>{item.username}</Text>
          <Text style={styles.detail}>{item.company.name}</Text>
          <Text style={styles.detail}>{item.website}</Text>
          <Text style={styles.detail}>{item.phone}</Text>
        </View>
      </View>
      </TouchableOpacity>
      </Card>
    </View>
    )
  }
  return null;
}
  render() {
    console.log(this.state.textValue);
    console.log(this.state.data);
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
      <View style={{ flex: 1}}>
      <BottomNavigation active={this.state.active} hidden={false} style={{container: {backgroundColor: "#CA5460"}}}>
      <BottomNavigation.Action
          key="search"
          icon="search"
          label="Search"
          onPress={()=> this.props.navigation.navigate('Search')}
      />
       <BottomNavigation.Action
          key="home"
          icon="home"
          label="Home"
          onPress={()=> this.props.navigation.navigate('Home')}
      />
      <BottomNavigation.Action
          key="list"
          icon="people"
          label="List"
          onPress={()=> this.props.navigation.navigate('List')}
      />
      </BottomNavigation>             
      </View>
      <View style={[styles.card2, { backgroundColor: '#FFFFFF' }]}>
          <Text style={styles.title}>User Lookup</Text>
          <Kohana
            style={{ backgroundColor: '#FFFFFF', shadowOffset:{  width: 2,  height: 2,  },
            shadowColor: '#D8D8D8',
            shadowOpacity: 0.5, }}
            label={'Name'}
            iconClass={Foundation}
            iconName={'pencil'}
            iconColor={'#CA5460'}
            iconSize={25}
            labelStyle={{ marginTop: 1, color: '#CA5460', opacity: 0.4}}
            inputStyle={{ color: '#CA5460' }}
            useNativeDriver
            onChangeText={(text) => { this.setState({textValue: text}) }}
          />
      </View>
      {this.buttonGroup()}  
      {this.infoCard()}
      </ThemeContext.Provider>
    )
  }
}
const styles = StyleSheet.create({
  card2: {
    padding: 16,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'left',
    color: '#EECF70',
    fontSize: 30,
    opacity: 0.8,
    fontFamily: "HelveticaNeue-UltraLight",
  },
  buttonOnPress: {
    padding:10, 
    margin:20,
    alignItems:'center', 
    backgroundColor:'#EECF70', 
    height:50,
    borderRadius:4,
    marginTop: 44,
},
buttonTitle:{
    fontSize: 21,
    fontWeight: '200',
    fontFamily: "HelveticaNeue-UltraLight",
    textAlign: 'center',
    color: 'white',
},
touchableList: {
  backgroundColor: "#fff",
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "#ddd",
  borderRadius: 5,
  shadowColor: "#F7F7F8",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.7,
  shadowRadius: 2,
  paddingBottom: 10
},
itemBlock: {
  flexDirection: 'row'
},
itemImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginTop: 20,
  marginLeft: 30
},
itemMeta: {
  marginLeft: 10,
  justifyContent: 'center',
},
detail: {
  fontFamily: "HelveticaNeue-UltraLight",
  fontSize: 16,
  color: "#54595F"
},
itemName: {
  fontFamily: "HelveticaNeue-UltraLight",
  fontSize: 20,
  color: "#CA5460"
}
});
export default SearchScreen;
