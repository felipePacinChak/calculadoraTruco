import { StyleSheet, TouchableOpacity, ImageBackground, Pressable,Dimensions } from 'react-native';

import { Text, View } from '@/components/Themed';
import Card from '@/components/Card';
import "./index.css"
import { useState, useEffect } from "react";
import CardEditForm from '@/components/CardEditForm';
import PlayResultPanel from '@/components/PlayResultPanel';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import ExplanationContent from '@/components/ExplanationContent';

const displayIsDesktop = () => {
  const viewportSize = Dimensions.get('window')
  return viewportSize.width > viewportSize.height
}

const appBackground = {uri : "https://media.istockphoto.com/id/629820716/photo/wood-texture-oak-wood-background-texture-background.jpg?s=612x612&w=0&k=20&c=6oLtCvt_B6e-lC0lSURRmchqYkPCWXX6L0Lz_jofOco="}
export default function TabOneScreen() {

  const [currentMuestra,setMuestra] = useState({ key: "ORO", suit:"Oro", value:10 })
  const [currentMano, setMano] = useState([{key: "10_BASTO",suit: "Basto", value: 10, pieza: false, mata:false}, {key: "6_COPA", suit: "Copa", value: 6, pieza: false, mata:false}, {key: "4_ESPADA",suit: "Espada", value: 4, pieza: false, mata:false}])
  const [currentPlay, setPlay] = useState("ENVIDO")
  const [currentPoints, setPoints] = useState(6)
  const [explanationSumTerms, setexplanationSumTerms] = useState([{card:{suit: "Basto", value:6},points:5 },{card:{suit: "Oro", value:7},points:7 },{card:null,points:20 }])
  

  useEffect(() => {
    actualizarJugada(currentMano);
    console.log(explanationSumTerms)
  }, [currentMano, currentMuestra]);
  
  //State vars for the card editor, to be shown when a card is touched
  const [editingCard,setEditingCardIndex] = useState(-1)
  const [editError,setEditError] = useState(false)

  const esPieza = (carta: { suit:string, value:number }, muestra: { suit:string, value:number }) => {
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
      return carta.value != 12 ? puntosPiezas[carta.value] : puntosPiezas[currentMuestra.value]
    }else if([10,11,12].includes(carta.value)){
      return 0
    }
    return carta.value
  }

  const actualizarJugada  = (mano: {suit: string, value: number, pieza:boolean, mata:boolean}[]) => {
    const piezas = currentMano.filter((card) => card.pieza)
    const comunes = currentMano.filter((card) => !card.pieza)

    var distribucionPorPaloCartasComunes: { suit:string, value:number, pieza:boolean, mata: boolean }[][] = [[],[],[],[]]

    for (let i = 0; i < comunes.length; i++) {
      ["Basto","Espada","Copa","Oro"].forEach((value,index) => {
        if (comunes[i].suit == value) {
          distribucionPorPaloCartasComunes[index].push(comunes[i])
        }
      })
    }
    console.log(piezas.length,distribucionPorPaloCartasComunes.map(palo => palo.length))
    if(piezas.length + Math.max(...distribucionPorPaloCartasComunes.map(palo => palo.length)) >= 3 /*ES FLOR*/){
      
      const puntosPorCarta = currentMano.map((cart)=>{return {...cart,points: puntosCarta(cart)}}).sort(function(a, b){return b.points - a.points}) //Puntos de cada carta de mayor a menor
      switch (piezas.length) {
        case 3: //Flor de 3 piezas
          setPlay("FLOR_3PIEZAS")
          setexplanationSumTerms([{card:puntosPorCarta[0], points:puntosPorCarta[0].points},{card:puntosPorCarta[1], points:puntosPorCarta[1].points % 10},{card:puntosPorCarta[2], points:puntosPorCarta[2].points % 10}])
          setPoints(puntosPorCarta[0].points + puntosPorCarta[1].points % 10 + puntosPorCarta[2].points % 10)
          break;
        case 2: //2 piezas + otra
          setPlay("FLOR_2PIEZAS")
          setexplanationSumTerms([{card:puntosPorCarta[0], points:puntosPorCarta[0].points},{card:puntosPorCarta[1], points:puntosPorCarta[1].points % 10},{card:puntosPorCarta[2], points:puntosPorCarta[2].points}])
          setPoints(puntosPorCarta[0].points + puntosPorCarta[1].points % 10 + puntosPorCarta[2].points)
          break;
        case 1: //Pieza + 2 mismo palo
          setPlay("FLOR_1PIEZA_2MISMOPALO")
          setexplanationSumTerms([{card:puntosPorCarta[0], points:puntosPorCarta[0].points},{card:puntosPorCarta[1], points:puntosPorCarta[1].points},{card:puntosPorCarta[2], points:puntosPorCarta[2].points}])
          setPoints(puntosPorCarta[0].points + puntosPorCarta[1].points  + puntosPorCarta[2].points)
          break;
        case 0: //3 mismo palo
          setPlay("FLOR_3MISMOPALO")
          setexplanationSumTerms([{card:puntosPorCarta[0], points:puntosPorCarta[0].points},{card:puntosPorCarta[1], points:puntosPorCarta[1].points},{card:puntosPorCarta[2], points:puntosPorCarta[2].points},{card:null, points:20}])
          setPoints(puntosPorCarta[0].points + puntosPorCarta[1].points  + puntosPorCarta[2].points + 20)
          break;
        default:
          setPoints(-1)
          break;
      }
    }else{
      //setPlay("ENVIDO")
      const puntosPorCarta = mano.map((cart)=>{return {...cart,points: puntosCarta(cart)}}).sort(function(a, b){return b.points - a.points}) //Puntos de cada carta de mayor a menor
      if (piezas.length > 0 && Math.max(...distribucionPorPaloCartasComunes.map(val => val.length)) == 1) {
        setPlay("ENVIDO_1PIEZA")
        setexplanationSumTerms([{card:puntosPorCarta[0], points:puntosPorCarta[0].points},{card:puntosPorCarta[1], points:puntosPorCarta[1].points}])
        setPoints(puntosPorCarta[0].points + puntosPorCarta[1].points)
      }else if(Math.max(...distribucionPorPaloCartasComunes.map(val => val.length)) == 2){
        setPlay("ENVIDO_2MISMOPALO")
        const mismoPalo = distribucionPorPaloCartasComunes.filter((palo)=>palo.length == 2)[0]
        setPoints(puntosCarta(mismoPalo[0]) + puntosCarta(mismoPalo[1]) + 20)
        setexplanationSumTerms([{card:mismoPalo[0], points:puntosCarta(mismoPalo[0])},{card:mismoPalo[1], points:puntosCarta(mismoPalo[1])},{card:null, points:20}])
      }else{
        setPlay("ENVIDO_PALOSDISTINTOS")
        setPoints(puntosPorCarta[0].points)
        setexplanationSumTerms([{card:puntosPorCarta[0], points:puntosPorCarta[0].points}])
      }
    }
  }
  
  const sortMano = (mano: {key: string, suit: string, value: number, pieza:boolean, mata:boolean}[]) => {
    const ordenPiezas = [2,4,5,11,10]
    const ordenMatas = [{ suit:"Espada", value:1 },{ suit:"Basto", value:1 },{ suit:"Espada", value:7 },{ suit:"Oro", value:7 }]
    const ordenResto = [3,2,1,12,11,10,7,6,5,4]
    //console.log(currentMuestra)
    var piezas = mano.filter((card) => card.pieza)
    var matas = mano.filter((card) => card.mata)
    var resto = mano.filter((card) => !card.mata && !card.pieza)
    //console.log(piezas)
    piezas = piezas.sort(function(a, b){
      const aPos = a.value == 12 ? ordenPiezas.indexOf(currentMuestra.value) : ordenPiezas.indexOf(a.value)
      const bPos = b.value == 12 ? ordenPiezas. indexOf(currentMuestra.value) : ordenPiezas.indexOf(b.value)
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
    
    return piezas.concat(matas).concat(resto)
  }

  const handleEditSubmit = (newSuit:string,newValue:number) => {
    if(currentMano.find((card) => card.suit == newSuit && card.value == newValue) || (currentMuestra.suit == newSuit && newValue == currentMuestra.value)){
      return ;
    }else{
      updateCard(newSuit,newValue)
    }
    setEditingCardIndex(-1)
  }

  const updateCard = (newSuit:string,newValue:number) => {
    var newCard = {suit: newSuit, value: newValue, key: `${newValue}_${newSuit.toUpperCase}`}
    var newMano = [...currentMano]
    if(editingCard == 0){ //Update muestra
      setMuestra(newCard)
      for (let i = 0; i < newMano.length; i++) { //Como cambia la muestra hay que reevaluar que cartas de la mano son pieza
        newMano[i].pieza = esPieza(newMano[i],newCard)  
      }
    }else if([1,2,3].includes(editingCard)){ //Update mano
      newMano[editingCard-1] = {key: `${newValue}_${newSuit.toUpperCase}`,suit: newSuit, value: newValue, pieza: esPieza(newCard,currentMuestra),mata: esMata(newCard) }
    }else{
      return ;
    }
    setMano(sortMano(newMano))
  }

  const getRandomCard = () => {
    const suits = ["Basto","Copa","Espada","Oro"]
    const values = [1,2,3,4,5,6,7,10,11,12]

    const newSuit = suits[(Math.floor(Math.random() * suits.length))]
    const newValue = values[(Math.floor(Math.random() * values.length))]
    return {
      key: `${newValue}_${newSuit.toUpperCase}`,
      suit: newSuit,
      value: newValue,
      pieza: false,
      mata: false
    }
  }

  const randomizeCards = () => {
    //Muestra
    const newMuestra = getRandomCard()
    setMuestra(newMuestra)
    //Mano / Hand
    var newMano : {key:string, suit:string, value:number,pieza:boolean, mata:boolean }[]= []
    for (let i = 0; i < 3; i++) {
      var newCard = getRandomCard()
      while (newMano.find((card) => card.suit == newCard.suit && card.value == newCard.value) || (newMuestra.suit == newCard.suit && newCard.value == newMuestra.value))  {
        newCard = getRandomCard()
      }
      //console.log(newCard)
      newCard.pieza = esPieza(newCard,newMuestra)
      newCard.mata = esMata(newCard)
      newMano.push(newCard)
    }
  
    setMano(sortMano(newMano))
  }


  

  return (
    <View style={styles.parentContainer}>
      <View style={styles.appContainer}>
      <ImageBackground source={appBackground} resizeMode="cover" style={styles.imageContainer} imageStyle={{borderRadius: displayIsDesktop() ? 15 : 0}}>

      <View style={styles.muestraContainer}>
        <Pressable style={styles.cardContainer} onPress={()=>{setEditingCardIndex(0)}}>
          <Card suit={currentMuestra.suit} editing={editingCard == 0} value={currentMuestra.value} cardIndex={0} 
          muestra={true} pieza={false} mata={false} disableAnimations={false} boxStyles={{width:"100%", height:"100%"}}></Card>
        </Pressable>
        <View style={{flexDirection: "column"}}>
          <TouchableOpacity style={styles.randomButton} onPress={randomizeCards}>
            <Text style={{fontSize: 30, color: "#323", fontFamily: "Sono"}}>BARAJAR</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 3, fontSize:15, color:'#000',fontWeight: 'bold'}}>O tocar carta para editar</Text>
        </View>
        
      </View>
      <View style={styles.handContainer}>
        <Pressable style={styles.cardContainer} onPress={()=>{setEditingCardIndex(1)}}>
          <Card suit={currentMano[0].suit} editing={editingCard == 1} value={currentMano[0].value} cardIndex={1} 
          muestra={false} pieza={currentMano[0].pieza} mata={currentMano[0].mata} disableAnimations={false} boxStyles={{width:"100%", height:"100%"}}></Card>
        </Pressable>
        <Pressable style={styles.cardContainer} onPress={()=>{setEditingCardIndex(2)}}>
          <Card suit={currentMano[1].suit} editing={editingCard == 2} value={currentMano[1].value} cardIndex={2} muestra={false} pieza={currentMano[1].pieza} mata={currentMano[1].mata} disableAnimations={false} boxStyles={{width:"100%", height:"100%"}}></Card>
        </Pressable>
        <Pressable style={styles.cardContainer} onPress={()=>{setEditingCardIndex(3)}}>
          <Card suit={currentMano[2].suit}  editing={editingCard == 3} value={currentMano[2].value} cardIndex={3} muestra={false} pieza={currentMano[2].pieza} mata={currentMano[2].mata} disableAnimations={false} boxStyles={{width:"100%", height:"100%"}}></Card>
        </Pressable>
      </View>
      {editingCard < 0 && 
          <>
            <PlayResultPanel play={currentPlay.includes("FLOR") ? "FLOR" : "ENVIDO"} points={currentPoints}></PlayResultPanel>
            <CollapsiblePanel title='Por Qué?'>
              <ExplanationContent play={currentPlay} sumandos={explanationSumTerms}></ExplanationContent>
            </CollapsiblePanel>
          </>
      }
      {editingCard>= 0 && 
        <CardEditForm initialSuit= {editingCard == 0 ? currentMuestra.suit : currentMano[editingCard-1].suit} initialValue={editingCard == 0 ? currentMuestra.value : currentMano[editingCard-1].value} cardIndex={editingCard} error={false} onSubmit={handleEditSubmit} onCancel={()=>setEditingCardIndex(-1)}></CardEditForm>
        }
      </ImageBackground> 
      </View>
      </View>
      
    
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  appContainer: {
    width:  displayIsDesktop() ? "40%" : "100%",
    height: displayIsDesktop() ? "90%" : "100%",
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: displayIsDesktop() ? 20 : 0,
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 50,
    
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:20,
    backgroundColor: 'white',
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
    backgroundColor: "#D95D39",
    borderRadius: 10,
    borderColor: "#323",
    alignItems:"center",
    borderWidth: 1,
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
  cardContainer:{
    height: "100%",
    width: "27%"
  }
});
