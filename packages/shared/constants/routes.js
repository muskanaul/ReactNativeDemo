import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ListScreen from '../screens/ListScreen';

const routes = {
  Home: {
    screen: HomeScreen,
    path: "/"
  }, 
  List: {
    screen: ListScreen,
    path: "/list"
  }, 
  Search: {
    screen: SearchScreen,
    path: "/search"
  }
};

export const initialRouteName = {
  initialRouteName: 'Home',
}
export default routes;