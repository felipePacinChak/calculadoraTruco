import { StyleSheet, TouchableOpacity, ImageBackground, Pressable,TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Card from '@/components/Card';
import "./index.css"
import { useState } from "react";

interface Cards {
  cards:{
    muestra: { suit:string, value:number },
    mano: { suit:string, value:number, pieza: boolean, mata:boolean}[],
  },
  points:{
    envido: number,
    flor: number
  }
}
interface Game {
  finished: boolean,
  won: boolean
}
const appBackground = {uri : "https://media.istockphoto.com/id/1068449720/photo/linen-fabric-texture.jpg?s=612x612&w=0&k=20&c=0FlTi7Nj_R5VEJi2RRtHY6wl53uJjk5UjgNEalqLLzg="}
export default function TabOneScreen() {
  
  
  var currentCards : Cards = {
    cards:{
      muestra: { suit:"Oro", value:10 },
      mano: [{suit: "Basto", value: 10, pieza: false, mata:false}, {suit: "Copa", value: 6, pieza: false, mata:false}, {suit: "Espada", value: 4, pieza: false, mata:false}]
    },
    points:{
      envido: -1,
      flor: 20
    }
  }
  const [displayedCards,setDisplayedCards] = useState({
    cards:{
      muestra: { suit:"Oro", value:10 },
      mano: [{suit: "Basto", value: 10, pieza: false, mata:false}, {suit: "Copa", value: 6, pieza: false, mata:false}, {suit: "Espada", value: 4, pieza: false, mata:false}]
    },
    points:{
      envido: -1,
      flor: 20
    }
  })
  var currentGame = {
    selectedPlay: "FLOR",
    submittedPoints: 20,
    finished: false,
    won: false
  }
  const [displayedGame,setDisplayedGame] = useState({
    finished: false,
    won: false
  })
  var currentPlayType = "FLOR"
  var currentPoints = 10
  const [displayedPlayType,setDisplayedPlayType] = useState("FLOR")
  const [displayedPoints,setDisplayedPoints] = useState(10)
  

  

  const esPieza = (carta: { suit:string, value:number }) => {
    const muestra = currentCards.cards.muestra
    const piezaValues = [2,4,5,11,10]
    return (carta.suit == muestra.suit) && (piezaValues.includes(carta.value) || (piezaValues.includes(muestra.value) && carta.value == 12))
  }

  const esMata = (carta: { suit:string, value:number }) => {
    const matas = [{ suit:"Espada", value:1 },{ suit:"Basto", value:1 },{ suit:"Espada", value:7 },{ suit:"Oro", value:7 }]
    return matas.some((mata) => mata.suit == carta.suit && mata.value == carta.value)
  }

  const puntosCarta = (carta: { suit:string, value:number, pieza: boolean }) => {
    if(carta.pieza){
      const puntosPiezas = [0,0,30,0,29,28,0,0,0,0,27,27]
      return carta.value != 12 ? puntosPiezas[carta.value] : puntosPiezas[currentCards.cards.muestra.value]
    }else if([10,11,12].includes(carta.value)){
      return 0
    }
    return carta.value
  }

  const calcularFlor = () => {
    const piezas = currentCards.cards.mano.filter((card) => card.pieza)
    const comunes = currentCards.cards.mano.filter((card) => !card.pieza)

    const distribucionPorPaloCartasComunes = [0,0,0,0]

    for (let i = 0; i < comunes.length; i++) {
      ["Basto","Espada","Copa","Oro"].forEach((value,index) => {
        if (comunes[i].suit == value) {
          distribucionPorPaloCartasComunes[index] += 1
        }
      })
    }
    //console.log(mano,piezas.length + Math.max(...distribucionPorPaloCartasComunes))
    if(piezas.length + Math.max(...distribucionPorPaloCartasComunes) < 3){ return -1;}
    //console.log(mano,"ES FLOR")
    const puntosPorCarta = currentCards.cards.mano.map(puntosCarta).sort(function(a, b){return b - a}) //Puntos de cada carta de mayor a menor
    switch (piezas.length) {
      case 3: //Flor de 3 piezas
        return puntosPorCarta[0] + puntosPorCarta[1] % 10 + puntosPorCarta[2] % 10
        break;
      case 2: //2 piezas + otra
        return puntosPorCarta[0] + puntosPorCarta[1] % 10 + puntosPorCarta[2]
        break;
      case 1: //Pieza + 2 mismo palo
        return puntosPorCarta[0] + puntosPorCarta[1]  + puntosPorCarta[2]
        break;
      case 0: //3 mismo palo
        return puntosPorCarta[0] + puntosPorCarta[1]  + puntosPorCarta[2] + 20
        break;
      default:
        return -1
        break;
    }

  }

  const calcularEnvido = () => {
    if(calcularFlor() >= 0){ return -1 }
    const piezas = currentCards.cards.mano.filter((card) => card.pieza)
    const comunes = currentCards.cards.mano.filter((card) => !card.pieza)
    
    const distribucionPorPaloCartasComunes: { suit:string, value:number, pieza:boolean, mata: boolean }[][] = [[],[],[],[]]
    for (let i = 0; i < comunes.length; i++) {
      ["Basto","Espada","Copa","Oro"].forEach((value,index) => {
        if (comunes[i].suit == value) {
          distribucionPorPaloCartasComunes[index].push(comunes[i])
        }
      })
    }
    const puntosPorCarta = currentCards.cards.mano.map(puntosCarta).sort(function(a, b){return b - a}) //Puntos de cada carta de mayor a menor
    if (piezas.length > 0 && Math.max(...distribucionPorPaloCartasComunes.map(val => val.length)) == 1) {
      return puntosPorCarta[0] + puntosPorCarta[1]
    }else if(Math.max(...distribucionPorPaloCartasComunes.map(val => val.length)) == 2){
      const mismoPalo = distribucionPorPaloCartasComunes.filter((palo)=>palo.length == 2)[0]
      //console.log("TESTENVIDO",comunes)
      return puntosCarta(mismoPalo[0]) + puntosCarta(mismoPalo[1]) + 20
    }

    return puntosPorCarta[0]
  }
  
  const sortMano = () => {
    const ordenPiezas = [2,4,5,11,10]
    const ordenMatas = [{ suit:"Espada", value:1 },{ suit:"Basto", value:1 },{ suit:"Espada", value:7 },{ suit:"Oro", value:7 }]
    const ordenResto = [3,2,1,12,11,10,7,6,5,4]
    //console.log(currentCards.cards.muestra)
    var piezas = currentCards.cards.mano.filter((card) => esPieza(card))
    var matas = currentCards.cards.mano.filter((card) => esMata(card))
    var resto = currentCards.cards.mano.filter((card) => !esMata(card) && !esPieza(card))
    //console.log(piezas)
    piezas = piezas.sort(function(a, b){
      const aPos = a.value == 12 ? ordenPiezas.indexOf(currentCards.cards.muestra.value) : ordenPiezas.indexOf(a.value)
      const bPos = b.value == 12 ? ordenPiezas. indexOf(currentCards.cards.muestra.value) : ordenPiezas.indexOf(b.value)
      return aPos - bPos
    })
    matas = matas.sort(function(a, b){
      const aPos = ordenMatas.findIndex((mata)=> mata.suit == a.suit && mata.value == a.value)
      const bPos = ordenMatas.findIndex((mata)=> mata.suit == b.suit && mata.value == b.value)
      return aPos - bPos
    })
    resto = resto.sort(function(a, b){
      const aPos = ordenResto.indexOf(a.value)
      const bPos = ordenResto.indexOf(b.value)
      return aPos - bPos
    })
    
    currentCards.cards.mano = piezas.concat(matas).concat(resto)
    //console.log(currentCards)
  }

  const getRandomCard = () => {
    const suits = ["Basto","Copa","Espada","Oro"]
    const values = [1,2,3,4,5,6,7,10,11,12]

    return {
      suit: suits[(Math.floor(Math.random() * suits.length))],
      value: values[(Math.floor(Math.random() * values.length))],
      pieza: false,
      mata: false
    }
  }

  const randomizeCards = () => {
    //Muestra
    currentCards.cards.muestra = getRandomCard()
    
    //Mano / Hand
    var newMano : { suit:string, value:number,pieza:boolean, mata:boolean }[]= []
    for (let i = 0; i < 3; i++) {
      var newCard = getRandomCard()
      while (newMano.find((card) => card.suit == newCard.suit && card.value == newCard.value) || (currentCards.cards.muestra.suit == newCard.suit && newCard.value == currentCards.cards.muestra.value))  {
        newCard = getRandomCard()
      }
      //console.log(newCard)
      newCard.pieza = esPieza(newCard)
      newCard.mata = esMata(newCard)
      newMano.push(newCard)
    }
    
    currentCards.cards.mano = newMano
    currentCards.points.envido = calcularEnvido()
    currentCards.points.flor = calcularFlor()
    sortMano()

    currentCards.points.envido = calcularEnvido()
    currentCards.points.flor = calcularFlor()
    setDisplayedCards(currentCards)
    
  }

  const handlePlaySelect = (play: string)=>{
    
    currentPlayType = play
    setDisplayedPlayType(currentPlayType)
    console.log("PLAY",currentPlayType)
  }
  
  const  handlePointsInput = (points:string) => {
    currentPoints = Number.isNaN(parseInt(points)) ? 0 : parseInt(points)
    console.log("POINTS",currentPoints)
    setDisplayedPoints(currentPoints)
  }

  const finishGame = () => {
    console.log(currentPlayType,currentPoints)
    const correctPlayText = displayedCards.points.envido < 0 ? "FLOR" : "ENVIDO"
    const playMatch = displayedPlayType == correctPlayText
    const pointsMatch = displayedPoints == Math.max(displayedCards.points.envido,displayedCards.points.flor)
    currentGame.won = playMatch && pointsMatch
    currentGame.finished = true
    setDisplayedGame(currentGame)
  }

  const newGame = () => {
    randomizeCards()
    currentGame.finished = false
    currentGame.won = false
    currentGame.submittedPoints = 0
    currentGame.selectedPlay = "FLOR"
    setDisplayedGame(currentGame)
    //setDisplayedGame(currentGame)
  }

  return (
   
      <ImageBackground source={appBackground} resizeMode="cover" style={styles.container}>
      <View style={styles.muestraContainer}>
        <Card suit= {displayedCards.cards.muestra.suit} value={displayedCards.cards.muestra.value} muestra={true} pieza={false} mata={false}></Card>
        <TouchableOpacity style={styles.randomButton} onPress={randomizeCards}>
          <Text style={{fontSize: 30, color: "#232", fontFamily: "Sono"}}>BARAJAR</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.handContainer}>
        <Card suit={displayedCards.cards.mano[0].suit} value={displayedCards.cards.mano[0].value} muestra={false} pieza={displayedCards.cards.mano[0].pieza} mata={displayedCards.cards.mano[0].mata}></Card>
        <Card suit={displayedCards.cards.mano[1].suit} value={displayedCards.cards.mano[1].value} muestra={false} pieza={displayedCards.cards.mano[1].pieza} mata={displayedCards.cards.mano[1].mata}></Card>
        <Card suit={displayedCards.cards.mano[2].suit} value={displayedCards.cards.mano[2].value} muestra={false} pieza={displayedCards.cards.mano[2].pieza} mata={displayedCards.cards.mano[2].mata}></Card>
      </View>
      {!displayedGame.finished && 
      <View style={styles.inputContainer}>
        <View style={styles.inputPanelRow}>
          <Pressable style={[styles.playSelectButton,{backgroundColor: displayedPlayType == "FLOR" ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{handlePlaySelect("FLOR")}}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>FLOR</Text>
          </Pressable>
          <Pressable style={[styles.playSelectButton,{backgroundColor: displayedPlayType == "ENVIDO" ? "rgba(66,135,245,1)" : "rgba(66,135,245,0.3)"}]} onPress={()=>{handlePlaySelect("ENVIDO")}}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>ENVIDO</Text>
          </Pressable>
        </View>
        <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
          <Text style={{fontSize: 25, color: "#fff", fontFamily: "Sono"}}>PUNTOS</Text>
          <TextInput style={styles.pointsInput} value={displayedPoints.toString()} keyboardType="numeric" onChangeText={(text) => {handlePointsInput(text)}}></TextInput>
        </View>
        <View style={[styles.inputPanelRow,{justifyContent:"space-evenly", paddingLeft:10}]}>
          <Pressable style={[styles.playSelectButton,{backgroundColor: "#F66", marginTop:15}]} onPress={finishGame}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>ENVIAR</Text>
          </Pressable>
        </View>
        
      </View>
      }
      {displayedGame.finished && 
      <View style={[styles.resultContainer,{backgroundColor: displayedGame.won ? "rgba(2, 204, 32,0.7)" : "rgba(204, 9, 2,0.7)"}]}>
        {<Text style={styles.resultText}>{displayedGame.won ? "CORRECTO! ✅" : "MAL! 😡"}</Text>}
        {<Text style={styles.resultText}>{displayedCards.points.envido < 0 ? "FLOR" : "ENVIDO"} {displayedCards.points.envido < 0 ? displayedCards.points.flor : displayedCards.points.envido}</Text>}
        <Pressable style={[styles.playSelectButton,{backgroundColor: displayedGame.won ? "rgba(2, 204, 32,0.7)" : "rgba(204, 9, 2,0.7)", marginTop:15}]} onPress={newGame}>
            <Text style={{fontSize: 20, color: "#232", fontFamily: "Sono"}}>DAR DE NUEVO</Text>
        </Pressable>
      </View>
      }
      </ImageBackground>
    
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:20
  },
  muestraContainer: {
    width: "100%",
    height: "20%",
    marginTop: 40,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)"
  },
  randomButton:{
    padding: 10,
    backgroundColor: "#F66",
    borderRadius: 10,
    maxHeight:100
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
  pointsInput:{
    width:"50%",
    height:50,
    backgroundColor: "white",
    fontSize: 30,
    fontFamily: "Sono"
  },
  handContainer: {
    height: "20%",
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent:'space-around',
    backgroundColor: "rgba(0,0,0,0)"
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
  resultContainer:{
    marginTop: 20,
    backgroundColor: "rgba(242,232,31,0.7)",
    justifyContent:"center",
    alignItems: "center",
    width: "70%",
    paddingBottom: 15,
    borderColor: "#000",
    borderWidth: 5,
    borderRadius: 15,
  },
  resultText:{
    fontSize: 30,
    color: "#000",
    fontFamily: "Sono",
    fontWeight: "medium",
  }
});
