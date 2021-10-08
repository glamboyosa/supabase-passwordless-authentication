import React from 'react'

import AuthContextProvider from './Context'

import { createClient } from '@supabase/supabase-js'

import { SUPABASE_URL, SUPABASE_PUBLIC_ANON } from '@env'
const App = () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON)

  return <AuthContextProvider></AuthContextProvider>
}
export default App
export { supabase }
