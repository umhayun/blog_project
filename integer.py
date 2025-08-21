import random
import math
from collections import Counter
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats


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


class RandomTester:
    """랜덤 함수들을 체계적으로 테스트하는 클래스"""

    @staticmethod
    def test_get_1_or_0(num_trials=10000):
        """get_1_or_0() 함수의 균등성 테스트"""
        print("=== get_1_or_0() 테스트 ===")
        results = [get_1_or_0() for _ in range(num_trials)]
        counter = Counter(results)

        print(f"시행 횟수: {num_trials}")
        print(f"0의 빈도: {counter[0]} ({counter[0]/num_trials:.4f})")
        print(f"1의 빈도: {counter[1]} ({counter[1]/num_trials:.4f})")

        # 카이제곱 검정 (균등분포 가설 검정)
        expected = num_trials / 2
        chi2_stat = sum((counter[i] - expected)**2 / expected for i in [0, 1])
        chi2_critical = 3.841  # 자유도 1, α=0.05에서의 임계값

        print(f"\n카이제곱 검정:")
        print(f"검정통계량: {chi2_stat:.4f}")
        print(f"임계값 (α=0.05): {chi2_critical}")
        print(f"결과: {'균등분포' if chi2_stat < chi2_critical else '균등분포 아님'}")

        return results

    @staticmethod
    def test_get_random_uniformity(n, num_trials=50000):
        """get_random(n) 함수의 균등성 테스트"""
        print(f"\n=== get_random({n}) 균등성 테스트 ===")
        results = [get_random(n) for _ in range(num_trials)]
        counter = Counter(results)

        print(f"시행 횟수: {num_trials}")
        print(f"기대 빈도: {num_trials/n:.1f}")
        print("\n각 값별 빈도:")
        for i in range(n):
            freq = counter.get(i, 0)
            ratio = freq / num_trials
            print(f"  {i}: {freq:5d} ({ratio:.4f})")

        # 카이제곱 검정
        expected = num_trials / n
        chi2_stat = sum((counter.get(i, 0) - expected) **
                        2 / expected for i in range(n))
        # 자유도 = n-1, α=0.05
        chi2_critical = stats.chi2.ppf(0.95, n-1)

        print(f"\n카이제곱 검정:")
        print(f"검정통계량: {chi2_stat:.4f}")
        print(f"임계값 (α=0.05): {chi2_critical:.4f}")
        print(f"결과: {'균등분포' if chi2_stat < chi2_critical else '균등분포 아님'}")

        return results, counter

    @staticmethod
    def test_independence(n, num_trials=10000):
        """연속된 값들의 독립성 테스트 (런 테스트)"""
        print(f"\n=== get_random({n}) 독립성 테스트 (런 테스트) ===")
        results = [get_random(n) for _ in range(num_trials)]

        # 런 카운트 (연속된 같은 값의 그룹 수)
        runs = 1
        for i in range(1, len(results)):
            if results[i] != results[i-1]:
                runs += 1

        # 이론적 기대값과 분산
        expected_runs = (2 * num_trials - 1) / n
        variance = (2 * num_trials * (2 * num_trials - 1)) / (n**2 * (n + 1))

        # Z-점수 계산
        z_score = (runs - expected_runs) / math.sqrt(variance)

        print(f"실제 런 수: {runs}")
        print(f"기대 런 수: {expected_runs:.2f}")
        print(f"Z-점수: {z_score:.4f}")
        print(f"결과: {'독립적' if abs(z_score) < 1.96 else '독립적이지 않음'} (α=0.05)")

    @staticmethod
    def test_correlation(n, num_trials=10000):
        """연속된 값들 간의 상관관계 테스트"""
        print(f"\n=== get_random({n}) 상관관계 테스트 ===")
        results = [get_random(n) for _ in range(num_trials)]

        # 연속된 값들 간의 상관계수 계산
        x = results[:-1]
        y = results[1:]

        correlation = np.corrcoef(x, y)[0, 1]

        print(f"연속된 값들 간의 상관계수: {correlation:.6f}")

        # 상관계수의 유의성 검정
        t_stat = correlation * \
            math.sqrt((num_trials - 2) / (1 - correlation**2))
        t_critical = 1.96  # 대략적인 값 (자유도가 클 때)

        print(f"t-통계량: {t_stat:.4f}")
        print(f"결과: {'무상관' if abs(t_stat) < t_critical else '상관관계 존재'} (α=0.05)")

    @staticmethod
    def test_performance(n, num_trials=100000):
        """성능 및 효율성 테스트"""
        print(f"\n=== get_random({n}) 성능 테스트 ===")
        import time

        # 실행 시간 측정
        start_time = time.time()
        results = [get_random(n) for _ in range(num_trials)]
        end_time = time.time()

        execution_time = end_time - start_time

        print(f"시행 횟수: {num_trials}")
        print(f"실행 시간: {execution_time:.4f}초")
        print(f"초당 생성 수: {num_trials/execution_time:.0f}개")

        # 기대 시도 횟수 계산 (이론값)
        bits = 0
        temp = n - 1
        while temp > 0:
            bits += 1
            temp //= 2

        expected_attempts = (2**bits) / n
        print(f"이론적 기대 시도 횟수: {expected_attempts:.2f}")

    @staticmethod
    def visualize_distribution(n, num_trials=50000):
        """분포 시각화"""
        print(f"\n=== get_random({n}) 분포 시각화 ===")
        results = [get_random(n) for _ in range(num_trials)]
        counter = Counter(results)

        # 막대 그래프로 분포 표시
        values = list(range(n))
        frequencies = [counter.get(i, 0) for i in values]

        plt.figure(figsize=(10, 6))
        plt.bar(values, frequencies, alpha=0.7,
                color='skyblue', edgecolor='black')
        plt.axhline(y=num_trials/n, color='red', linestyle='--',
                    label=f'기대값: {num_trials/n:.0f}')
        plt.xlabel('값')
        plt.ylabel('빈도')
        plt.title(f'get_random({n}) 분포 ({num_trials}회 시행)')
        plt.legend()
        plt.grid(True, alpha=0.3)

        # 각 막대 위에 빈도 표시
        for i, freq in enumerate(frequencies):
            plt.text(i, freq + num_trials*0.005, str(freq),
                     ha='center', va='bottom')

        plt.tight_layout()
        plt.show()

        return results

    @staticmethod
    def comprehensive_test(n_values=[3, 5, 8, 16]):
        """여러 n 값에 대한 종합 테스트"""
        print("=" * 60)
        print("           종 합 테 스 트")
        print("=" * 60)

        # get_1_or_0() 테스트
        RandomTester.test_get_1_or_0()

        # 각 n 값에 대해 테스트
        for n in n_values:
            print("\n" + "=" * 60)
            RandomTester.test_get_random_uniformity(n)
            RandomTester.test_independence(n)
            RandomTester.test_correlation(n)
            RandomTester.test_performance(n)


# 실행
if __name__ == "__main__":
    # matplotlib이 없는 경우를 대비한 기본 테스트
    try:
        import matplotlib.pyplot as plt
        import numpy as np
        from scipy import stats

        # 전체 테스트 실행
        tester = RandomTester()
        tester.comprehensive_test()

        # 분포 시각화 (n=10 예시)
        # tester.visualize_distribution(10)

    except ImportError as e:
        print(f"일부 라이브러리가 없어 기본 테스트만 실행합니다: {e}")

        # 기본 테스트만 실행
        tester = RandomTester()
        tester.test_get_1_or_0()
        tester.test_get_random_uniformity(5)
        tester.test_get_random_uniformity(8)
        tester.test_independence(5)
        tester.test_performance(10)
