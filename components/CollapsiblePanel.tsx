import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DropShadow from "react-native-drop-shadow";  
import { StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import Animated, {
    useAnimatedStyle,
    withDelay,
    useSharedValue,
    withTiming,
  } from 'react-native-reanimated';

import Colors from '@/constants/Colors';
import { shadow } from 'react-native-paper';
import ExplanationContent from '@/components/ExplanationContent';




export default function CollapsiblePanel({title, children}: {title: string, children: React.ReactNode}) {
    
    const [collapsed,setCollapsed] = useState(true)
    const opacity = useSharedValue(1)



    const styles = StyleSheet.create({
        wrapper:{
            width: "100%",
            height: "40%",
            flex: 1,
            marginTop: 20,
        },
        pressableTitle:{
            
            backgroundColor: "#2F4F4F",
            flexDirection: "row",
            justifyContent:"space-around",
            alignItems: "stretch",
            width: "100%",
            height: "12%",
            borderColor: "#555",
            borderWidth: 2,
            borderRadius: 15,
            elevation: 12,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 1,
            shadowRadius: 20,
            shadowOffset:{
                width: 0,
                height: 0
            },
            zIndex: 1,
            
          },
        collapsibleContainer:{
            width: "100%",
            backgroundColor: "rgba(175, 203, 203,0.7)",
            marginTop: -20,
            padding:5,
            borderBottomLeftRadius:15,
            borderBottomRightRadius:15,
            zIndex: 0
        },
        titleText:{
          fontSize: 20,
          color: "#fff",
          fontFamily: "Sono",
          fontWeight: "medium",
          letterSpacing: 7
         },
         explanationText:{
            fontSize: 20,
            color: "#000",
            fontFamily: "Sono",
            fontWeight: "medium",
            marginTop: 30
         }

      })
    
    const animatedStyleCollapsible = useAnimatedStyle(()=>{
        const animatedHeight = collapsed ?  withDelay(200,withTiming(0,{duration:300})) : withTiming(250,{duration:500})
        return {
            height: animatedHeight
        }
    })
    const animatedStyleContent = useAnimatedStyle(()=>{
        const animatedOpacity = collapsed ? withTiming(0,{duration:200}) : withDelay(500,withTiming(1,{duration:300}))
        return {
            opacity: animatedOpacity
        }
    })

    useEffect(()=>{
        opacity.value = 0
        setCollapsed(true)
        setTimeout(()=>{
            opacity.value = withTiming(1,{
                duration: 500
            })
        },1700)
        
    },[children])

    const handlePress = () => {
        setCollapsed(!collapsed)
    }
    
    return (
        <Animated.View style={[styles.wrapper,{
            opacity: opacity
        }]}>
            <Pressable style={styles.pressableTitle} onPress={handlePress}>
                <Text style={[styles.titleText]}>{title}</Text>
            </Pressable>
            <Animated.View style={[styles.collapsibleContainer,animatedStyleCollapsible]}>
                <Animated.View style={animatedStyleContent}>
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}


;
  