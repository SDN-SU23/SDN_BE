const { createClient } = require('@supabase/supabase-js');
const { create } = require('lodash');

// Create a single supabase client for interacting with your database
const supabase = createClient(global.config.supabase.url, global.config.supabase.key);

module.exports = supabase;
