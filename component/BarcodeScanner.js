import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MyButton from './MyButton';

export default function MyBarcodeScanner({scanValue ,setScanValue,closeScan}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [value, setValue] = useState({type:undefined,data:undefined});

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanValue({type:type,data:data});
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && 
        <>
          <Text style={{flexDirection: 'column',justifyContent: "center", alignItems: "center",backgroundColor: "#747574",margin:5,padding:5}}>{scanValue.type} - {scanValue.data}</Text>
          <MyButton text="Accept Value" onPress={() => closeScan()} style={{opacity:0.5}} ></MyButton>
          <MyButton text='Tap to Scan Again' onPress={() => setScanned(false)}  style={{opacity:0.5}}  />
        </>
      }
      <MyButton text="Close" onPress={() => { setScanValue({type:undefined,data:undefined});closeScan()}} style={styles.bottomButton} ></MyButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bottomButton : 
    {
        opacity:0.5,
        position:"absolute",
        right:10,
        left:10,
        bottom:30
    }
});
