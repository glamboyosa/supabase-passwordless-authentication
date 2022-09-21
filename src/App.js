import React, { useState } from 'react'

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { supabase } from './lib/supabase'

import TruSdkReactNative from '@tru_id/tru-sdk-react-native'

const App = () => {
  const baseURL = '<YOUR_LOCAL_TUNNEL_URL>'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const signUpHandler = async () => {
    setLoading(true)
  
    // check if we have coverage using the `isReachable` function
    try {
      const reachabilityResponse = await TruSdkReactNative.openWithDataCellular(
        'https://eu.api.tru.id/public/coverage/v0.1/device_ip'
      );
  
      console.log(reachabilityResponse);
      let isMNOSupported = false
  
      if ('error' in reachabilityResponse) {
        errorHandler({
          title: 'Something went wrong.',
          message: 'MNO not supported',
        })
        setLoading(false)
  
        return
      } else if ('http_status' in reachabilityResponse) {
        let httpStatus = reachabilityResponse.http_status;
        if (httpStatus === 200 && reachabilityResponse.response_body !== undefined) {
          let body = reachabilityResponse.response_body;
          console.log('product => ' + JSON.stringify(body.products[0]));
          isMNOSupported = true;
        } else if (httpStatus === 400 || httpStatus === 412 || reachabilityResponse.response_body !== undefined) {
          errorHandler({
            title: 'Something went wrong.',
            message: 'MNO not supported',
          })
          setLoading(false)
  
          return
        }
      }
  
      let isPhoneCheckSupported = false
  
      if (isMNOSupported === true) {
        reachabilityResponse.response_body.products.forEach((product) => {
          console.log('supported products are', product)
  
          if (product.product_name === 'Phone Check') {
            isPhoneCheckSupported = true
          }
        })
      }
  
      // If the PhoneCheck API is supported, proceed with PhoneCheck verification and Supabase Auth
      if (isPhoneCheckSupported) {
        const phoneCheckResponse = await createPhoneCheck(phoneNumber)

        const checkResponse = await TruSdkReactNative.openWithDataCellular(
          phoneCheckResponse.check_url
        );

        console.log('......');
        console.log(checkResponse);
        const phoneCheckResult = await completePhoneCheck(checkResponse.response_body.check_id, checkResponse.response_body.code)

        console.log('-------');
        console.log(phoneCheckResult);
        //  if we do not have a match, do not proceed with Supabase auth
        if (!phoneCheckResult.match) {
          setLoading(false)
          errorHandler({
            title: 'Something Went Wrong',
            message: 'PhoneCheck verification unsuccessful.',
          })

          return
        }

        // proceed with Supabase Auth
        const { session, error } = await supabase.auth.signUp({
          email,
          password,
        })
  
        if (!error && session) {
          setLoading(false)
          successHandler()
  
          return
        } else {
          console.log(JSON.stringify(error))
          setLoading(false)
          errorHandler({ title: 'Something went wrong.', message: error.message })
  
          return
        }
      } else {
        const { session, error } = await supabase.auth.signUp({
          email,
          password,
        })
  
        if (!error && session) {
          setLoading(false)
          successHandler()
  
          return
        } else {
          setLoading(false)
          errorHandler({ title: 'Something went wrong.', message: error.message })
  
          return
        }
      }
    } catch (e) {
      setLoading(false)
      errorHandler({ title: 'Something went wrong', message: e.message })
    }
  }


  const errorHandler = ({ title, message }) => {
    return Alert.alert(title, message, [
      {
        text: 'Close',
        onPress: () => console.log('Alert closed'),
      },
    ])
  }
  
  const successHandler = () => {
    Alert.alert('Login Successful', '✅', [
      {
        text: 'Close',
        onPress: () => console.log('Alert closed'),
      },
    ])
  }

  const createPhoneCheck = async (phoneNumber) => {
    const body = { phone_number: phoneNumber }
  
    console.log('tru.ID: Creating PhoneCheck for', body)
  
    const response = await fetch(`${baseURL}/v0.2/phone-check`, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  
    const json = await response.json()
  
    return json
  }

  const completePhoneCheck = async (checkId, code) => {
    const response = await fetch(`${baseURL}/v0.2/phone-check/exchange-code`, {
      method: 'POST',
      body: JSON.stringify({
        check_id: checkId,
        code: code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
  
    return json
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={require('./images/tru-logo.png')} />
        <Text style={styles.heading}>Sign Up</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#d3d3d3"
          keyboardType="default"
          value={email}
          editable={!loading}
          onChangeText={(value) => setEmail(value.replace(/\s+/g, ''))}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#d3d3d3"
          keyboardType="default"
          secureTextEntry
          value={password}
          editable={!loading}
          onChangeText={(value) => setPassword(value.replace(/\s+/g, ''))}
        />
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
          <TouchableOpacity onPress={signUpHandler} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
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
    marginBottom: 10,
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
    width: 0.35 * Dimensions.get('window').width,
  },
  buttonText: {
    color: '#fff',
  },
})

export default App
