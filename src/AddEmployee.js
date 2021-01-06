// This file is for adding the  employee details in the database 

import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Platform,
    StatusBar,
    BackHandler,
    NativeModules
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageSelectionView} from './Component/CommonComponent'
import TextInput from './Component/TextInput'
import {strings} from './Constant/String'
import {colors} from './Constant/Colors'
import {CommonStyle} from './Theme/Commonstyle'
let isTablet = DeviceInfo.isTablet();
const { width, height } = Dimensions.get('window')
class AddEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            employeeName: '',
            employeeEmail: '',
            userProfile: '',
            isModalImage: false,
        }
    }
    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }   
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }
    //This function is use to open Image picker
    ImagePickerView() {
        return ImagePicker.openPicker({
            width: 400,
            height: 400,
            compressImageQuality: 1,
            includeExif: true,
            mediaType: 'photo',
            compressImageMaxHeight: 500,
            compressImageMaxWidth: 500,
            cropping: true,
            cropperCircleOverlay: true
        })
    }
     //This function is use to open camara picker
    CameraPickerView() {
        return ImagePicker.openCamera({
            width: 400,
            height: 400,
            compressImageQuality: 1,
            mediaType: 'photo',
            includeExif: true,
            compressImageMaxHeight: 500,
            compressImageMaxWidth: 500,
            cropping: true,
            cropperCircleOverlay: true
        })
    }
      //This function is use to open camara to capture the image
    openCamera() {
        this.CameraPickerView()
            .then(async image => {
                console.log(image.path);
                this.setState({ userProfile: image.path, isModalImage: false })
                let path = image.path.split("/");
                const formData = new FormData();
                formData.append("profile",
                    {
                        uri: image.path,
                        type: image.mime,
                        name: Platform.OS == 'ios' ? path[path.length - 1] : path[path.length - 1],
                    })
            })
            .catch(e => {
                this.setState({ isModalImage: false })
                console.log("catch", e)
            })
    }
      //This function is use to open device gallary to choose image
    openGallery() {
        this.ImagePickerView()
            .then(async image => {
                console.log(image.path);
                this.setState({ userProfile: image.path, isModalImage: false })
                let path = image.path.split("/");
                const formData = new FormData();
                formData.append("profile",
                    {
                        uri: image.path,
                        type: image.mime,
                        name: Platform.OS == 'ios' ? path[path.length - 1] : path[path.length - 1],
                    })
            })
            .catch(e => {
                this.setState({ isModalImage: false })
                console.log("catch", e)
            })
    }
      //This function is use to show validation error
    callAlert=(msg,okpress)=>{
        Alert.alert(
           'Warning',
            msg,
            [
              { text: 'OK', onPress:okpress }
            ],
            { cancelable: false }
          )
    }
    //This function is use to save employee details with proper validation 
    btnSave(){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.userProfile.trim()==''){
            this.callAlert('Please select image')     
        }
        else if(this.state.employeeName.trim()==''){
            this.callAlert('Please enter name')
        }else if(this.state.employeeEmail.trim()==''){
            this.callAlert('Please enter email')
        }else if(!reg.test(this.state.employeeEmail)){
            this.callAlert('Please enter valid  email')
        }else{
           
            console.log(this.state.userProfile.toString(),"sss")
            if(Platform.OS == 'android'){
                NativeModules.CustomNative.insertEmployee(
                    this.state.employeeName,
                    this.state.employeeEmail,
                    this.state.userProfile
                )
              }else{
                var count  = 0;
                NativeModules.CustomNative.insertData(
                    this.state.employeeName,
                    this.state.employeeEmail,
                    this.state.userProfile
                )
              }
            this.props.navigation.navigate('Home')
        }
    }
    // This method is used to render the whole screen 
    render() {
        return (
            <View style={CommonStyle.container}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.WHITE} />
                <View style={CommonStyle.headerOuterView}>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity style={{ flex: 0.1,alignSelf:'center'}} onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('./Assets/back.png')} style={CommonStyle.headerImg} resizeMode='contain' />
                        </TouchableOpacity>
                        <Text style={CommonStyle.headerText}>{strings.ADDEMPLOYEE}</Text>
                    </View>
                </View>
                <KeyboardAwareScrollView
                    bounces={false}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={CommonStyle.keyboardInnerView}>
                        <TouchableOpacity onPress={() => this.setState({ isModalImage: true })}>
                            {
                                this.state.userProfile == '' ?
                                    <Image style={CommonStyle.imgStyle}
                                        resizeMode="contain"
                                        source={require('./Assets/add-user.png')} />
                                    :
                                    <Image style={CommonStyle.profileImg}
                                    resizeMode="contain"
                                    source={{uri:this.state.userProfile}} />

                            }
                        </TouchableOpacity>
                            <TextInput
                                placeholder='Enter Name'
                                keyboardType='email-address'
                                value={this.state.employeeName}
                                onChangeText={(val) => {
                                    this.setState({ employeeName: val })
                                }}
                                source={require('./Assets/username.png')} 
                                innerRef={r => {
                                    this.ename = r;
                                }}
                                onSubmitEditing={event => {
                                    event && this.email.focus();
                                }}
                                returnKeyLabel="next"
                                returnKeyType="next"
                            />
                            <TextInput
                                placeholder='Enter Email'
                                value={this.state.employeeEmail}
                                onChangeText={(val) => {
                                    this.setState({ employeeEmail: val })
                                }}
                                innerRef={r => {
                                   this.email = r;
                                }}
                                autoCapitalize='none'
                                source={require('./Assets/email.png')} 
                            />
                      
                        <TouchableOpacity style={CommonStyle.btnStyle} onPress={()=>this.btnSave()}>
                            <Text style={CommonStyle.btnText}>{strings.SAVE}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                <ImageSelectionView
                    visible={this.state.isModalImage}
                    onRequestClose={() => this.setState({ isModalImage: false })}
                    onPressOuterView={() => this.setState({ isModalImage: false })}
                    onpressCancel={() => this.setState({ isModalImage: false })}
                    onpressCamera={() => this.openCamera()}
                    onpressGallery={() => this.openGallery()}
                />
            </View>
        )
    }
}

export default AddEmployee