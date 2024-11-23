import React, { useLayoutEffect, useRef, useState } from 'react';
import DropShadow from "react-native-drop-shadow";  
import { StyleSheet, ImageBackground, Image, Pressable, StyleProp, ViewStyle } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { shadow } from 'react-native-paper';

import Card from '@/components/Card';


export default function ExplanationContent({ play, sumandos, boxStyles}: { play: string, sumandos: {card:{suit: string, value: number}|null, points:number}[],boxStyles?: StyleProp<ViewStyle>}) {

    const ExplanationText = (playName: string) => {
        console.log(playName)
        switch (playName.play) {
            case "ENVIDO_PALOSDISTINTOS":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Envido con palos distintos:</Text> Se cuenta solo la carta mas alta. En este caso:
                        </Text>)
            break;
            case "ENVIDO_2MISMOPALO":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Envido con dos cartas del mismo palo:</Text> Se suman los puntos de estas cartas mas 20. En este caso:
                        </Text>)
            break;
            case "ENVIDO_1PIEZA":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Envido con una pieza:</Text> Se suman los puntos de la pieza mas puntos de la 2da carta mas alta. En este caso:
                        </Text>)
            break;
            case "FLOR_3MISMOPALO":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Flor de 3 de tres del mismo palo:</Text> Se suman los puntos de las tres cartas mas 20. En este caso:
                        </Text>)
            break;
            case "FLOR_1PIEZA_2MISMOPALO":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Flor de 1 pieza y dos del mismo palo:</Text> Se suman los puntos de la pieza con los puntos de las otras cartas. En este caso:
                    </Text>)
            break;
            case "FLOR_2PIEZAS":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Flor de 2 piezas:</Text> Se suman los puntos de la pieza mas alta con la unidad de los ptos de la otra pieza mas los ptos de la ultima carta. En este caso:
                    </Text>)
            break;
            case "FLOR_3PIEZAS":
                return (
                    <Text style={[styles.introText]}><Text style={[styles.introText,{fontWeight:"bold"}]}>Flor de 3 piezas:</Text> Se suman los puntos de la pieza mas alta con las unidades de los ptos de las otras piezas. En este caso:
                    </Text>)
            break;
        
            default:
                return (
                    <Text style={[styles.introText]}>ERROR
                    </Text>)
                break;
        }
    }

    const styles = StyleSheet.create({
        wrapper: {
            //backgroundColor:"rgba(255,120,0,0.5)",
            width: "100%",
            height: "80%",
            flexDirection:"column",
            marginTop: 20
        },
        introText:{
            color: "#000",
            fontSize: 15,
            //fontFamily: "Sono",
            marginBottom:10,
            //height:"30%"
        },
        sumContainer:{
            //backgroundColor:"rgba(255,0,0,0.5)",
            flexGrow: 1,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"flex-start",
            width: "100%",
            height: "80%",
            marginTop:10
        },
        sumTermsContainer:{
            height: "100%",
            width: "80%",
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
            //backgroundColor:"rgba(255,0,0,0.5)",

        },
        sumTermContainer:{
            height: "100%",
            width: "20%",
            flexDirection: "column",
            justifyContent: "space-around",
            //backgroundColor:"rgba(255,0,0,0.5)",
        },
        sumCardContainer: {
            width: "100%",
            height: "60%",
        },
        sumText:{
            fontSize:25,
            margin:5,
            color:"#000",
            alignSelf:"baseline"
        }
      })

    const SumTerm = ({card,points}:{card:{suit: string, value: number}|null, points:number}) => {
        
        if (card != null){
            return (
            <View style={[styles.sumTermContainer]}>
                <Card suit={card.suit} value={card.value} cardIndex={1} editing={false} muestra={false} pieza={false} mata={false} disableAnimations={true} boxStyles={styles.sumCardContainer} textStyles={{fontSize: 15}}></Card>
                <Text style={[styles.introText,{fontSize: 20,textAlign:"center",alignSelf:"center", paddingTop:10}]}>{points}</Text>
                <Text style={[styles.introText,{fontSize: 16,textAlign:"center",alignSelf:"center"}]}>punto{points == 1?"":'s'}</Text>
            </View>)
        }else{
            return (
                <View style={[styles.sumTermContainer,{justifyContent:"flex-start"}]}>
                    <View style={[styles.sumCardContainer]}>
                        <Text style={[styles.introText,{fontSize: 20,textAlign:"center",alignSelf:"center", paddingTop:10}]}>{points}</Text>
                        <Text style={[styles.introText,{fontSize: 16,textAlign:"center",alignSelf:"center"}]}>punto{points == 1?"":'s'}</Text>
                    </View>
                    <View style={{height: "40%"}}></View>
                </View>)
        }
    }
    return (
    <View style={[styles.wrapper,boxStyles]}>
        <ExplanationText play={play}></ExplanationText>
        <View style={[styles.sumContainer]}>
            <View style={[styles.sumTermsContainer]}>
                <SumTerm card={sumandos[0].card} points={sumandos[0].points}></SumTerm>
                {sumandos[1] && <Text style={styles.sumText}>+</Text>}
                {sumandos[1] && <SumTerm card={sumandos[1].card} points={sumandos[1].points}></SumTerm>}
                {sumandos[2] && <Text style={styles.sumText}>+</Text>}
                {sumandos[2] && <SumTerm card={sumandos[2].card} points={sumandos[2].points}></SumTerm>}
                {sumandos[3] && <Text style={styles.sumText}>+</Text>}
                {sumandos[3] && <SumTerm card={sumandos[3].card} points={sumandos[3].points}></SumTerm>}
            </View>
            <Text style={styles.sumText}>= {sumandos.map((s)=>s.points).reduce((prev,curr)=> prev+curr,0)}</Text>
        </View>
    </View>
    )
}


;
  