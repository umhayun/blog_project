'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Header() {
  const [loginId, setLoginId] = useState<string | undefined>()

  useEffect(()=>{
    setLoginId(Cookies.get('user_id'))
  },[])

  const handleLogout = () => {
    Cookies.remove('user_id')
    setLoginId(undefined)
  }

  return (
      <div className="flex justify-between items-center py-4">
        <Link href={'/'}><h1 className="text-2xl font-bold">My BLOG</h1></Link>
        <div className="flex gap-2 py-3">
          <p className='content-center'>{loginId}</p>
          {loginId === undefined ?
            <Link
                href="/login"
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300  hover:bg-gray-200"
            >
                로그인
            </Link>
            :
            <Link
                onClick={handleLogout}
                href={''}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200">
              로그아웃
            </Link>
          }
          <Link
            href="/create"
            className=" md:inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            글 작성
          </Link>
        </div>
      </div>
  );
}
