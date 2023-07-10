import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
export const supabase = createClient(URL, API_KEY);

export const fetchCreators = async () => {
    const data = await supabase.from('creators').select('*').order('id', { ascending: true });
    return data;
}

export const addCreator = async (creator) => {
    const data = await supabase.from('creators').insert(creator).select().single();
    return data;
}

export const updateCreator = async (creator) => {
    const data = await supabase.from('creators').update(creator).eq('id', creator.id).throwOnError().select().single();
    return data;
}

export const deleteCreator = async (creator_id) => {
    const { status } = await supabase.from('creators').delete().eq('id', creator_id);
    return (status == 204) ? true : false;
}

export const getCraetor = async (creator_d) => {
    const data = await supabase.from('creators').select('*').eq('id', creator_d).single();
    return data;
}