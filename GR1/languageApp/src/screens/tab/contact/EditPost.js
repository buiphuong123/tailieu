import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getListPostSuccess } from '../../../redux/actions/post.action';

const EditPost = ({ navigation, route }) => {
    const { item } = route.params;
    const [titleSearch, setTitleSearch] = useState(item.title);
    const [selectedChoose, setSelectedChoose] = useState(["Tất cả", "Học tiếng Nhật", "Du học Nhật Bản", "Việc làm tiếng Nhật", "Văn hóa Nhật Bản", "Góc chia sẻ", "Tìm bạn học", "Khác"]);
    const [chooseSelected, setChooseSelected] = useState(selectedChoose.findIndex(e => e === item.theme));
    const richText = React.useRef();
    const [contentHTML, setContentHTML] = useState(item.content);
    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataP, setDataP] = useState(listPost);
    const [data, setData] = useState({ html: `` });
    useEffect(() => {
        console.log('item ben edit la', item);
        setTitleSearch(item.title);
        setChooseSelected(selectedChoose.findIndex(e => e === item.theme));
        setContentHTML(item.content);
    }, [item]);
    const onEditorInitialized = () => {
        console.log('initalised');
    }
    // const [update, setUpdate] = useState(item.content);
    
    const handleChange = (html) => {
        console.log(html);
    }

    const editP = () => {
        var time = new Date();
        setData({ ...data });
        const objIndex = dataP.findIndex(e=> e._id === item._id);
        if(dataP[objIndex].title === titleSearch && dataP[objIndex].content.html === data.html && dataP[objIndex].theme === selectedChoose[chooseSelected]) {
            return;
        }
        else {
            dataP[objIndex].title = titleSearch;
            dataP[objIndex].content = data;
            [objIndex].theme = selectedChoose[chooseSelected];
            [objIndex].time = time
            setDataP({...dataP});
            getListPostSuccess(dataP);
            navigation.navigate.goBack();
            axios.post('http://192.168.1.72:3002/language/editPost', {
            "id": item._id,
            "title": titleSearch,
            "theme": selectedChoose[chooseSelected],
            "content": data,

        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log( response.data);
            })

        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-between' }}>
                    <AntDesign name={'close'} size={20} color={'#fff'}
                        onPress={() => navigation.goBack()}
                        style={{ paddingTop: 15, paddingRight: 20, marginLeft: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => editP()}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#f2f2f2' }}>
                    <TextInput
                        style={{ marginLeft: 10, fontSize: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e6e6', margin: 10 }}
                        placeholder="Nhập tiêu đề bài viết"
                        value={titleSearch}
                        onChangeText={text => setTitleSearch(text)}
                    />

                </View>
                <View style={{ padding: 10 }}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, minHeight: 200 }}>
                            <Text>Description:</Text>
                            <Text>{contentHTML.html}</Text>
                            <RichEditor
                                ref={richText}
                                placeholder="Write your cool content here :)"
                                androidHardwareAccelerationDisabled={true}
                                initialContentHTML={contentHTML.html}
                                initialFocus={true}
                                editorInitializedCallback={() => onEditorInitialized()}
                                onChange={descriptionText => {
                                    data.html = descriptionText;
                                    setData({ ...data });
                                }}
                            />


                        </KeyboardAvoidingView>
                    </ScrollView>
                    <RichToolbar
                        editor={richText}
                        // onPressAddImage={insertImage}
                        onPressAddImage={() => {
                            ImagePicker.openPicker({
                                width: 100,
                                height: 100,
                                cropping: true,
                            }).then((image) => {
                                var photo = {
                                    uri: image.path,
                                    type: image.mime,
                                    name: image.path.split('/').pop(),
                                };
                                const formData = new FormData();
                                formData.append("file", photo);
                                formData.append("upload_preset", "kbihuaf8");
                                axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((response) => {
                                    richText.current?.insertImage(
                                        response.data.url,
                                        // 'https://res.cloudinary.com/languageword/image/upload/v1653376930/gwvumnesyeuvzconqntt.jpg'
                                    );
                                });
                            }).catch((error) => {
                                console.log(`loi ${error}`);
                            });
                        }}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertImage,
                            actions.insertLink,
                            actions.insertText,
                            actions.insertVideo,
                            'customAction',
                        ]}

                        iconMap={{
                            [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>),

                        }}

                    />

                </View>

                <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
                    <Text style={{ textDecorationLine: 'underline' }}>Câu hỏi của bạn thuộc chủ để </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        {
                            selectedChoose.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} onPress={() => setChooseSelected(key)} style={{ width: '45%', alignItems: 'center', marginLeft: 5, marginTop: 5, justifyContent: 'center', padding: 10, backgroundColor: key === chooseSelected ? '#0000cc' : '#fff' }}>
                                        <Text style={{ color: key === chooseSelected ? '#fff' : 'black' }}>{element}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </View>
        </View>
    )
}

export default EditPost;