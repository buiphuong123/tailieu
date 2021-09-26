import React, {useEffect} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './Main';
import Profile from '../screens/user/Profile';
import HomePages from '../screens/Homepages';
import Language from '../screens/Language';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={Main} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Homepages" component={HomePages} />
            <Drawer.Screen name="Language" component={Language} />
        </Drawer.Navigator> 
    )
}
export default DrawerTab;