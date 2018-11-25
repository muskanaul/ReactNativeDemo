import React from "react";
import {
  View,
  Image,
  Text,
  Animated,
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { BottomNavigation} from 'react-native-material-ui';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logoImage from './resources/header.png';
import homeImage from './resources/home.jpg';

const {width, height} = Dimensions.get('window')

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  fontFamily: 'HelveticaNeue-UltraLight',
  palette: {
    primaryColor: COLOR.white,
  }
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: 'home'
    };
  }
logo() {
    return(
        <View style={styles.logoContainer}> 
            <Image style={styles.logo} source={logoImage} resizeMode='cover'/>
            <Image style={styles.logoHome} source={homeImage} resizeMode='cover'/>
            <Text style={styles.itemName}>React Native Demo</Text>
            <Text style={styles.detail}>Multi-Platform Application</Text>
        </View>
    );
}

buttonGroup(){
    return(
        <View style={styles.buttonGroups}>
            <TouchableOpacity  activeOpacity={0.6} underlayColor='rgba(0,0,0,0.001)' style={styles.buttonOnPress} onPress={() => this.onRandomPress()}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Icon name="shuffle" color='white' size={30}/>
                    <Text style={styles.buttonTitle}>Get Started</Text>
                </View>
            </TouchableOpacity> 
        </View>
    );
}
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
      <View style={{ flex: 1}}>
      <BottomNavigation active={this.state.active} hidden={false} style={{container: {backgroundColor: "#4B286D"}}}>
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
  <View style={ styles.container }>  
                <StatusBar backgroundColor="white" barStyle="default" />
                {this.logo()}
                {this.buttonGroup()}
    </View>
  </View>  
  </ThemeContext.Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:'column',
  },
  header:{
      marginHorizontal:10,
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'white',
      height: 64,
  },
  logo:{
      width:243,
      height: 82.5,
      alignItems:'center'
  },
  logoHome:{
    width:415,
    height: 220,
    alignItems:'center'
  },
  logoContainer:{
      alignItems:'center',
      marginTop:50,
  },
  detail: {
    fontFamily: "HelveticaNeue-UltraLight",
    fontSize: 16,
    color: "#54595F"
  },
  itemName: {
    fontFamily: "HelveticaNeue-UltraLight",
    fontSize: 40,
    color: "#4B286D"
  },
  buttonOnPress: {
      padding:10, 
      margin:20,
      alignItems:'center', 
      backgroundColor:'#248700', 
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
  latestTitle:{
      fontSize: 21,
      fontWeight: '300',
      textAlign: 'center',
      color: '#34495E',
      marginTop:50,
      marginBottom:20
  },
  latestRowItems:{
      fontSize: 21,
      fontWeight: '300',
      textAlign: 'center',
      color: '#3498db',
      margin:10,

  }
});
export default HomeScreen;
