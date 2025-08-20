'use client'
import { useDataStore } from '@/store/useDataStore';
import React, { useState, useEffect, useMemo } from 'react';
import SubHeader from '../components/SubHeader';
import { HelpCircle } from "lucide-react";
import { NumberInput } from '../components/input/NumInput';
import { SelectInput } from '../components/input/SelectInput';
import { AssetGroupSection } from './components/AssetGroupSection';
import { MomentumSection } from './components/MomentumSection';
import { ReentrySection } from './components/ReentrySection';

export default function QuantusClone() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('전략명칭 (정적자산배분)');
  const [strategyName, setStrategyName] = useState<string>('');
  const [initialInvestment, setInitialInvestment] = useState<string>('');
  const [rebalancingPeriod, setRebalancingPeriod] = useState<string>('추가 리밸런싱 선택해주세요.');
  const [bandRebalancing, setBandRebalancing] = useState<string>('');
  const [selectedSidebar, setSelectedSidebar] = useState<string>('자산배분');


  // Zustand 스토어에서 데이터 가져오기
  const { isScrolled, setIsScrolled, allAsset } = useDataStore();



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sidebarItems: string[] = [
    '팩터 전략',
    '자산배분',
    '전략 예시',
    '파트너십'
  ];



  return (
    <div className="bg-black text-white min-h-screen">
      <SubHeader/>
      <div className="flex">
        <aside 
          className={`sticky left-0 w-60 bg-black border-r border-gray-700 transition-all duration-300 h-fit ${
            isScrolled ? 'top-16' : 'top-44'
          }`}
        >
          <div className="p-4">
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <div 
                  key={item}
                  onClick={() => setSelectedSidebar(item)}
                  className={`px-4 py-3 cursor-pointer rounded hover:bg-black ${
                    selectedSidebar === item ? 'text-white border-l-2 border-white bg-black' : 'text-gray-400'
                  }`}
                >
                  {item}
                </div>
              ))}
            </nav>
            <div className="mt-8 p-4 border-t border-gray-700">
              <div className="text-white font-medium mb-2">이용 가이드 🔗</div>
              <div className="text-gray-400 text-sm">
                퀀트가 처음이신가요?<br />
                이용 가이드로 쉽게 시작해보세요.
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 w-[80%]`}
        >
          <div 
            className={`sticky z-20 bg-black p-6 rounded-lg mb-6 transition-all duration-300 ${
              isScrolled ? 'top-13' : 'top-44'
            }`}
          >
            <h2 className="text-xl font-semibold text-white mb-4">자산배분</h2>
            <input
              type="text"
              placeholder="전략 이름을 입력해주세요."
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none"
            />
          </div>

          {/* Scrollable Content */}
          <div className="space-y-6 pb-20">
            {/* 자산배분 */}
            <SelectInput
              label='자산배분 설정 [필수]'
              value={selectedStrategy}
              options={['전략명칭 (정적자산배분)']}
              onChange={(value) => setSelectedStrategy(value)}
            />

            <NumberInput
              label='초기 투자 금액'
              value={initialInvestment}
              placeholder='초기 투자 금액을 입력해주세요.'
              onChange={(value) => setInitialInvestment(value)}
              unit='만원'
            />

            <SelectInput
              label='추가 리밸런싱'
              value={rebalancingPeriod}
              options={['분기별', '월별', '반기별', '매년']}
              onChange={(value) => setRebalancingPeriod(value)}
            />

            <NumberInput
              label='밴드 리밸런싱'
              value={bandRebalancing}
              placeholder='밴드 리밸런싱 기준을 입력해주세요.'
              onChange={(value) => setBandRebalancing(value)}
              unit='%'
              info='0 ~ 100까지 입력할 수 있습니다. (0 입력시 비활성화)'
            />
            <AssetGroupSection />
            <div className="bg-black p-6 rounded-lg">
              <MomentumSection />
              <ReentrySection />
            </div>
          </div>
        </main>
          <aside 
            className={`sticky right-6 w-32 z-30 transition-all duration-300 p-4  h-fit ${
               isScrolled ? 'top-16' : 'top-44'}`}
          >
            <div className="bg-black rounded-lg p-2 space-y-2">
              <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-3 rounded text-sm font-medium">
                저장하기
              </button>
              <button className="w-full border border-gray-600 hover:bg-black text-white py-2 px-3 rounded text-sm">
                백테스트
              </button>
              <button className="w-full border border-gray-600 hover:bg-black text-white py-2 px-3 rounded text-sm">
                포트 추출
              </button>
            </div>
          </aside>
      </div>
    </div>
  );
}