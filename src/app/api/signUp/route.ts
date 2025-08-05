import * as bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';
import { UserInfo } from "@/utils/CommonData"
import { supabase } from "@/database/supabaseClient";

export async function POST(request: Request) {
  const body = await request.json()
  const check = await supabase.from('users').select('id', {count:'exact'}).eq('id',body.id).single()
  if (!check.count) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
      await supabase.from('users').insert([{
        id:body.id,
        password: hashedPassword,
      }])
    return NextResponse.json({ "status":"ok", message: "회원가입이 완료되었습니다." });
  }
  else{
    return NextResponse.json({ "status":"fail", message: "존재하는 아이디입니다." });
  }  
}