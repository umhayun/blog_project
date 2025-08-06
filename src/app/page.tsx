// app/page.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@/utils/CommonData';
import { useDataStore } from '@/store/useDataStore';

export default function PostListPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState(Cookies.get('user_id'))
  const [showPopular, setShowPopular] = useState(false);
  const { posts, setPosts,setSelectedPost } = useDataStore()

  const getData = async (id: string) => {
    const result = await axios.get(`/api/contents?id=${id}`)
    if (result.status===200) {
      setPosts(result.data.data)
    }
  }
  const handleLogout = () => {
    Cookies.remove('user_id')
    setLoginId(Cookies.get('user_id'))
  }

  const handleClick = async (post: Post) => {
    router.push(`/detail/${post.no}`)
  }

  const handleHotPosts = async () => {
    setShowPopular(!showPopular)
  }

  useEffect(()=>{
    console.log(showPopular)
    setSelectedPost(null)
    getData(showPopular?'top':'all')
    
  },[showPopular])

  const buttonColor = !showPopular? 'bg-yellow-500 hover:bg-yellow-600':'bg-gray-400 hover:bg-gray-500'

  return (
    <div className="relative min-h-screen">
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
            className="hidden md:inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            글 작성
          </Link>
        </div>
      </div>
      <div>
          <button
            onClick={handleHotPosts}
            className={`hidden md:inline-block ${buttonColor} text-white px-4 py-2 rounded-md mb-2.5`}
          >
            {showPopular ? '📋 전체글 보기' : '🔥 인기글 보기'}
          </button>
      </div>
      <table className="w-full text-sm text-gray-800 border-t border-collapse">
        <thead className="text-xs text-gray-500 bg-gray-50 border-b">
          <tr>
            <th className="w-150 px-4 py-2 text-center">제목</th>
            <th className="w-50 px-4 py-2 text-center">작성자</th>
            <th className="w-50 px-4 py-2 text-center">작성일</th>
            <th className="w-50 px-4 py-2 text-center">조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.no}
              onClick={() => handleClick(post)}
              className="cursor-pointer hover:bg-gray-50 h-20 border-b border-gray-300"
            >
              <td className="px-4 py-2 text-center">{post.title}</td>
              <td className="px-4 py-2 text-center">{post.writer}</td>
              <td className="px-4 py-2 text-center">{post.create_date.split('T')[0]}</td>
              <td className="px-4 py-2 text-center">{post.hits}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
