'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useDataStore } from '@/store/useDataStore';
import { Post, Comment } from '@/utils/CommonData';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '@/app/components/Header';

export default function PostDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const loginId = Cookies.get('user_id')
  const {selectedPost, setSelectedPost} = useDataStore()
  const [data, setData] = useState< Post | undefined >(undefined)
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([])

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
    if (!loginId) {
      alert('로그인이필요합니다')
      return
    }
    const response = await axios.post('/api/comments',{
      post_id: id,
      writer:loginId,
      contents:comment,
    })
    if (response.status===200) {
      alert(response.data.message)
      setComment('')
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

  const handleCommentDelete =async (commentId: number) => {
    if(confirm('삭제하시겠습니까?')) {
      const response = await axios.delete(`/api/comments?id=${commentId}`)
      if (response.data.status==='ok') {
        getData()
      }
    }  
  }

const grant = loginId === data?.writer || loginId === 'admin'

return (
  <div className="space-y-6">
    <Header/>
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
        <div className='border border-gray-200 rounded-md px-4 py-6'>
          <div >
            <h2 className="text-2xl font-bold mb-5">{data.title}</h2>
            <div className="small mb-5 text-gray-500  w-full flex justify-between"> 
              <small className="text-left w-fit">작성자: {data.writer} &nbsp; 조회수: {data.hits}</small>
              <small className="text-right">{data.create_date.replace('T',' ').split('.')[0]}</small>
            </div>
            <hr className='text-gray-300' />
            <p className="m-5 text-gray-700 whitespace-pre-wrap">{data.content}</p>
          </div>
          <hr className='text-gray-300' />
          <div >
            <h2 className="text-xl font-semibold mt-6 mb-6 ">댓글</h2>
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
            <ul className="space-y-4 mt-5">
              {comments.map((data) => (
                <li key={data.id} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-900 font-medium">{data.contents}</p>
                    {(data.writer===loginId || loginId === 'admin') && 
                      <button 
                        onClick={() => handleCommentDelete(data.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold cursor-pointer"
                      >
                        삭제
                      </button>
                    }
                  </div>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span className="font-medium">작성자: {data.writer}</span>
                    <span>{data.create_date.replace('T', ' ').split('.')[0]}</span>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      </>
    ) : (
      <div className="text-center py-20 text-gray-500">불러오는 중입니다...</div>
    )}
  </div>
);

}
