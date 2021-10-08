import { AuthContext } from './Context'
import React, { useContext, useState } from 'react'

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native'

const Screens = () => {
  const base_url = 'https://serverngrokurl.ngrok.io'
  const { screen, setScreen } = useContext(AuthContext)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOTP] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'Login' ? (
        <View>
          <Image
            style={styles.logo}
            source={require('./images/tru-logo.png')}
          />
          <Text style={styles.heading}>Login</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Number ex. +448023432345"
            placeholderTextColor="#d3d3d3"
            keyboardType="phone-pad"
            value={phoneNumber}
            editable={!loading}
            onChangeText={(value) => setPhoneNumber(value.replace(/\s+/g, ''))}
          />
          {loading ? (
            <ActivityIndicator
              style={styles.spinner}
              size="large"
              color="#00ff00"
            />
          ) : (
            <TouchableOpacity onPress={LoginHandler} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <Image
            style={styles.logo}
            source={require('./images/tru-logo.png')}
          />
          <Text style={styles.heading}>Input OTP</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter OTP"
            placeholderTextColor="#d3d3d3"
            keyboardType="phone-pad"
            value={otp}
            editable={!loading}
            onChangeText={(value) => setOTP(value.replace(/\s+/g, ''))}
          />
          {loading ? (
            <ActivityIndicator
              style={styles.spinner}
              size="large"
              color="#00ff00"
            />
          ) : (
            <TouchableOpacity onPress={registerHandler} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
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
