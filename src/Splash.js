// Splash file 
import React from 'react'
import {
    View
} from 'react-native'

class Splash extends React.Component{
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('Home')
        },2000)
    }
    render(){
        return(
            null
        )
    }
}

export default Splash