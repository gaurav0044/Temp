import React from 'react';
import { View, TextInput,StyleSheet,Image,Dimensions, Platform} from 'react-native';
const {width,height} = Dimensions.get('window')
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();
class DataViewComponent extends React.Component {
    render() {
      return (
        <View style={styles.textInputView}>
        <TextInput
            placeholder={this.props.placeholder}
            style={styles.textInputStyle}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            autoCapitalize={this.props.autoCapitalize}
            returnKeyLabel={this.props.returnKeyLabel}
            returnKeyType={this.props.returnKeyType}
            ref={this.props.innerRef}
            onSubmitEditing={this.props.onSubmitEditing}
            keyboardType={this.props.keyboardType}
        />
        <Image style={styles.textInputImg} resizeMode='contain' source={this.props.source} />
    </View>
      )
    }
  }
const DataView = React.forwardRef((props, ref) => {
    return (<DataViewComponent innerRef={ref} {...props} />);
});
export default DataView;
const styles = StyleSheet.create({
    textInputView: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: isTablet ? 15 : 10,
        flexDirection: 'row',
        marginTop: isTablet ? 30 : 20
    },
    textInputStyle: {
        paddingTop: Platform.OS=='ios' ? null : isTablet ? 5 :  0,
        paddingLeft: isTablet ? 20 : 10,
        paddingRight: isTablet ? 20 : 10,
        flex: 1,
        fontSize : isTablet ? 24 : 14,
        paddingVertical: Platform.OS =='ios' ?  isTablet ? 10 : 5 : isTablet ? 10 : 0,
    },
    textInputImg: {
        width: isTablet ? 30 : 20,
        height: isTablet ? 30 : 20,
        resizeMode: 'contain',
        flex: 0.1,
        marginRight: 7,
        alignSelf:'center'
    }

})