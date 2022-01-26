import React, {useEffect} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './Main';
import Profile from '../screens/user/Profile';
import HomePages from '../screens/Homepages';
import Language from '../screens/Language';
import DrawerContent from '../components/DrawerContent';
import HomeScreenDetail from "../screens/tab/home/HomeScreenDetail";
import Login from "../screens/user/Login";
import ChooseAnswer from "../screens/tab/home/ChooseAnswer";
import ResultScreen from "../screens/tab/home/ResultScreen";
import ExplainScreen from "../screens/tab/home/ExplainScreen";

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={Main} />
            <Drawer.Screen name="HomeDetail" component={HomeScreenDetail} />
            <Drawer.Screen name="ChooseAnswer" component={ChooseAnswer} />
            <Drawer.Screen name="ExplainScreen" component={ExplainScreen} />
            <Drawer.Screen name="ResultScreen" component={ResultScreen} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Homepages" component={HomePages} />
            <Drawer.Screen name="Language" component={Language} />
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator> 
    )
}
export default DrawerTab;