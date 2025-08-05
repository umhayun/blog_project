// app/[id]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useDataStore } from '@/store/useDataStore';
import { Post } from '@/utils/CommonData';
import axios from 'axios';
import { Comment } from '@/utils/CommonData';
import Cookies from 'js-cookie';
export default function PostDetailPage() {
  const { id } = useParams();
  const loginId = Cookies.get('user_id')
  const {selectedPost, setSelectedPost} = useDataStore()
  const [data, setData] = useState< Post | undefined >(undefined)
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const getData = async () => {
    const response = await axios.get(`/api/contents?id=${id}`)
    if (response.status===200) {
      setData(response.data.data)
      setSelectedPost(response.data.data)
    }
    const commentResponse = await axios.get(`/api/comments?id=${id}`)
    if (commentResponse.status===200) {
      setComments(commentResponse.data.data)
    }
  }

  useEffect(()=>{
    if (!id) return
    getData()
  },[])

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    if (!selectedPost) return;
    const response = await axios.post('/api/comments',{
      post_id: id,
      writer:selectedPost.writer,
      contents:comment,
    })
    if (response.status===200) {
      alert(response.data.message)
      setComment('');
      getData()
    }
  };
  return (
    <div className="space-y-6">
     { data && <div >
        <h2 className="text-2xl font-bold mb-5">{data.title}</h2>
        <div className="small mb-5 text-gray-500  w-full flex justify-between"> 
          <p className="text-left w-fit">작성자: {data.writer} 조회수: {data.hits}</p>
          <small className="text-right">{data.create_date.split('T')[0]}</small>
        </div>
        <hr />
        <p className="mt-5 text-gray-700">{data.content}</p>
      </div>
      }
      <div className="flex gap-2">
        {loginId===data?.writer &&        
          <Link 
            href={`/edit/${id}`} 
            className="text-sm px-3 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
          >
            수정
          </Link>
          }

        <Link 
        href="/" 
        className="inline-block text-sm px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400 text-center"
        >
        목록으로
        </Link>
      </div>

      {/* 댓글 입력 */}
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">댓글</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-md p-2 h-20"
          placeholder="댓글을 입력하세요"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer"
        >
          등록
        </button>
      </div>

      {/* 댓글 목록 */}
      <ul className="space-y-2">
        {comments.map((data) => (
          <li key={data.id} className="bg-white p-3 border rounded-md text-sm text-gray-800 shadow">
            {data.contents}
            <div className="small text-gray-500  w-full flex justify-between"> 
              <small className="text-left w-fit">작성자: {data.writer}</small>
              <small className="text-right">{data.create_date.split('T')[0]}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
