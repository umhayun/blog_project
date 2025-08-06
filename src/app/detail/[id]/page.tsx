// app/[id]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useDataStore } from '@/store/useDataStore';
import { Post, Comment } from '@/utils/CommonData';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
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
  const handleDelete = async () => {
    if(confirm('삭제하시겠습니까?')) {
      const response = await axios.delete(`/api/contents?id=${id}`)
      if (response.data.status==='ok') {
        router.push('/')
      }
    }  
  }
const grant = loginId === data?.writer || loginId === 'admin'
return (
  <div className="space-y-6">
    {data ? (
      <>
        <div className="flex gap-2 justify-end">
          {grant && 
            <>       
              <Link 
                href={`/edit/${id}`} 
                className="text-sm px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
              >
                수정
              </Link>
              <Link 
                href={''} 
                onClick={handleDelete}
                className="text-sm px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                삭제
              </Link>
            </>
          }

          <Link 
            href="/" 
            className="inline-block text-sm px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-center"
          >
            목록으로
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-5">{data.title}</h2>
          <div className="small mb-5 text-gray-500  w-full flex justify-between"> 
            <p className="text-left w-fit">작성자: {data.writer} 조회수: {data.hits}</p>
            <small className="text-right">{data.create_date.split('T')[0]}</small>
          </div>
          <hr />
          <p className="mt-5 text-gray-700 whitespace-pre-wrap">{data.content}</p>
        </div>
        <div >
          <h2 className="text-xl font-semibold mt-6 mb-2 ">댓글</h2>
          <div className="flex h-20 gap-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="댓글을 입력하세요"
            />
            <button
              onClick={handleCommentSubmit}
              className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-nowrap"
            >
              등록
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {comments.map((data) => (
            <li key={data.id} className="bg-white p-3 border rounded-md text-sm text-gray-800 shadow">
              {data.contents}
              <div className="small text-gray-500 w-full flex justify-between"> 
                <small className="text-left w-fit">작성자: {data.writer}</small>
                <small className="text-right">{data.create_date.split('T')[0]}</small>
              </div>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <div className="text-center py-20 text-gray-500">불러오는 중입니다...</div>
    )}
  </div>
);

}
