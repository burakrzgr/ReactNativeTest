import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyBarcodeScanner from './component/BarcodeScanner';
import ExpoCamera from './component/ExpoCamera';
import MyButton from './component/MyButton';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  [activity, setActivity] = useState(0);
  [scanValue, setScanValue] = useState({type:undefined,data:undefined});
  return (
    <View style={styles.container}>
      {activity == 0 ?
        <>
          <Text style={styles.text}>We are doing some camera work!</Text>
          <MyButton onPress={() => setActivity(1)} text="Click Me! I will open camera!"></MyButton>
          <MyButton onPress={() => setActivity(2)} text="I will scan something!" style={{ backgroundColor: "#c4f574"}} textStyle={{color:"#5e9220"}}></MyButton>
          {scanValue.data ? 
            <>
              <Text style={styles.text}>I Read : {scanValue.data}</Text> 
              <MyButton onPress={() => Clipboard.setString(scanValue.data)} text="Copy to Clipboard" style={{ backgroundColor: "#ef552d"}} textStyle={{color:"#ffffff"}}></MyButton>
            </>:<></>}
        </> : <></>}
      {activity === 1 ? <ExpoCamera closeCamera={() => setActivity(0)}></ExpoCamera> : <></>}
      {activity === 2 ? <MyBarcodeScanner scanValue={scanValue} setScanValue={setScanValue} closeScan={() => setActivity(0)}></MyBarcodeScanner>: <></>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    marginTop:20,
    marginBottom:20,
    top:10,
    bottom:10
  },
  cameraButton: {
    top: 10,
    left: 0,
    padding: 8,
    borderRadius: Math.floor(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#747574",
    opacity: 0.7,
    zIndex: 2,
  }
});