import { SUPABASE_URL, SUPABASE_PUBLIC_ANON } from '@env'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
})

export { supabase }
