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
import Flashcard from "../screens/tab/home/word/Flashcard";
import WordScreenDetail from "../screens/tab/home/word/WordScreenDetail";
import TestWord from "../screens/tab/home/word/TestWord";
import AddCalendar from "../screens/tab/home/AddCalendar";
import SelectQuestion from "../screens/tab/home/word/SelectQuestion";
import TestJoinWord from "../screens/tab/home/word/TestJoinWord";
import ExplainKanji from "../screens/tab/home/kanji/ExplainKanji";
import Calendar from "../screens/tab/home/Calendar";
import EditCalendar from "../screens/tab/home/EditCalendar";
import TestKanji from "../screens/tab/home/kanji/TestKanji";
import KanjiFlashcard from "../screens/tab/home/kanji/KanjiFlashcard";
import VocabularyScreen from "../screens/tab/home/VocabularyScreen";
import ListWordVocabulary from "../screens/tab/home/ListWordVocabulary";
import MoveVocabulary from "../screens/tab/home/MoveVocabulary";
import EditPost from "../screens/tab/contact/EditPost";
import AssetsComment from "../screens/tab/manage/AssetsComment";
import AssetsPost from "../screens/tab/manage/AssetsPost";
import ShareAll from "../screens/tab/home/word/ShareAll"; 
import ErrorScreen from "../screens/tab/contact/ErrorScreen";
import MemberScreen from "../screens/tab/manage/MemberScreen";
import WordLevel from "../screens/tab/home/word/WordLevel";
import ListAllWordLevel from "../screens/tab/home/word/ListAllWordLevel";
import GrammarTest from "../screens/tab/home/practice/GrammarTest";
import PracticeScreen from "../screens/tab/home/practice/PracticeScreen";
import PostUser from "../screens/tab/contact/PostUser";
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
            <Drawer.Screen name="Flashcard" component={Flashcard} />
            <Drawer.Screen name="WordScreenDetail" component={WordScreenDetail} />
            <Drawer.Screen name="TestWord" component={TestWord} />
            <Drawer.Screen name="AddCalendar" component={AddCalendar} />
            <Drawer.Screen name="SelectQuestion" component={SelectQuestion} />
            <Drawer.Screen name="TestJoinWord" component={TestJoinWord} />
            <Drawer.Screen name="ExplainKanji" component={ExplainKanji} />
            <Drawer.Screen name="Calendar" component={Calendar} />
            <Drawer.Screen name="EditCalendar" component={EditCalendar} />
            <Drawer.Screen name="TestKanji" component={TestKanji} />
            <Drawer.Screen name="KanjiFlashcard" component={KanjiFlashcard} />
            <Drawer.Screen name="VocabularyScreen" component={VocabularyScreen} />
            <Drawer.Screen name="ListWordVocabulary" component={ListWordVocabulary} />
            <Drawer.Screen name="MoveVocabulary" component={MoveVocabulary} />
            <Drawer.Screen name="EditPost" component={EditPost} />
            <Drawer.Screen name="AssetsComment" component={AssetsComment} />
            <Drawer.Screen name="AssetsPost" component={AssetsPost} />
            <Drawer.Screen name="ShareAll" component={ShareAll} />
            <Drawer.Screen name="ErrorScreen" component={ErrorScreen} />
            <Drawer.Screen name="MemberScreen" component={MemberScreen} />
            <Drawer.Screen name="WordLevel" component={WordLevel} />
            <Drawer.Screen name="ListAllWordLevel" component={ListAllWordLevel} />
            <Drawer.Screen name="GrammarTest" component={GrammarTest} />
            <Drawer.Screen name="PracticeScreen" component={PracticeScreen} />
            <Drawer.Screen name="PostUser" component={PostUser} />

        </Drawer.Navigator> 
    )
}
export default DrawerTab;