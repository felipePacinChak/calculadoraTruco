import React, { useLayoutEffect, useRef, useState } from 'react';
import DropShadow from "react-native-drop-shadow";  
import { StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import {Animated, Easing, useAnimatedValue} from 'react-native';

import Colors from '@/constants/Colors';
import { shadow } from 'react-native-paper';




export default function PlayResultPanel({ play, points}: { play: string, points: number}) {
    var panelOpacityAnim = 1//useAnimatedValue(0)
    var pointsValueAnim = 10//useAnimatedValue(10)
    
    const styles = StyleSheet.create({
        resultContainer:{
            marginTop: 20,
            backgroundColor: "#7A9E9F",
            justifyContent:"center",
            alignItems: "center",
            width: "100%",
            height: "10%",
            borderColor: "#555",
            borderWidth: 2,
            borderRadius: 15,
            elevation: 12,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 1,
            shadowRadius: 200,
            shadowOffset:{
                width: 0,
                height: 0
            }
          },
        innerText:{
          fontSize: 25,
          color: "#000",
          fontFamily: "Sono",
          fontWeight: "medium",
         }
      })

    /* useLayoutEffect(() => {
        panelOpacityAnim.setValue(0)
        Animated.timing(panelOpacityAnim, {
            toValue: 1,
            duration: 200,
            delay: 1400,
            useNativeDriver: true,
        }).start();
      }, [play,points]); */
    
    return (
    <Animated.View style={[styles.resultContainer,{opacity: panelOpacityAnim, }]}>
        <Text style={[styles.innerText]}>{play == "FLOR" ? "RICA FLOR" : "ENVIDO"} {points}</Text>
    </Animated.View>)
}


;
  