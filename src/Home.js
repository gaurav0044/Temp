
// This file is for showing the list of employees from the database in this design file 

import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StatusBar,
    BackHandler,
    NativeModules,
    Platform
} from 'react-native'
import DeviceInfo from 'react-native-device-info';
import {strings} from './Constant/String'
import {colors} from './Constant/Colors'
import {CommonStyle} from './Theme/Commonstyle'
let isTablet = DeviceInfo.isTablet();



class Home extends React.Component {
    constructor(props){
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
            empData:[]
        }
    }
    componentDidMount(){
      // This condition is use for getting the data from database (from native side)
      // Conditions are sepreated for both platform Android & iOS
        if(Platform.OS == 'ios'){
            NativeModules.CustomNative.ViewData(value=>{
                    if(value!="nill"){
                        this.setState({
                            empData: value
                        })
                    }
            })
        }else{
            NativeModules.CustomNative.ViewData((error) => {
              console.error(`Error found! ${error}`);
            },
            (sucess) => {
                if(sucess.length>0){
                    this.setState({
                        empData:sucess
                    })
                }
            });
        }
        this.props.navigation.addListener('focus',()=>{
            if(Platform.OS == 'ios'){
                NativeModules.CustomNative.ViewData(value=>{
                        if(value!="nill"){
                            this.setState({
                                empData: value
                            })
                        }
                })
            }else{
                console.log( NativeModules.CustomNative)
                NativeModules.CustomNative.ViewData((error) => {
                    console.error(`Error found! ${error}`);
                  },
                  (sucess) => {
                      if(sucess.length>0){
                          this.setState({
                              empData:sucess
                          })
                      }
                  });
            }
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }   
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }
    // This method is used to rennder the list of employees details 
    renderItem = ({ item, index }) => {
        console.log(item)
        return (
            <View  key={index} style={CommonStyle.flatListOuterView}> 
                <Image source={{uri:item.path}} style={CommonStyle.flatListImg}/>
                <View style={{marginLeft:15,alignSelf:'center'}}>
                <Text style={[CommonStyle.flatListText,{paddingVertical:5}]}>{Platform.OS == 'ios'?item.name:item.empName}</Text>
                <Text style={CommonStyle.flatListText}>{Platform.OS == 'ios'?item.email:item.empEmailId}</Text>
                </View>
            </View>
        )
    }
        // This method is used to render the whole screen 

    render() {
        return (
            <View style={CommonStyle.container}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.WHITE} />
                <View style={CommonStyle.headerOuterView}>
                    <View style={CommonStyle.headerInnerView}>
                        <Text style={CommonStyle.headerText}>{strings.HOME}</Text>
                        <TouchableOpacity style={{ flex: 0.1,alignSelf:'center' }} onPress={() => this.props.navigation.navigate('AddEmployee')}>
                            <Image source={require('./Assets/plus.png')} style={CommonStyle.addImg} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>
                
                {
                    this.state.empData.length > 0 ?
                        <FlatList
                            style={{ marginBottom: isTablet ? 30 : 15, marginTop: 15 }}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            data={this.state.empData}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <View style={CommonStyle.nodataView}>
                            <Text style={CommonStyle.noDataText}>{strings.NODATAFOUND}</Text>
                        </View>
                }

            </View>
        )
    }
}
export default Home