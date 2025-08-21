
import { useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";
import { SelectInput } from "@/app/components/input/SelectInput";
import { NumberInput } from "@/app/components/input/NumInput";

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
              <SelectInput
                label='인덱스' 
                value={indexSettings.index}
                options={['S&P 500', 'NASDAQ', 'DOW JONES']}
                onChange={(value) => setIndexSettings({...indexSettings, index: value})}
              />
              <div className="grid grid-cols-3 gap-4">
                <SelectInput
                  label='기준선'
                  value={indexSettings.baseValue}
                  options={['중간', '높음', '낮음']}
                  onChange={(value) => setIndexSettings({...indexSettings, baseValue: value})}
                />
                <SelectInput
                  label='이동평균 (기준선)'
                  value={indexSettings.baseType}
                  options={['SMA', 'EMA']}
                  onChange={(value) => setIndexSettings({...indexSettings, baseType: value})}
                />
                <NumberInput
                  label='일수'
                  value={indexSettings.baseAmount}
                  placeholder='일수를 입력해주세요.'
                  onChange={(value) => setIndexSettings({...indexSettings, baseAmount: parseInt(value) || 1})}
                  min={1}
                  max={20}
                  unit={indexSettings.baseUnit}
                  info='1 ~ 20까지 입력할 수 있습니다.'
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <SelectInput
                  label='경계선 (밴드)'
                  value={econSettings.econType}
                  options={['변동성 (표준편차)', 'ATR']}
                  onChange={(value) => setEconSettings({...econSettings, econType: value})}
                />
                <SelectInput
                  label='이동평균 (경계선)'
                  value={econSettings.econValue}
                  options={['SMA', 'EMA']}
                  onChange={(value) => setEconSettings({...econSettings, econValue: value})}      
                />
                <NumberInput
                  label='일수'
                  value={econSettings.econAmount}
                  placeholder='일수를 입력해주세요.'
                  onChange={(value) => setEconSettings({...econSettings, econAmount: parseInt(value) || 20})}
                  min={10}
                  max={60}
                  unit={econSettings.econUnit}
                  info='10 ~ 60까지 입력할 수 있습니다.'
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label='진입 가중치'
                value={advancedSettings.priceWeight}
                placeholder='진입 가중치를 입력해주세요.'
                onChange={(value) => setAdvancedSettings({...advancedSettings, priceWeight: parseFloat(value) || 1.5})}
                min={1}
                max={5}
                unit='배'
                info='1 ~ 5까지 입력할 수 있습니다.'
              />
              <NumberInput
                label='청산 가중치'
                value={advancedSettings.upWeight}
                placeholder='청산 가중치를 입력해주세요.' 
                onChange={(value) => setAdvancedSettings({...advancedSettings, upWeight: parseFloat(value) || 3})}
                min={1}
                max={5}
                unit='배'
                info='1 ~ 5까지 입력할 수 있습니다.'
              />
            </div>
          </div>
        )}
      </div>
    )
}       