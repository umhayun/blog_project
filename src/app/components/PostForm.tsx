'use client';
import { useState } from 'react';
import Link from 'next/link'

type PostFormProps = {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
  buttonLabel?: string;
};

export default function PostForm({
  initialTitle = '',
  initialContent = '',
  onSubmit,
  buttonLabel = '저장',
}: PostFormProps) {

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 h-40"
      />
      <button
        onClick={() => onSubmit(title, content)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md h-10 mr-1.5"
      >
        {buttonLabel}
      </button>      
      <Link 
        href="/" 
        className=" bg-gray-300 hover:bg-blue-600 text-white px-4 py-2 rounded-md h-10 inline-block"
      >
        취소
      </Link>
    </div>
  );
}
