import React, { useContext } from 'react'
import {
    Dimensions, Image, SafeAreaView, StyleSheet, Text, View
} from 'react-native'
import { AuthContext } from './Context'


const Screens = () => {
  const baseURL = '<YOUR_LOCAL_TUNNEL_URL>'
  const { screen, setScreen } = useContext(AuthContext)


  return (
    <SafeAreaView style={styles.container}>
      {screen === 'Login' ? (
        <View>
          <Image
            style={styles.logo}
            source={require('./images/tru-logo.png')}
          />
          <Text style={styles.heading}>Login</Text>
     
        </View>
      ) : (
        <View>
          <Image
            style={styles.logo}
            source={require('./images/tru-logo.png')}
          />
          <Text style={styles.heading}>Input OTP</Text>
          
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
    width: 0.5 * Dimensions.get('window').width,
    height: 200,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderColor: '#858585',
    borderWidth: 0.4,
    elevation: 7,
    shadowColor: '#858585',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    color: '#000',
    width: 0.7 * Dimensions.get('window').width,
  },
  spinner: {
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1955ff',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1955ff',
    marginTop: 17,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
  },
})

export default Screens
