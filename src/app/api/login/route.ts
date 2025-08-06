import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from "bcryptjs";
import { supabase } from '@/database/supabaseClient';

export async function POST(request: NextRequest) {
    const body = await request.json()    
    const check = await supabase.from('users').select('*', {count:'exact'}).eq('id',body.id).single()
    if (!check.count) {
      return NextResponse.json({"status":"fail","message":"회원정보가 일치하지 않습니다."})
    }
    else {
      const pwCheck = await bcrypt.compare(body.password, check.data.password)
      
      if (!pwCheck) {
        return NextResponse.json({"status":"fail","message":"회원정보가 일치하지 않습니다."})
      }
      else {
        const response = NextResponse.json({
          "status":"ok",
          "message":"로그인에 성공했습니다.",
          "userId": check.data.id  
        });
        
        response.cookies.set('user_id', check.data.id, {
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'strict',    
          maxAge: 60 * 60 * 24, 
          path: '/'              
        });
        
        return response
      }           
    }
}