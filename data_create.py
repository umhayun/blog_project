import json
import random

categories = ["한국자산군", "미국자산군", "전략", "한국ETF", "미국ETF", "한국주식", "미국주식"]
countries = {
    "한국자산군": "KR",
    "한국ETF": "KR",
    "한국주식": "KR",
    "미국자산군": "US",
    "미국ETF": "US",
    "미국주식": "US",
    "전략": None
}

data = []

for i in range(120000):  # 10만 개
    category = random.choice(categories)
    country = countries[category]
    ticker = f"A{i:06d}"  # A000000, A000001 ...
    name = f"{category} {i}-번 종목"
    label = f"{name} ({ticker})"

    item = {
        "name": name,
        "ticker": ticker,
        "category": category,
        "country": country,
        "market": None,
        "label": label,
        "value": ticker
    }
    data.append(item)

# JSON 파일로 저장
with open("src/data/dummy.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("더미 데이터 생성 완료!")
