"use server";
import createSupabaseServerClient from "../supabase";
export async function signUpWithEmailAndPassword(data:{
    email:string,
    password:string,
    confirm:string,
}){
    const supabase=await createSupabaseServerClient();
    const result=await supabase.auth.signUp({email:data.email,password:data.password});
    return JSON.stringify(result);
}