'use client';
import { useDataStore } from '@/store/useDataStore';
import { useEffect, useState } from 'react';

export default function SubHeader() {
  const {isScrolled, setIsScrolled} = useDataStore()

  return (
      <nav 
        className={`sticky left-0 right-0 z-40 bg-black border-b border-gray-700 transition-all duration-300 ${
          isScrolled ? '-top-32 opacity-0' : 'top-16 opacity-100'
        }`}
      >
        <div className="px-6 py-3">
          <div className="flex space-x-8">
            <button className="text-white border-b-2 border-white pb-2">주식 퀀트</button>
            <button className="text-gray-400 hover:text-white pb-2">코인 퀀트</button>
          </div>
        </div>
        
        {/* Sub Navigation */}
        <div className="px-6 py-2 border-t border-gray-700">
          <div className="flex space-x-8">
            <button className="text-white border-b-2 border-white pb-2 text-sm">전략 설계</button>
            <button className="text-gray-400 hover:text-white pb-2 text-sm">내 투자</button>
            <button className="text-gray-400 hover:text-white pb-2 text-sm">전략</button>
          </div>
        </div>
      </nav>
  );
}
