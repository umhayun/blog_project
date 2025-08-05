'use client';
import { useRouter } from 'next/navigation';
import PostForm from '../components/PostForm';
import Cookies from 'js-cookie';
import axios
 from 'axios';
export default function NewPostPage() {
  const router = useRouter();
  const loginId = Cookies.get('user_id');
  const handleSubmit = (title: string, content: string) => {
    axios.post('/api/contents',{
        title,
        content,
        writer: loginId,
        hits:0,
    })
    router.push('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">글 작성</h1>
      <PostForm onSubmit={handleSubmit} buttonLabel="작성" />
    </div>
  );
}
