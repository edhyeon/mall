import { useEffect } from "react";
import Lenis from "lenis"; // 또는 '@studio-freight/lenis'

/** JSDoc
 *
 * 전역 스크롤을 부드럽게 만드는 Lenis 초기화 훅
 * @description
 * - PC 환경(마우스): Lenis를 활성화하여 관성 스크롤 적용
 * - 모바일 환경(터치): 네이티브 스크롤 성능 유지를 위해 Lenis 비활성화
 * - `App.jsx` 등 최상위 컴포넌트에서 마운트 시 한 번만 실행됩니다.
 * @example
 * // App.jsx
 * useSmoothScroll();
 * @returns {void} 반환값 없음
 */

const UseSmoothScroll = () => {
  useEffect(() => {
    // 1. 모바일(터치 주 입력 장치)인지 체크
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // 2. 터치 디바이스라면 Lenis를 실행하지 않고 종료 (Native Scroll 사용)
    if (isTouchDevice) return;

    // 3. 데스크탑(마우스) 환경에서만 Lenis 초기화
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // 필요한 옵션 추가
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 4. 클린업: 컴포넌트 언마운트 시 인스턴스 제거
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default UseSmoothScroll;
