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
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">종류</label>
                      <select
                        value={group.category}
                        onChange={(e) => updateAssetGroup(group.id, 'category', e.target.value)}
                        className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">자산군</label>
                      <select
                        value={group.asset}
                        onChange={(e) => updateAssetGroup(group.id, 'asset', e.target.value)}
                        className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-gray-400 focus:outline-none"
                      >
                        {groupedAssets[group.category]?.map((asset) => (
                          <option key={asset.ticker} value={asset.label}>
                            {asset.label}
                          </option>
                        )) || []}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">비중</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={group.ratio}
                          onChange={(e) => updateAssetGroup(group.id, 'ratio', parseInt(e.target.value) || 0)}
                          className=" w-full bg-black border border-gray-600 rounded px-3 py-2 pr-6 text-white text-sm focus:border-gray-400 focus:outline-none"
                          min="0"
                          max="100"
                        />
                        <span className="absolute right-2 top-2 text-gray-400 text-sm">%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-gray-500 text-xs">
                    0 ~ 100까지 입력할 수 있습니다.
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