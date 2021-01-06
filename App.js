/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// This is the main Route file 
import React from 'react';
import Router from "./src/Router";
class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
   return ( <Router/>)
  }
}

export default App;
