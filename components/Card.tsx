import React, { useLayoutEffect } from 'react';
import {Animated, Easing, StyleProp, TextStyle, useAnimatedValue, ViewStyle} from 'react-native';
import { StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import { Text, View } from './Themed';
import './Card.css'

const suits : {name: string, icon:any}[] = [
    {
        name: "Basto",
        icon: require('../assets/icon_basto.png')
    },
    {
        name: "Copa",
        icon:  require('../assets/icon_copa.png')
    },
    {
        name: "Oro",
        icon:  require('../assets/icon_oro.png')
    },
    {
        name: "Espada",
        icon:  require('../assets/icon_espada.png')
    },
]


export default function Card({ suit, value,  cardIndex, editing, muestra, pieza, mata, disableAnimations = false, boxStyles,textStyles }: 
    { suit: string, value: number , cardIndex: number ,editing:boolean, muestra: boolean, pieza: boolean, mata: boolean,disableAnimations: boolean,boxStyles?: StyleProp<ViewStyle>,textStyles?: StyleProp<TextStyle>}) {


    const suitElements = suits.filter((val) => val.name == suit)
    var suitImageSrc = suitElements.length > 0 ? suitElements[0].icon : ""
    var bottomText = [muestra,pieza,mata].some((val)=>val) ? ["Muestra", "Pieza", "Mata"][[muestra,pieza,mata].findIndex((val) => val)] : ""
    //console.log(suitImageSrc)
    var positionOffsetXAnim = 0//useAnimatedValue(disableAnimations ? 0 : 5000)
    var positionOffsetYAnim = 0//useAnimatedValue(disableAnimations ? 0 : -5000)
    const styles = StyleSheet.create({
        cardTouchContainer: {
            height: "100%",
            width: "100%",
        },
        cardContainer:{
            width: "100%",
            height: "100%",
            backgroundColor: muestra ? '#F3D797' : "#F4F1E6",
            borderColor: editing? "#F00" : pieza ? "#fcba03" : mata ? "#30a9ff" : "#000",
            borderWidth: 2,
            borderRadius:10,
            alignItems: "center",
            elevation: 24,
            shadowColor: "rgba(0,0,0,1)",
            shadowRadius: 20,
            shadowOffset:{
                width: 0,
                height: 12
            },
            padding:5,
        },
        cardNumber: {
          alignSelf: "flex-start",
          fontFamily: "Sono",
          fontSize: 30,
          color: "#000",
        },
        cardSuit: {
          width: "80%",
          height: "50%",
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

    /* useLayoutEffect(() => {
        if(!disableAnimations){
            positionOffsetXAnim.setValue(-5000)
            positionOffsetYAnim.setValue(5000)
            Animated.parallel([
                Animated.timing(positionOffsetXAnim, {
                    toValue: 0,
                    duration: 350,
                    delay: 350*cardIndex,
                    useNativeDriver: true,
                  }),
                Animated.timing(positionOffsetYAnim, {
                  toValue: 0,
                  duration: 350,
                  delay: 350*cardIndex,
                  useNativeDriver: true,
                }) 
            ]).start();
        }
      }, [suit,value]);
     */
    return (
        /* <DropShadow> */
                <Animated.View style={[styles.cardContainer,boxStyles,{transform:[{translateX:positionOffsetXAnim},{translateY:positionOffsetYAnim}]
                }]}>
                    <Text style={[styles.cardNumber,textStyles]}>{value}</Text>
                    <Image source={suitImageSrc} style={styles.cardSuit}></Image>
                    <Text style={styles.bottomText} >{bottomText}</Text>
                </Animated.View>
        /* </DropShadow> */
    );
}


