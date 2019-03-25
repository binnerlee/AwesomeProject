import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../pages/Home/index';
import LinksScreen from '../pages/Links/index';
import SettingsScreen from '../pages/Settings/index';
import WebViewScreen from '../pages/WebViewTest/index';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
};

const LinksStack = createStackNavigator({
    Links: LinksScreen,
});

LinksStack.navigationOptions = {
    tabBarLabel: 'Links'
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings'
};

const WebViewStack = createStackNavigator({
    WebViewTest: WebViewScreen
})

WebViewStack.navigationOptions = {
    tabBarLabel: 'WebViewTest'
}

export default createBottomTabNavigator({
    WebViewStack,
    HomeStack,
    LinksStack,
    SettingsStack
});
