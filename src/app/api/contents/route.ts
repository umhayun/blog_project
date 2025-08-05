import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/database/supabaseClient';

export async function POST(request: NextRequest) {
    const body = await request.json()    
    const response = (await supabase.from('posts').insert([body]))
    return NextResponse.json({"status":"fail","message":"글등록을 완료했습니다."})
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  let response
  const oneMonthAgo = new Date() 
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  if (id === '-1' || !id) {
    response = await supabase.from('posts').select('*').gte('create_date', oneMonthAgo.toISOString()).order('hits', { ascending: false }).limit(3)
  } else {
    await supabase.rpc('increment_post_hits', {post_no_param: parseInt(id)})
    response = await supabase.from('posts').select('*').eq('no', Number(id)).single()
  }

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
