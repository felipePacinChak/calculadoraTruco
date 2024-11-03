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
    
    return (
    <View style={styles.inputContainer}>
    <View style={styles.inputPanelRow}>
      <Text>EDITAR {cardIndex == 0 ? "MUESTRA" : "MANO"}</Text>
    </View>
    <View style={styles.inputPanelRow}>
      <Pressable style={[styles.playSelectButton,{backgroundColor: selectedSuit == "Basto" ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedSuit("Basto")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>BASTO</Text>
      </Pressable>
      <Pressable style={[styles.playSelectButton,{backgroundColor: selectedSuit == "Copa" ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedSuit("Copa")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>COPA</Text>
      </Pressable>
      <Pressable style={[styles.playSelectButton,{backgroundColor: selectedSuit == "Oro" ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedSuit("Oro")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>ORO</Text>
      </Pressable>
      <Pressable style={[styles.playSelectButton,{backgroundColor: selectedSuit == "Espada" ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedSuit("Espada")}}>
        <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>ESPADA</Text>
      </Pressable>
    </View>
    <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 1 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(1)}}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>1</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 2 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(2)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>2</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 3 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(3)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>3</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 4 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(4)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>4</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 5 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(5)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>5</Text>
        </Pressable>
    </View>
    <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 6 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(6)}}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>6</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 7 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(7)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>7</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 10 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(10)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>10</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 11 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(11)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>11</Text>
        </Pressable>
        <Pressable style={[styles.playSelectButton,{backgroundColor: selectedValue == 12 ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{setSelectedValue(12)}}>
          <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>12</Text>
        </Pressable>
    </View>
    <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
      <Pressable style={[styles.playSelectButton,{backgroundColor: "#F66", marginTop:15}]} onPress={()=>{onSubmit(selectedSuit,selectedValue)}}>
        <Text style={{fontSize: 15, color: "#232", fontFamily: "Sono"}}>ACTUALIZAR CARTA</Text>
      </Pressable>
      <Pressable style={[styles.playSelectButton,{backgroundColor: "#F66", marginTop:15}]} onPress={()=>{onCancel()}}>
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
    playSelectButton:{
      padding: 10,
      backgroundColor: "rgba(66,135,245,0.7)",
      borderRadius: 10,
      maxHeight:100
    },
    inputContainer:{
      marginTop: 20,
      backgroundColor: "rgba(20,53,105,0.9)",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      paddingBottom: 15,
      borderColor: "#000",
      borderWidth: 5,
      borderRadius: 15,
    },
  });
  