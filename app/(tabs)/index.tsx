import { StyleSheet, TouchableOpacity, ImageBackground, Pressable } from 'react-native';

import { Text, View } from '@/components/Themed';
import Card from '@/components/Card';
import "./index.css"
import { useState } from "react";
import CardEditForm from '@/components/CardEditForm';

const appBackground = {uri : "https://media.istockphoto.com/id/629820716/photo/wood-texture-oak-wood-background-texture-background.jpg?s=612x612&w=0&k=20&c=6oLtCvt_B6e-lC0lSURRmchqYkPCWXX6L0Lz_jofOco="}
export default function TabOneScreen() {
  interface Board {
    cards:{
      muestra: { suit:string, value:number },
      mano: { suit:string, value:number, pieza: boolean, mata:boolean}[],
    },
    points:{
      envido: number,
      flor: number
    }
  }
  
  var currentBoard : Board = {
    cards:{
      muestra: { suit:"Oro", value:10 },
      mano: [{suit: "Basto", value: 10, pieza: false, mata:false}, {suit: "Copa", value: 6, pieza: false, mata:false}, {suit: "Espada", value: 4, pieza: false, mata:false}]
    },
    points:{
      envido: -1,
      flor: 20
    }
  }
  const [displayedBoard,setDisplayedBoard] = useState({
    cards:{
      muestra: { suit:"Oro", value:10 },
      mano: [{suit: "Basto", value: 10, pieza: false, mata:false}, {suit: "Copa", value: 6, pieza: false, mata:false}, {suit: "Espada", value: 4, pieza: false, mata:false}]
    },
    points:{
      envido: -1,
      flor: 20
    }
})
  
  //State vars for the card editor, to be shown when a card is touched
  const [editingCard,setEditingCardIndex] = useState(-1)
  const [editError,setEditError] = useState(false)

  const esPieza = (carta: { suit:string, value:number }) => {
    const muestra = currentBoard.cards.muestra
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
      return carta.value != 12 ? puntosPiezas[carta.value] : puntosPiezas[currentBoard.cards.muestra.value]
    }else if([10,11,12].includes(carta.value)){
      return 0
    }
    return carta.value
  }

  const calcularFlor = () => {
    const piezas = currentBoard.cards.mano.filter((card) => card.pieza)
    const comunes = currentBoard.cards.mano.filter((card) => !card.pieza)

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
    const puntosPorCarta = currentBoard.cards.mano.map(puntosCarta).sort(function(a, b){return b - a}) //Puntos de cada carta de mayor a menor
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
    const piezas = currentBoard.cards.mano.filter((card) => card.pieza)
    const comunes = currentBoard.cards.mano.filter((card) => !card.pieza)
    
    const distribucionPorPaloCartasComunes: { suit:string, value:number, pieza:boolean, mata: boolean }[][] = [[],[],[],[]]
    for (let i = 0; i < comunes.length; i++) {
      ["Basto","Espada","Copa","Oro"].forEach((value,index) => {
        if (comunes[i].suit == value) {
          distribucionPorPaloCartasComunes[index].push(comunes[i])
        }
      })
    }
    const puntosPorCarta = currentBoard.cards.mano.map(puntosCarta).sort(function(a, b){return b - a}) //Puntos de cada carta de mayor a menor
    console.log(distribucionPorPaloCartasComunes)
    if (piezas.length > 0 && Math.max(...distribucionPorPaloCartasComunes.map(val => val.length)) == 1) {
      console.log(puntosPorCarta)
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
    //console.log(currentBoard.cards.muestra)
    var piezas = currentBoard.cards.mano.filter((card) => esPieza(card))
    var matas = currentBoard.cards.mano.filter((card) => esMata(card))
    var resto = currentBoard.cards.mano.filter((card) => !esMata(card) && !esPieza(card))
    console.log(piezas)
    piezas = piezas.sort(function(a, b){
      const aPos = a.value == 12 ? ordenPiezas.indexOf(currentBoard.cards.muestra.value) : ordenPiezas.indexOf(a.value)
      const bPos = b.value == 12 ? ordenPiezas. indexOf(currentBoard.cards.muestra.value) : ordenPiezas.indexOf(b.value)
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
    
    currentBoard.cards.mano = piezas.concat(matas).concat(resto)
    //console.log(currentboard)
  }

  const handleEditSubmit = (newSuit:string,newValue:number) => {
    if(JSON.stringify(currentBoard.cards.muestra) == JSON.stringify({suit: newSuit, value: newValue}) || currentBoard.cards.mano.map(card => JSON.stringify(card)).includes(JSON.stringify({suit: newSuit, value: newValue}))){
      return ;
    }else{
      updateCard(newSuit,newValue)
    }
    setEditingCardIndex(-1)
  }

  const updateCard = (newSuit:string,newValue:number) => {
    var newCard = {suit: newSuit, value: newValue}
    if(editingCard == 0){ //Update muestra
      currentBoard.cards.muestra = newCard
      for (let i = 0; i < currentBoard.cards.mano.length; i++) { //Como cambia la muestra hay que reevaluar que cartas de la mano son pieza
        currentBoard.cards.mano[i].pieza = esPieza(currentBoard.cards.mano[i])  
      }
    }else if([1,2,3].includes(editingCard)){ //Update mano
      currentBoard.cards.mano[editingCard-1] = {suit: newSuit, value: newValue, pieza: esPieza(newCard),mata: esMata(newCard) }
    }else{
      return ;
    }
    currentBoard.points.envido = calcularEnvido()
    currentBoard.points.flor = calcularFlor()
    //sortMano()
    //console.log(currentBoard.cards)
    currentBoard.points.envido = calcularEnvido()
    currentBoard.points.flor = calcularFlor()
    console.log(currentBoard, currentBoard.cards.mano)
    setDisplayedBoard(currentBoard)
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
    currentBoard.cards.muestra = getRandomCard()
    
    //Mano / Hand
    var newMano : { suit:string, value:number,pieza:boolean, mata:boolean }[]= []
    for (let i = 0; i < 3; i++) {
      var newCard = getRandomCard()
      while (newMano.find((card) => card.suit == newCard.suit && card.value == newCard.value) || (currentBoard.cards.muestra.suit == newCard.suit && newCard.value == currentBoard.cards.muestra.value))  {
        newCard = getRandomCard()
      }
      //console.log(newCard)
      newCard.pieza = esPieza(newCard)
      newCard.mata = esMata(newCard)
      newMano.push(newCard)
    }
    
    currentBoard.cards.mano = newMano
    currentBoard.points.envido = calcularEnvido()
    currentBoard.points.flor = calcularFlor()
    sortMano()
    //console.log(currentBoard.cards)
    currentBoard.points.envido = calcularEnvido()
    currentBoard.points.flor = calcularFlor()
    setDisplayedBoard(currentBoard)
    //console.log(displayedBoard)
  }


  

  return (
   
      <ImageBackground source={appBackground} resizeMode="cover" style={styles.container}>

      <View style={styles.muestraContainer}>
        <Card suit= {displayedBoard.cards.muestra.suit} cardIndex={0} editing={editingCard == 0} value={displayedBoard.cards.muestra.value} muestra={true} pieza={false} mata={false} onCardPulse={setEditingCardIndex}></Card>
        <TouchableOpacity style={styles.randomButton} onPress={randomizeCards}>
          <Text style={{fontSize: 30, color: "#232", fontFamily: "Sono"}}>BARAJAR</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.handContainer}>
        <Pressable></Pressable>
        <Card suit={displayedBoard.cards.mano[0].suit} cardIndex={1} editing={editingCard == 1} value={displayedBoard.cards.mano[0].value} muestra={false} pieza={displayedBoard.cards.mano[0].pieza} mata={displayedBoard.cards.mano[0].mata} onCardPulse={setEditingCardIndex}></Card>
        <Card suit={displayedBoard.cards.mano[1].suit} cardIndex={2} editing={editingCard == 2} value={displayedBoard.cards.mano[1].value} muestra={false} pieza={displayedBoard.cards.mano[1].pieza} mata={displayedBoard.cards.mano[1].mata} onCardPulse={setEditingCardIndex}></Card>
        <Card suit={displayedBoard.cards.mano[2].suit} cardIndex={3} editing={editingCard == 3} value={displayedBoard.cards.mano[2].value} muestra={false} pieza={displayedBoard.cards.mano[2].pieza} mata={displayedBoard.cards.mano[2].mata} onCardPulse={setEditingCardIndex}></Card>
      </View>
      {editingCard < 0 && <View style={styles.resultContainer}>
        {displayedBoard.points.flor >= 0 && <Text style={styles.resultText}>RICA FLOR {displayedBoard.points.flor}</Text>}
        {displayedBoard.points.envido >= 0 && <Text style={styles.resultText}>ENVIDO {displayedBoard.points.envido}</Text>}
      </View>}
      {editingCard>= 0 && <CardEditForm initialSuit='Basto' initialValue={5} cardIndex={editingCard} error={false} onSubmit={handleEditSubmit}></CardEditForm>}
      </ImageBackground> 
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:20,
    backgroundColor: 'white'
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
  handContainer: {
    height: "20%",
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent:'space-around',
    backgroundColor: "rgba(0,0,0,0)"
  },
  resultContainer:{
    marginTop: 20,
    backgroundColor: "rgba(242,232,31,1)",
    justifyContent:"center",
    alignItems: "center",
    width: "70%",
    height: "15%",
    borderColor: "#000",
    borderWidth: 5,
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
  resultText:{
    fontSize: 30,
    color: "#000",
    fontFamily: "Sono",
    fontWeight: "medium",
  }
});
