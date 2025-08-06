import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/database/supabaseClient';

export async function POST(request: NextRequest) {
    const body = await request.json()    
    const response = await supabase.from('comments').insert([body])
    return NextResponse.json({"status":"fail","message":"댓글등록을 완료했습니다."})

}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const response = await supabase.from('comments').select('*').eq('post_id', Number(id))
  if (response.status === 200) {
    return NextResponse.json({
      status: 'ok',
      data: response.data,
      message: '데이터 로딩 성공',
    })
  } else {
    return NextResponse.json(
      {
        status: 'fail',
        message: '데이터 로딩 실패',
      })
  }
}