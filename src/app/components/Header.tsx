// app/page.tsx
'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Header() {
  const [loginId, setLoginId] = useState(Cookies.get('user_id'))
  const handleLogout = () => {
    Cookies.remove('user_id')
    setLoginId(Cookies.get('user_id'))
  }

  return (
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">My BLOG</h1>
        <div className="flex gap-2">
          {loginId === undefined ?
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300"
          >
            로그인
          </Link>
          :
          <>
            <p className='content-center'>{loginId} 님 </p>
            <Link
                onClick={handleLogout}
                href={''}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300">
              로그아웃
            </Link>
          </>
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
