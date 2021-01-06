// This contain the global styles 
import { StyleSheet, Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import { colors } from '../Constant/Colors';
let isTablet = DeviceInfo.isTablet()
export const CommonStyle = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: colors.WHITE
    },
    headerOuterView:{
        marginTop: Platform.OS=='ios' ?DeviceInfo.hasNotch() ? 60 : isTablet? 60 : 30 :20 ,
       
    },
    headerInnerView:{
        flexDirection: 'row', 
        alignSelf:'center',
        width : isTablet ?  width-60 : width-40
    },
    headerText:{
        textAlign: 'left', 
        flex: 1, 
        fontSize: isTablet ? 26 : 18 ,
        fontWeight : 'bold',
    },
    flatListOuterView:{
        width: isTablet ? width-60 : width - 40,
        alignSelf:'center',
        paddingVertical:12,
        marginTop: isTablet ? 20 : 15,
        flexDirection:'row',
        borderRadius:10,
        borderWidth:1
    },
    flatListImg:{
        width: isTablet ? 100 : 50,
        height: isTablet ? 100 : 50,
        borderRadius : isTablet ? 100/2 : 50/2,
        marginLeft: isTablet ? 15 : 10
    },
    flatListText:{
        fontSize: isTablet ? 24 : 14,
        width : isTablet ? (width-60)/1.4 : (width-40)/1.4,
    },
    addImg:{
        width: isTablet ? 25 : 15, 
        height: isTablet ? 25 :  15, 
        resizeMode: 'contain', 
        alignSelf: 'flex-end', 
        marginTop: 3
    },
    keyboardInnerView: {
        marginTop: 40,
        width: isTablet ? width - 60 : width - 40,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    btnStyle:{
        marginTop: isTablet ? 30 : 20, 
        alignSelf: 'center', 
        backgroundColor: colors.BLUE, 
        width: isTablet ? width - 60 : width - 40, 
        borderRadius: 10 
    },
    btnText:{
        padding: isTablet ? 20 : 15, 
        textAlign: 'center',
        fontSize : isTablet ? 24 : 14,
        color : colors.WHITE,
        fontWeight:'bold'
    },
    profileImg:{
        height: isTablet ? 200 : 100,
        width: isTablet ? 200 : 100,
        borderRadius: 100/2,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    headerImg:{
        width: isTablet ? 35 : 20, 
        height: isTablet ? 35 : 20, 
        resizeMode: 'contain',
        alignSelf:'center',
    },
    imgStyle:{
        height: isTablet ? 200 : 100,
        width: isTablet ? 200 : 100,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    noDataText:{

        fontSize: isTablet == true ? 33 : 20,
        textAlign:'center'
       

    },
    nodataView:{

        color: colors.BLACK,
        marginTop: height / 3,

    }

})

