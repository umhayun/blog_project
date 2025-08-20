
import { useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";

export const MomentumSection = () => {
    const [marketTiming, setMarketTiming] = useState<boolean>(false);
  
    const [indexSettings, setIndexSettings] = useState({
      index: 'S&P 500',
      baseType: '중간',
      baseValue: 'EMA',
      baseAmount: 1,
      baseUnit: '일'
    });
    const [econSettings, setEconSettings] = useState({
      econType: '변동성 (표준편차)',
      econValue: 'EMA', 
      econAmount: 20,
      econUnit: '일'
    });
    const [advancedSettings, setAdvancedSettings] = useState({
      priceWeight: 1.5,
      upWeight: 3
    });

    return (
      <div className="bg-black p-6 rounded-lg">
              <label className="flex items-center cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={marketTiming}
                  onChange={(e) => setMarketTiming(e.target.checked)}
                  className="mr-3 w-4 h-4 text-gray-400 bg-black border-gray-600 rounded focus:ring-gray-400"
                />
                <span className="text-white font-medium">모멘텀 마켓 타이밍</span>
                <span className="ml-2 text-gray-400 text-sm"><HelpCircle className="w-6 h-6 text-gray-500" /></span>
              </label>

              {marketTiming && (
                <div className="space-y-6 border-t border-gray-700 pt-6">
                  {/* 인덱스 설정 */}
                  <div>
                    <h4 className="text-white font-medium mb-4">인덱스</h4>
                    <div className="mb-4">
                      <select
                        value={indexSettings.index}
                        onChange={(e) => setIndexSettings({...indexSettings, index: e.target.value})}
                        className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:border-gray-400 focus:outline-none"
                      >
                        <option>S&P 500</option>
                        <option>NASDAQ</option>
                        <option>DOW JONES</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">기준선</label>
                        <select
                          value={indexSettings.baseType}
                          onChange={(e) => setIndexSettings({...indexSettings, baseType: e.target.value})}
                          className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                        >
                          <option>중간</option>
                          <option>높음</option>
                          <option>낮음</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">이동평균 (기준선)</label>
                        <select
                          value={indexSettings.baseValue}
                          onChange={(e) => setIndexSettings({...indexSettings, baseValue: e.target.value})}
                          className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                        >
                          <option>EMA</option>
                          <option>SMA</option>
                          <option>WMA</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">일수</label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={indexSettings.baseAmount}
                            onChange={(e) => setIndexSettings({...indexSettings, baseAmount: parseInt(e.target.value) || 1})}
                            className=" flex-1 bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                            min="1"
                            max="20"
                          />
                          <span className="ml-2 text-gray-400 text-sm">{indexSettings.baseUnit}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">1 ~ 20까지 입력할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>

                  {/* 경제선 설정 */}
                  <div>
                    <h4 className="text-white font-medium mb-4">경제선 (벤드)</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <select
                          value={econSettings.econType}
                          onChange={(e) => setEconSettings({...econSettings, econType: e.target.value})}
                          className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                        >
                          <option>변동성 (표준편차)</option>
                          <option>변동성 (분산)</option>
                        </select>
                      </div>
                      
                      <div>
                        <select
                          value={econSettings.econValue}
                          onChange={(e) => setEconSettings({...econSettings, econValue: e.target.value})}
                          className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                        >
                          <option>EMA</option>
                          <option>SMA</option>
                          <option>WMA</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">일수</label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={econSettings.econAmount}
                            onChange={(e) => setEconSettings({...econSettings, econAmount: parseInt(e.target.value) || 20})}
                            className=" flex-1 bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                            min="10"
                            max="60"
                          />
                          <span className="ml-2 text-gray-400 text-sm">{econSettings.econUnit}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">10 ~ 60까지 입력할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>

                  {/* 고급 설정 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">진입 가중치</label>
                      <input
                        type="number"
                        value={advancedSettings.priceWeight}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, priceWeight: parseFloat(e.target.value) || 1.5})}
                        className=" w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                        min="1"
                        max="5"
                        step="0.1"
                      />
                      <p className="text-gray-500 text-xs mt-1">1 ~ 5까지 입력할 수 있습니다.</p>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">청산 가중치</label>
                      <input
                        type="number"
                        value={advancedSettings.upWeight}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, upWeight: parseFloat(e.target.value) || 3})}
                        className=" w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                        min="1"
                        max="5"
                        step="0.1"
                      />
                      <p className="text-gray-500 text-xs mt-1">1 ~ 5까지 입력할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            )
}       