'use client';
import { useParams, useRouter } from 'next/navigation';
import PostForm from '../../components/PostForm';
import { useDataStore } from '@/store/useDataStore';
import axios from 'axios';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const {selectedPost} = useDataStore()

  const handleUpdate = async (title: string, content: string) => {
    console.log(content.replace('/n','/n'))
    const response = await axios.put('/api/contents',JSON.stringify({id,title,content}))
    if (response.data.status==='ok') {
      router.push(`/detail/${id}`);
    } else {
      alert(response.data.message)
    }
    
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">글 수정</h1>
      <PostForm
        initialTitle={selectedPost?.title}
        initialContent={selectedPost?.content}
        onSubmit={handleUpdate}
        buttonLabel="수정"
      />
    </div>
  );
}
