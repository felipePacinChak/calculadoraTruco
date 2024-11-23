import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Text, View } from '@/components/Themed';

const appBackground = {uri : "https://media.istockphoto.com/id/629820716/photo/wood-texture-oak-wood-background-texture-background.jpg?s=612x612&w=0&k=20&c=6oLtCvt_B6e-lC0lSURRmchqYkPCWXX6L0Lz_jofOco="}
export default function TabTwoScreen() {
  return (
    <ImageBackground source={appBackground} resizeMode="cover" style={styles.parentContainer}>
      <View style={styles.topSection}>
       <Text style={styles.title}>Tabla de Cartas 🃏</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title ><Text style={styles.tableTitle}>CARTA</Text></DataTable.Title>
            <DataTable.Title numeric><Text style={styles.tableTitle}>PUNTOS ENVIDO</Text></DataTable.Title>
            <DataTable.Title numeric><Text style={styles.tableTitle}>SEÑA</Text></DataTable.Title>
          </DataTable.Header>
        </DataTable>
      </View>  
      <ScrollView contentContainerStyle={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableTitle}>PIEZAS 💎(del palo de la muestra)</Text></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text>2</Text></DataTable.Cell>
            <DataTable.Cell><Text>30</Text></DataTable.Cell>
            <DataTable.Cell><Text>Levanto Cejas</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>4</Text></DataTable.Cell>
            <DataTable.Cell><Text>29</Text></DataTable.Cell>
            <DataTable.Cell><Text>Beso</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>5</Text></DataTable.Cell>
            <DataTable.Cell><Text>28</Text></DataTable.Cell>
            <DataTable.Cell><Text>Frunzo nariz</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>11</Text></DataTable.Cell>
            <DataTable.Cell><Text>27</Text></DataTable.Cell>
            <DataTable.Cell><Text>Guiñada ojo derecho</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>10</Text></DataTable.Cell>
            <DataTable.Cell><Text>27</Text></DataTable.Cell>
            <DataTable.Cell><Text>Guiñada ojo izquierdo</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableTitle}>MATAS 🔫</Text></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text>1 de Espada ⚔️</Text></DataTable.Cell>
            <DataTable.Cell><Text>1</Text></DataTable.Cell>
            <DataTable.Cell><Text>Boca Derecha</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>1 de Basto 🦯</Text></DataTable.Cell>
            <DataTable.Cell><Text>1</Text></DataTable.Cell>
            <DataTable.Cell><Text>Boca Derecha</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>7 de Espada ⚔️</Text></DataTable.Cell>
            <DataTable.Cell><Text>7</Text></DataTable.Cell>
            <DataTable.Cell><Text>Boca Izquierda</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>7 de Oro 🪙</Text></DataTable.Cell>
            <DataTable.Cell><Text>7</Text></DataTable.Cell>
            <DataTable.Cell><Text>Boca Izquierda</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableTitle}>COMUNES 🤏</Text></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text>3</Text></DataTable.Cell>
            <DataTable.Cell><Text>3</Text></DataTable.Cell>
            <DataTable.Cell><Text>Muerdo Labio</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>2</Text></DataTable.Cell>
            <DataTable.Cell><Text>2</Text></DataTable.Cell>
            <DataTable.Cell><Text>Abro Boca</Text></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><Text>1</Text></DataTable.Cell>
            <DataTable.Cell><Text>1</Text></DataTable.Cell>
            <DataTable.Cell><Text>Saco Lengua</Text></DataTable.Cell>
          </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>12</Text></DataTable.Cell>
              <DataTable.Cell><Text>0</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>11</Text></DataTable.Cell>
              <DataTable.Cell><Text>0</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>10</Text></DataTable.Cell>
              <DataTable.Cell><Text>0</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>7</Text></DataTable.Cell>
              <DataTable.Cell><Text>7</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>6</Text></DataTable.Cell>
              <DataTable.Cell><Text>6</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>5</Text></DataTable.Cell>
              <DataTable.Cell><Text>5</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text>4</Text></DataTable.Cell>
              <DataTable.Cell><Text>4</Text></DataTable.Cell>
              <DataTable.Cell><Text>Cierro ojos</Text></DataTable.Cell>
            </DataTable.Row>




        </DataTable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor : "rgba(0,0,0,0.6)"
  },
  centerAlign:{
    alignItems: 'center'
  },
  topSection:{
    width: "100%",
    height: "15%",
    backgroundColor : "rgba(0,0,0,0.6)",
    paddingBottom: 25

  },

  parentContainer:{
    flex: 1,
  },
  tableTitle:{
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    textAlign:"center",
    fontWeight: 'bold',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    
  },
});
