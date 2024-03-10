const { createClient } = require('@supabase/supabase-js');
const { create } = require('lodash');

// Create a single supabase client for interacting with your database
const supabase = createClient(global.config.supabase.url, global.config.supabase.key);

const createSignedUrl = async () => {
    try {
        const { data, error } = await supabase.storage
            .from('SDN')
            .createSignedUrl('/baohc.jpg', 20, { transform: { width: 100, height: 100 } });
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

createSignedUrl();

module.exports = supabase;
