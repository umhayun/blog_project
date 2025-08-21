
import { useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";
import { NumberInput } from "@/app/components/input/NumInput";

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
            <NumberInput
              label='전략 이동평균선 기간'
              value={reentrySettings.movingAveragePeriod}
              placeholder='기간을 입력해주세요.'
              onChange={(value) => setReentrySettings({...reentrySettings, movingAveragePeriod: parseInt(value) || 20})}
              min={5}
              max={200}
              unit="일"
              info="5 ~ 200까지 입력할 수 있습니다."
            />
            <NumberInput
              label='매수 이격도 기준'
              value={reentrySettings.buyDeviationRate}
              placeholder='매수 이격도 기준을 입력해주세요.'
              onChange={(value) => setReentrySettings({...reentrySettings, buyDeviationRate: parseInt(value) || 100})}
            />
            <NumberInput
              label='매도 이격도 기준'
              value={reentrySettings.sellDeviationRate}
              placeholder='매도 이격도 기준을 입력해주세요.'
              onChange={(value) => setReentrySettings({...reentrySettings, sellDeviationRate: parseInt(value) || 100})}
            />
          </div>
        )}
      </div>
    )
}       