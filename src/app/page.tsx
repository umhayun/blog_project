// app/page.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@/utils/CommonData';
import { useDataStore } from '@/store/useDataStore';
const mockPosts = [
  { id: '1', title: '첫 번째 글', summary: '요약입니다.' },
  { id: '2', title: '두 번째 글', summary: '다른 요약입니다.' },
];

export default function PostListPage() {
  const router = useRouter();
  const [loginId, setLoginId] =useState(Cookies.get('user_id'))
  const { posts, setPosts,setSelectedPost } = useDataStore()
  
  const handleLogout = () => {
    Cookies.remove('user_id')
    setLoginId(Cookies.get('user_id'))
  }

  const handleClick = async (post: Post) => {
    router.push(`/detail/${post.no}`)
  }

  useEffect(()=>{
    const getData = async () => {
      const result = await axios.get('/api/contents?id=-1')
      if (result.status===200) {
        setPosts(result.data.data)
      }
    }
    getData()
    setSelectedPost(null)
  },[])

  return (
    <div className="relative min-h-screen">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">블로그</h1>
        <div className="flex gap-2">
          {loginId === undefined ?
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300"
          >
            로그인
          </Link>
          :
          <Link
              onClick={handleLogout}
              href={''}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300">
            로그아웃
          </Link>
          }
          <Link
            href="/create"
            className="hidden md:inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            글 작성
          </Link>
        </div>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <button
            onClick={() => handleClick(post)}
            key={post.no}
            className="p-4 bg-white rounded-md shadow w-full cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-left">{post.title}</h3>
              <small className="text-right">{post.create_date.split('T')[0]}</small>
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
}
