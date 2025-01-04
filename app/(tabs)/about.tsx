// AboutPage.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, Dimensions, ImageBackground } from 'react-native';

const displayIsDesktop = () => {
  const viewportSize = Dimensions.get('window');
  return viewportSize.width > viewportSize.height;
};

const appBackground = { uri: 'https://i.ibb.co/gWc55sV/app-Background.jpg' };

const AboutPage: React.FC = () => {
  return (
    <View style={styles.parentContainer}>
        <View style={styles.appContainer}>
            <ImageBackground
                source={appBackground}
                resizeMode="cover"
                style={styles.imageContainer}
                imageStyle={{ borderRadius: displayIsDesktop() ? 15 : 0 }}
              >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                      <Text style={styles.title}>About Truco Calculator</Text>
                      <Text style={styles.description}>
                        Calculadora truco is designed to help new players count hand scores during their games and get a detailed explanation on how the card points are being added up. The idea is for this to be a tool available to make the learning of Uruguayan truco a more pleasant experience.
                      </Text>

                      <View style={styles.separator}></View>

                      <Text style={styles.title}>Sobre Truco Calculator</Text>
                      <Text style={styles.description}>
                      Calculadora Truco está diseñada para ayudar a los nuevos jugadores a contar los puntajes de las manos durante sus partidas y obtener una explicación detallada de cómo se suman los puntos de las cartas. La idea es que sea una herramienta disponible para hacer que el aprendizaje del truco uruguayo sea una experiencia más agradable.</Text>

                      <Text style={styles.sectionTitle}>GitHub Repository / Repositorio de GitHub</Text>
                      <Text style={styles.link}>
                          <Text
                            onPress={() => Linking.openURL('https://github.com/felipePacinChak/calculadoraTruco')}
                          >
                            https://github.com/felipePacinChak/calculadoraTruco
                          </Text>
                      </Text>

                      <Text style={styles.sectionTitle}>Contact Information / Información de Contacto</Text>
                      <Text style={styles.description}>
                        Feel free to reach out for feedback on the app or job opportunities:
                      </Text>
                      <View style={styles.separator}></View>
                      <Text style={styles.description}>
                        No dudes en ponerte en contacto para comentarios sobre la aplicación o oportunidades laborales:
                      </Text>

                      <Text style={styles.contactInfo}>Email / Correo:</Text>
                      <Text style={styles.link}>
                          <Text
                            onPress={() => Linking.openURL('mailto:felipepacin7@gmail.com')}
                          >
                            felipepacin7@gmail.com
                          </Text>
                      </Text>
                      <Text style={styles.contactInfo}>
                        LinkedIn:
                      </Text> 
                      <Text
                        style={styles.link}
                        onPress={() => Linking.openURL('https://www.linkedin.com/in/felipe-pacin/')}
                      >
                         https://www.linkedin.com/in/felipe-pacin/
                      </Text>


                </ScrollView>
            </ImageBackground>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding:0,
        alignItems: "center",
        justifyContent: "center"
      },
      appContainer: {
        width:  displayIsDesktop() ? "40%" : "100%",
        height: displayIsDesktop() ? "90%" : "100%",
        padding:0,
        
        borderRadius: displayIsDesktop() ? 20 : 0,
        shadowColor: "rgba(0,0,0,1)",
        shadowRadius: 50,
        
        
      },
      imageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding:  20,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
      },
      scrollContainer: {
        width: "75%",
        alignSelf: "center"
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFD700',
        textAlign: 'center',
      },
      description: {
        fontSize: 18,
        marginBottom: 20,
        color: '#FFFFFF',
        textAlign: 'justify',
        lineHeight: 24
      
      },
      sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#FFD700',
        textAlign: 'center',
      },
      link: {
        fontSize: 19,
        color: '#FFF',
        backgroundColor:"rgba(100,200,100,0.5)",
        textDecorationLine: 'none',
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        flexWrap: 'wrap', // Ensures wrapping to new lines
        width: '90%', // Restricts width to fit within the container
        alignSelf: 'center', // Centers the link text within the parent container
      },  
      contactInfo: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 5,
      },
      separator: {
        height: 2,
        backgroundColor: '#FFD700',
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
      },
});

export default AboutPage;
