import React, { useState } from 'react'

import TruSDK from '@tru_id/tru-sdk-react-native'

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

const App = () => {
  return (
    <View>
      <Image style={styles.logo} source={require('./images/tru-logo.png')} />
      <Text style={styles.heading}>Sign Up</Text>
    </View>
  )
}
export default App
export { supabase }
