import { NumberInput } from "@/app/components/input/NumInput";
import { SelectInput } from "@/app/components/input/SelectInput";
import { useDataStore } from "@/store/useDataStore";
import { AssetGroup } from "@/utils/CommonData";
import { useMemo, useState } from "react";

export const AssetGroupSection = () => {
  const [assetGroups, setAssetGroups] = useState<AssetGroup[]>([]);
  const { allAsset } = useDataStore();
    // 카테고리별로 데이터 그룹화
  const groupedAssets = useMemo(() => {
    if (!allAsset || !Array.isArray(allAsset)) return {};
    
    return allAsset.reduce((acc, asset) => {
      const category = asset.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(asset);
      return acc;
    }, {} as Record<string, typeof allAsset>);
  }, [allAsset]);
    // 카테고리 목록 추출
    const categories = useMemo(() => {
      return Object.keys(groupedAssets);
    }, [groupedAssets]);
  
  const addAssetGroup = (): void => {
    const firstCategory = categories[0] || '';
    const firstAsset = groupedAssets[firstCategory]?.[0];
    
    const newAssetGroup: AssetGroup = {
      id: Date.now(),
      category: firstCategory,
      asset: firstAsset?.label || '',
      ratio: 0,
      isAdvanced: false
    };
    setAssetGroups([...assetGroups, newAssetGroup]);
  };

  const removeAssetGroup = (id: number): void => {
    setAssetGroups(assetGroups.filter(group => group.id !== id));
  };

  const updateAssetGroup = (id: number, field: keyof AssetGroup, value: string | number | boolean): void => {
    setAssetGroups(assetGroups.map(group => {
      if (group.id === id) {
        const updatedGroup = { ...group, [field]: value };
        
        // 카테고리가 변경된 경우 해당 카테고리의 첫 번째 자산으로 자동 설정
        if (field === 'category') {
          const firstAsset = groupedAssets[value as string]?.[0];
          updatedGroup.asset = firstAsset?.label || '';
        }
        
        return updatedGroup;
      }
      return group;
    }));
  };

    return ( 
      <div className="bg-black p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">자산군 추가 <span className="text-gray-400">[필수]</span></h3>
        </div>
        
        {assetGroups.length === 0 ? (
          <div>
            <button 
              onClick={addAssetGroup}
              className="bg-black border border-gray-600 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <span>+</span> 자산 추가
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {assetGroups.map((group, index) => (
              <div key={group.id} className="bg-black p-4 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">자산군 추가 <span className="text-gray-400">[필수]</span></h4>
                  <button 
                    onClick={() => removeAssetGroup(group.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    삭제
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium text-white">자산 {String(index + 1).padStart(2, '0')}</div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <SelectInput
                      label='종류'
                      value='group.category' 
                      options={categories}
                      onChange={(value) => updateAssetGroup(group.id, 'category', value)}
                    />
                    <SelectInput
                      label='자산군'
                      value={group.asset}
                      options={groupedAssets[group.category]?.map(asset => asset.label) || []}
                      onChange={(value) => updateAssetGroup(group.id, 'asset', value)}
                    />
                    <NumberInput
                      label="비중"
                      value={group.ratio}
                      placeholder="비중을 입력해주세요."
                      onChange={(value) => updateAssetGroup(group.id, 'ratio', value)}
                      min={0}
                      max={100}
                      unit="%"
                      info="0 ~ 100까지 입력할 수 있습니다."
                    />
                  </div>
                  
                  {group.category.includes('미국') && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`exchange-rate-${group.id}`}
                        checked={group.isAdvanced}
                        onChange={(e) => updateAssetGroup(group.id, 'isAdvanced', e.target.checked)}
                        className="mr-2 w-4 h-4 text-gray-400 bg-black border-gray-600 rounded focus:ring-gray-400"
                      />
                      <label htmlFor={`exchange-rate-${group.id}`} className="text-white text-sm cursor-pointer">
                        환율반영
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <button 
                onClick={addAssetGroup}
                className="bg-black border border-gray-600 hover:bg-gray-600 text-white px-6 py-2 rounded text-sm flex items-center gap-2 mx-auto"
              >
                <span>+</span> 자산 추가
              </button>
            </div>
          </div>
        )}
      </div>
      )
}       