'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    id: '',
    password: '',
    confirm: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return;
    }
    const response = await axios.post('/api/signUp',form)
    if (response.data.status==='ok') {
        alert('회원가입 성공!')
        router.push('/login')
    } else {
        alert(response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">회원가입</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition"
          >
            회원가입
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          이미 계정이 있으신가요?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-blue-500 hover:underline"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}
