// app/page.tsx
'use client';
import axios from 'axios';
import { Post } from '@/utils/CommonData';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/useDataStore';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function PostListPage() {
  const router = useRouter()
  const [showPopular, setShowPopular] = useState(false)
  const { posts, setPosts,setSelectedPost } = useDataStore()

  const getData = async (id: string) => {
    const result = await axios.get(`/api/contents?id=${id}`)
    if (result.status===200) {
      setPosts(result.data.data)
    }
  }

  const handleClick = async (post: Post) => {
    router.push(`/detail/${post.no}`)
  }

  const handleHotPosts = async () => {
    setShowPopular(!showPopular)
  }

  useEffect(()=>{
    setSelectedPost(null)
    getData(showPopular?'top':'all')
  },[showPopular])

  const buttonColor = !showPopular? 'bg-yellow-500 hover:bg-yellow-600':'bg-gray-400 hover:bg-gray-500'

  return (
    <div className="relative min-h-screen">
      <Header/>
      <div>
          <button
            onClick={handleHotPosts}
            className={` md:inline-block ${buttonColor} text-white px-4 py-2 rounded-md mb-2.5`}
          >
            {showPopular ? '전체글 보기' : '인기글 보기'}
          </button>
      </div>
      <table className="w-full text-sm text-gray-800 border-t border-collapse">
        <thead className="font-bold text-gray-500 bg-gray-50 border-b ">
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
              className="cursor-pointer hover:bg-gray-50 h-20 border-b border-gray-300 text-1xl"
            >
              <td className="px-4 py-2 text-center">{post.title}</td>
              <td className="px-4 py-2 text-center">{post.writer}</td>
              <td className="px-4 py-2 text-center">{post.create_date.replace('T',' ').split('.')[0]}</td>
              <td className="px-4 py-2 text-center">{post.hits}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
