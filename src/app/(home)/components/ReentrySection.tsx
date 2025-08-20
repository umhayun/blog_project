
import { useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";

export const ReentrySection = () => {
      const [reentryMarketTiming, setReentryMarketTiming] = useState<boolean>(false);
  
      // 재진입 마켓타이밍 설정값들
      const [reentrySettings, setReentrySettings] = useState({
        movingAverageMethod: 'SMA',
        movingAveragePeriod: 20,
        buyDeviationRate: 100,
        sellDeviationRate: 100
      });
    return (
      <div className="bg-black p-6 rounded-lg">
              <label className="flex items-center cursor-pointer mb-4 mt-6">
                <input
                  type="checkbox"
                  checked={reentryMarketTiming}
                  onChange={(e) => setReentryMarketTiming(e.target.checked)}
                  className="mr-3 w-4 h-4 text-gray-400 bg-black border-gray-600 rounded focus:ring-gray-400"
                />
                <span className="text-white font-medium">재진입 마켓 타이밍</span>
                <span className="ml-2 text-gray-400 text-sm"><HelpCircle className="w-6 h-6 text-gray-500" /></span>
              </label>

              {reentryMarketTiming && (
                <div className="space-y-6 border-t border-gray-700 pt-6">
                  {/* 전략 이동평균선 방법 */}
                  <div>
                    <h4 className="text-white font-medium mb-4">전략 이동평균선 방법</h4>
                    <div className="flex space-x-6">
                      {['SMA', 'EMA', 'HMA'].map((method) => (
                        <label key={method} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="movingAverageMethod"
                            value={method}
                            checked={reentrySettings.movingAverageMethod === method}
                            onChange={(e) => setReentrySettings({...reentrySettings, movingAverageMethod: e.target.value})}
                            className="mr-2 w-4 h-4 text-gray-400 bg-black border-gray-600 focus:ring-gray-400"
                          />
                          <span className="text-white text-sm">{method}</span>
                          <span className="ml-1 text-gray-400 text-sm"><HelpCircle className="w-6 h-6 text-gray-500" /></span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 전략 이동평균선 기간 */}
                  <div>
                    <h4 className="text-white font-medium mb-4">전략 이동평균선 기간</h4>
                    <div className="relative items-center">
                      <input
                        type="number"
                        value={reentrySettings.movingAveragePeriod}
                        onChange={(e) => setReentrySettings({...reentrySettings, movingAveragePeriod: parseInt(e.target.value) || 20})}
                        className="w-full bg-black border border-gray-600 rounded px-3 py-2 pr-8 text-white focus:border-gray-400 focus:outline-none"
                        min="5"
                        max="200"
                      />
                      <span className="absolute top-2 right-3 text-gray-400">일</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">5 ~ 200까지 입력할 수 있습니다.</p>
                  </div>

                  {/* 매수 이격도 기준 */}
                  <div>
                    <h4 className="text-white font-medium mb-4">매수 이격도 기준</h4>
                    <input
                      type="number"
                      value={reentrySettings.buyDeviationRate}
                      onChange={(e) => setReentrySettings({...reentrySettings, buyDeviationRate: parseInt(e.target.value) || 100})}
                      className=" w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:border-gray-400 focus:outline-none"
                    />
                  </div>

                  {/* 매도 이격도 기준 */}
                  <div>
                    <h4 className="text-white font-medium mb-4">매도 이격도 기준</h4>
                    <input
                      type="number"
                      value={reentrySettings.sellDeviationRate}
                      onChange={(e) => setReentrySettings({...reentrySettings, sellDeviationRate: parseInt(e.target.value) || 100})}
                      className=" w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )
}       