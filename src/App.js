import React from 'react'

import AuthContextProvider from './Context'

import { createClient } from '@supabase/supabase-js'

import { SUPABASE_URL, SUPABASE_PUBLIC_ANON } from '@env'
import Screens from './Screens'
const App = () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON)

  return (
    <AuthContextProvider>
      <Screens />
    </AuthContextProvider>
  )
}
export default App
export { supabase }
