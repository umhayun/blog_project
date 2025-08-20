import random


def get_1_or_0():
    """1 또는 0을 랜덤하게 반환하는 함수"""
    return random.randint(0, 1)


def get_random(n):
    """
    get_1_or_0()만을 사용하여 0부터 n-1 사이의 랜덤한 정수를 반환

    접근 방법:
    1. n보다 크거나 같은 2의 거듭제곱을 찾는다
    2. 이진수 표현을 이용하여 랜덤 수를 생성한다
    3. 생성된 수가 n보다 크거나 같으면 다시 생성한다
    """
    if n <= 0:
        return 0

    # n보다 크거나 같은 2의 거듭제곱 찾기
    bits = 0
    temp = n - 1
    while temp > 0:
        bits += 1
        temp //= 2

    while True:
        # bits 개의 랜덤 비트로 수 생성
        result = 0
        for i in range(bits):
            result = result * 2 + get_1_or_0()

        # 생성된 수가 범위 내에 있으면 반환
        if result < n:
            return result
        # 범위를 벗어나면 다시 시도

# 테스트 코드


def test_functions():
    print("=== get_1_or_0() 테스트 ===")
    results_1_or_0 = [get_1_or_0() for _ in range(20)]
    print(f"20회 실행 결과: {results_1_or_0}")
    print(f"0의 개수: {results_1_or_0.count(0)}")
    print(f"1의 개수: {results_1_or_0.count(1)}")

    print("\n=== get_random(n) 테스트 ===")

    # n=5에 대한 테스트
    n = 5
    results_n = [get_random(n) for _ in range(30)]
    print(f"get_random({n}) 30회 실행 결과:")
    print(f"{results_n}")

    print()

    # n=8에 대한 테스트
    n = 8
    results_8 = [get_random(n) for _ in range(32)]
    print(f"get_random({n}) 32회 실행 결과:")
    print(f"{results_8}")
    print(f"각 숫자별 빈도:")
    for i in range(n):
        count = results_8.count(i)
        print(f"  {i}: {count}번")


if __name__ == "__main__":
    print()
    test_functions()
