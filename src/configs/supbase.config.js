const { createClient } = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
class Supabae {
    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY
        );
    }
    getSupabase() {
        return this.supabase;
    }
}

module.exports = supabase;
