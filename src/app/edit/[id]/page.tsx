'use client';
import { useParams, useRouter } from 'next/navigation';
import PostForm from '../../components/PostForm';
import { useDataStore } from '@/store/useDataStore';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const {selectedPost} = useDataStore()

  const handleUpdate = (title: string, content: string) => {
    console.log('수정된 글:', { id, title, content });
    router.push(`/${id}`);
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
