'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [selectedHeaderMenu, setSelectedHeaderMenu] = useState<string>('파운드리');

  return (
      <header className="sticky top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 mx-auto">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8 ">
            <h1 className="text-xl font-bold text-white">🔷 Quantus</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button 
                className={`px-3 py-1 flex items-center gap-1 ${
                  selectedHeaderMenu === '파운드리' 
                    ? 'text-white font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setSelectedHeaderMenu('파운드리')}
              >
                파운드리 
                <span className={`transition-transform duration-200 ${
                  selectedHeaderMenu === '파운드리' 
                    ? 'transform rotate-180' 
                    : 'group-hover:rotate-180'
                }`}>
                  ▲
                </span>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-black border border-gray-600 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/foundry/quant-strategy" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">퀀트 전략</Link>
                  <Link href="/foundry/portfolio-analysis" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">포트폴리오 분석</Link>
                  <Link href="/foundry/backtesting" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">백테스팅</Link>
                  <Link href="/foundry/risk-management" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">리스크 관리</Link>
                  <div className="border-t border-gray-600 my-1"></div>
                  <Link href="/foundry/api-docs" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">API 문서</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button 
                className={`px-3 py-1 flex items-center gap-1 ${
                  selectedHeaderMenu === '고객지원' 
                    ? 'text-white font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setSelectedHeaderMenu('고객지원')}
              >
                고객지원 
                <span className={`transition-transform duration-200 ${
                  selectedHeaderMenu === '고객지원' 
                    ? 'transform rotate-180' 
                    : 'group-hover:rotate-180'
                }`}>
                  ▲
                </span>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-black border border-gray-600 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/support/faq" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">자주 묻는 질문</Link>
                  <Link href="/support/guide" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">이용 가이드</Link>
                  <Link href="/support/contact" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">문의하기</Link>
                  <div className="border-t border-gray-600 my-1"></div>
                  <Link href="/support/chat" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">채팅 상담</Link>
                  <Link href="/support/phone" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">전화 상담</Link>
                </div>
              </div>
            </div>

            <button className="text-gray-300 hover:text-white px-3 py-1">서울권 구매</button>
            <button className="bg-gray-600 text-white px-3 py-1 rounded">VIP</button>
            <button className="border border-gray-600 text-white px-4 py-1 rounded hover:bg-black">로그인</button>
          </div>
        </div>
      </header>
  );
}
