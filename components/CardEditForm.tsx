import React, { useEffect, useState } from 'react';
import DropShadow from "react-native-drop-shadow";  
import { StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import './Card.css'

import Colors from '@/constants/Colors';
import { shadow } from 'react-native-paper';




export default function CardEditForm({ initialSuit, initialValue, cardIndex,  error, onSubmit, onCancel}: { initialSuit: string, initialValue: number, cardIndex:number , error: boolean, onSubmit: (newSuit:string, newValue:number) => void,  onCancel: () => void}) {
    var [selectedSuit,setSelectedSuit] = useState(initialSuit)
    var [selectedValue,setSelectedValue] = useState(initialValue)
    
    const buttonColors = (selected: boolean) => {
      return selected ? "rgba(109, 138, 139, 1)" : "rgba(130, 166, 167, 1)"
    }
    return (
    <View style={styles.inputContainer}>
    <View style={styles.inputPanelRow}>
      <Text style={{color:"#000", fontFamily:"Sono", fontSize:20}}>EDITAR {cardIndex == 0 ? "MUESTRA" : "MANO"}</Text>
    </View>
    <View style={styles.inputPanelRow}>
      <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedSuit == "Basto")}]} onPress={()=>{setSelectedSuit("Basto")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>BASTO</Text>
      </Pressable>
      <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedSuit == "Copa")}]} onPress={()=>{setSelectedSuit("Copa")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>COPA</Text>
      </Pressable>
      <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedSuit == "Oro")}]} onPress={()=>{setSelectedSuit("Oro")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>ORO</Text>
      </Pressable>
      <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedSuit == "Espada")}]} onPress={()=>{setSelectedSuit("Espada")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>ESPADA</Text>
      </Pressable>
    </View>
    <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 1)}]} onPress={()=>{setSelectedValue(1)}}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>1</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 2)}]} onPress={()=>{setSelectedValue(2)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>2</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 3)}]} onPress={()=>{setSelectedValue(3)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>3</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 4)}]} onPress={()=>{setSelectedValue(4)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>4</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 5)}]} onPress={()=>{setSelectedValue(5)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>5</Text>
        </Pressable>
    </View>
    <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 6)}]} onPress={()=>{setSelectedValue(6)}}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>6</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 7)}]} onPress={()=>{setSelectedValue(7)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>7</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 10)}]} onPress={()=>{setSelectedValue(10)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>10</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 11)}]} onPress={()=>{setSelectedValue(11)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>11</Text>
        </Pressable>
        <Pressable style={[styles.suitSelectButton,{backgroundColor: buttonColors(selectedValue == 12)}]} onPress={()=>{setSelectedValue(12)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>12</Text>
        </Pressable>
    </View>
    <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
      <Pressable style={[styles.suitSelectButton,{backgroundColor: "rgba(139, 122, 109, 1)", marginTop:15}]} onPress={()=>{onSubmit(selectedSuit,selectedValue)}}>
        <Text style={{fontSize: 15, color: "#232", fontFamily: "Sono"}}>ACTUALIZAR CARTA</Text>
      </Pressable>
      <Pressable style={[styles.suitSelectButton,{backgroundColor: "rgba(139, 122, 109, 1)", marginTop:15}]} onPress={()=>{onCancel()}}>
        <Text style={{fontSize: 15, color: "#232", fontFamily: "Sono"}}>CANCELAR</Text>
      </Pressable>
    </View>
    
  </View>)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding:20
    },
    inputPanelRow:{
      marginTop: 15,
      backgroundColor: "rgba(0,0,0,0)",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
    },
    suitSelectButton:{
      padding: 10,
      backgroundColor: "rgba(66,135,245,0.7)",
      borderRadius: 10,
      maxHeight:100
    },
    inputContainer:{
      marginTop: 20,
      backgroundColor: "#7A9E9F",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      paddingBottom: 15,
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 15,
    },
  });
  