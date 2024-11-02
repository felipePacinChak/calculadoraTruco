import React, { useEffect } from 'react';
import DropShadow from "react-native-drop-shadow";  
import { StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import icon_basto from '../assets/icon_basto.png'
import icon_copa from '../assets/icon_copa.png'
import icon_oro from '../assets/icon_oro.png'
import icon_espada from '../assets/icon_espada.png'
import './Card.css'

import Colors from '@/constants/Colors';
import { shadow } from 'react-native-paper';

const suits : {name: string, icon:string}[] = [
    {
        name: "Basto",
        icon: icon_basto
    },
    {
        name: "Copa",
        icon: icon_copa
    },
    {
        name: "Oro",
        icon: icon_oro
    },
    {
        name: "Espada",
        icon: icon_espada
    },
    ]

const image = {uri: 'https://ih1.redbubble.net/image.482914902.6331/farp,small,wall_ texture,product,750x1000.u2.jpg'};


export default function Card({ suit, value,cardIndex, editing, muestra, pieza, mata, onCardPulse }: { suit: string, value: number ,cardIndex:number, editing:boolean, muestra: boolean, pieza: boolean, mata: boolean,onCardPulse:(cardIndex:number)=>void}) {
    const suitElements = suits.filter((val) => val.name == suit)
    var suitImageSrc = suitElements.length > 0 ? suitElements[0].icon : ""
    var bottomText = [muestra,pieza,mata].some((val)=>val) ? ["Muestra", "Pieza", "Mata"][[muestra,pieza,mata].findIndex((val) => val)] : ""
    //console.log(suitImageSrc)
    const styles = StyleSheet.create({
        cardContainer: {
            backgroundColor: muestra ? '#fcfb92' : "#fff",
            borderColor: pieza ? "#fcba03" : mata ? "#30a9ff" : editing? "#F00" : "#000",
            borderWidth: 2,
            borderRadius:10,
            alignItems: "center",
            elevation: 12,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 1,
            shadowRadius: 20,
            shadowOffset:{
                width: 0,
                height: 0
            },
            padding:5,
            height: "100%",
            width: "27%",
        },

        cardNumber: {
          alignSelf: "flex-start",
          fontFamily: "Sono",
          fontSize: 30,
          color: "#000",
        },
        cardSuit: {
          width: "80%",
          height: "60%",
          backgroundColor: " red",
          resizeMode: "contain",
          paddingBottom: 5
        },
        bottomText: {
            fontSize: 12,
            color: "#000",
            fontWeight: "bold",
            fontStyle: "italic",   
        },
});
    
    return (
        /* <DropShadow> */
            <Pressable style={styles.cardContainer} onPress={()=>{onCardPulse(cardIndex)}}>
                <Text style={styles.cardNumber}>{value}</Text>
                <Image source={suitImageSrc} style={styles.cardSuit}></Image>
                <Text style={styles.bottomText} >{bottomText}</Text>
            </Pressable>
        /* </DropShadow> */
    );
}


