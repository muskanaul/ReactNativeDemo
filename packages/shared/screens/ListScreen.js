import React from "react";
import { View, Text, Image, FlatList, StyleSheet,TouchableOpacity, ActivityIndicator } from "react-native";
import { BottomNavigation, ActionButton} from 'react-native-material-ui';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    fontFamily: 'HelveticaNeue-UltraLight',
    primaryColor: COLOR.white,
  }
};
const randomImages = [
  require('./critters/bunny.png'),
  require('./critters/critter.png'),
  require('./critters/hummingbird.jpg'),
  require('./critters/owl.png'),
  require('./critters/pig.png'),
  require('./critters/tiger.jpg'),
];

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      active: 'list'
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 30,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" color="#248700" />
      </View>
    );
  };
  renderItem(data) {
    let { item, index } = data;
    let image = randomImages[Math.floor(Math.random()*randomImages.length)];
    return (
      <TouchableOpacity style={styles.touchableList} >
      <View style={styles.itemBlock}>
        <Image source={image} style={styles.itemImage}/>
        <View style={styles.itemMeta}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.detail}>{item.username}</Text>
          <Text style={styles.detail}>{item.company.name}</Text>
          <Text style={styles.detail}>{item.website}</Text>
          <Text style={styles.detail}>{item.phone}</Text>
        </View>
      </View>
      </TouchableOpacity>
    ) 
  }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
      <View style={{ flex: 1}}>
      <BottomNavigation active={this.state.active} hidden={false} style={{container: {backgroundColor: "#4B286D"}}} >
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
       <FlatList contentContainerStyle={styles.list}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          stickyHeaderIndices={[0]}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        /> 
        </View>
        </ThemeContext.Provider>
    );
  }
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 20,
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
    color: "#4B286D"
  }
});

export default ListScreen;
