import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, View } from '@/components/Themed';

const appBackground = {
  uri: 'https://media.istockphoto.com/id/629820716/photo/wood-texture-oak-wood-background-texture-background.jpg?s=612x612&w=0&k=20&c=6oLtCvt_B6e-lC0lSURRmchqYkPCWXX6L0Lz_jofOco=',
};

const tableSections = [
  {
    title: 'PIEZAS 💎(del palo de la muestra)',
    rows: [
      { carta: '2', puntos: '30', seña: 'Levanto Cejas' },
      { carta: '4', puntos: '29', seña: 'Beso' },
      { carta: '5', puntos: '28', seña: 'Frunzo nariz' },
      { carta: '11', puntos: '27', seña: 'Guiñada ojo derecho' },
      { carta: '10', puntos: '27', seña: 'Guiñada ojo izquierdo' },
    ],
  },
  {
    title: 'MATAS 🔫',
    rows: [
      { carta: '1 de Espada ⚔️', puntos: '1', seña: 'Boca Derecha' },
      { carta: '1 de Basto 🦯', puntos: '1', seña: 'Boca Derecha' },
      { carta: '7 de Espada ⚔️', puntos: '7', seña: 'Boca Izquierda' },
      { carta: '7 de Oro 🪙', puntos: '7', seña: 'Boca Izquierda' },
    ],
  },
  {
    title: 'COMUNES 🤏',
    rows: [
      { carta: '3', puntos: '3', seña: 'Muerdo Labio' },
      { carta: '2', puntos: '2', seña: 'Abro Boca' },
      { carta: '1', puntos: '1', seña: 'Saco Lengua' },
      { carta: '12', puntos: '0', seña: 'Cierro ojos' },
      { carta: '11', puntos: '0', seña: 'Cierro ojos' },
      { carta: '10', puntos: '0', seña: 'Cierro ojos' },
      { carta: '7', puntos: '7', seña: 'Cierro ojos' },
      { carta: '6', puntos: '6', seña: 'Cierro ojos' },
      { carta: '5', puntos: '5', seña: 'Cierro ojos' },
      { carta: '4', puntos: '4', seña: 'Cierro ojos' },
    ],
  },
];

export default function TabTwoScreen() {
  return (
    <ImageBackground source={appBackground} resizeMode="cover" style={styles.parentContainer}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Tabla de Cartas 🃏</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {tableSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>CARTA</Text>
                <Text style={[styles.cell, styles.headerCell]}>PUNTOS</Text>
                <Text style={[styles.cell, styles.headerCell]}>SEÑA</Text>
              </View>
              {section.rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  <Text style={styles.cell}>{row.carta}</Text>
                  <Text style={styles.cell}>{row.puntos}</Text>
                  <Text style={styles.cell}>{row.seña}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    paddingBottom: 20,
  },
  topSection: {
    width: '100%',
    height: '10%',
    backgroundColor: 'rgba(255,255,255,0)', // Light background for title section
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // Black text
  },
  section: {
    marginVertical: 10,
    padding: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000', // Black text for section titles
    marginBottom: 8,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#000', // Black text for table cells
    backgroundColor:"rgba(256,256,256,0.3)",
    padding: 8,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5', // Light gray background for headers
  },
});
