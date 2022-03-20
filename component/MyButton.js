import { StyleSheet, TouchableOpacity,Text } from "react-native";

export default function MyButton({text,onPress,style,textStyle}) {
    return (
        <TouchableOpacity  onPress={onPress} style={{...styles.buttonstyle,...style}} ><Text style={{...styles.textstyle,...textStyle}}>{text}</Text></TouchableOpacity>
    );
}
const styles = StyleSheet.create({
      buttonstyle: {
      margin:15,
      padding : 10,
      borderRadius: Math.floor(7),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#747574",
      zIndex: 2,
    },
    textstyle:{
        color: "#000",
    }
  });