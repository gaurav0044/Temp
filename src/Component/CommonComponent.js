// This file is using comman component for reusibility 
import React from 'react'
import { TouchableOpacity,View, Text, Modal, StyleSheet, Dimensions,Alert } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import {strings} from '../Constant/String'
import {colors} from '../Constant/Colors'
let isTablet = DeviceInfo.isTablet();
const { height, width } = Dimensions.get("window")
export const ImageSelectionView = props => {
    return (
        <Modal onRequestClose={props.onRequestClose} transparent={true} visible={props.visible}>
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.outerView, { backgroundColor: "rgba(52, 52, 52, 0.5)" }]}
                onPress={props.onPressOuterView} />
            <View style={styles.calView}>
                <View style={styles.calView1}>
                    <View style={styles.View0}>
                        <Text style={styles.Text_header}>{strings.ADDPHOTO}</Text>
                        <View style={styles.View2} />
                        <TouchableOpacity activeOpacity={0.5} style={styles.Text1} onPress={props.onpressCamera}>
                            <Text style={styles.Text1}>{strings.TAKEPHOTO}</Text>
                        </TouchableOpacity>
                        <View style={styles.View1} />
                        <TouchableOpacity activeOpacity={0.5} style={styles.Text1} onPress={props.onpressGallery}>
                            <Text style={styles.Text1}>{strings.CHOOSEROMALLERY}</Text>
                        </TouchableOpacity>
                        <View style={styles.View1} />
                        <TouchableOpacity activeOpacity={0.5} style={styles.Text1} onPress={props.onpressCancel}>
                            <Text style={styles.Text1}>{strings.CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
//  This is the style for modal 
const styles = StyleSheet.create({
    outerView: {
        justifyContent: 'center',
        flex: 1
    },
    calView: {
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        position: 'absolute',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: height / 3,
        width: isTablet ? width - 70 : width - 30

    },
    calView1: {
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 15,
        borderColor: colors.BLUE,
        borderWidth: 3
    },
    View0: {
        alignItems: "center",
        alignSelf: "center",
        padding: 10
    },
    Text_header: {
        fontSize: isTablet ? 26 : 18,
        color: colors.BLACK,
        textAlign: 'center',
        marginTop: 5
    },
    View2: {
        height: isTablet ? 2 : 1.5,
        backgroundColor: colors.BLUE,
        width: isTablet ? width - 70 : width - 30,
        marginTop: 12,
        marginBottom: 12
    },
    Text1: {
        fontSize: isTablet ? 24 : 16,
        color: colors.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    View1: {
        height: isTablet ? 2 : 1.5,
        backgroundColor: colors.BLUE,
        width: isTablet ? width - 190 : width - 80,
        marginBottom: isTablet ? 15 : 12,
        marginTop: 10
    },
})