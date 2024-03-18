const { createClient } = require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database
const supabase = createClient(
    global.config.supabase.url,
    global.config.supabase.key
)

// supabase.storage
//     .from('SDN')
//     .list()
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err))

module.exports = supabase
