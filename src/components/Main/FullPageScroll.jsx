import { Dots } from "@/components/Main/Dots";
import { useRef, useState, useEffect } from "react";

const FullPageScroll = ({ children, onLoad = () => {}, onPageChange = () => {} }) => {
  const outerDivRef = useRef(null);
  // 현재 페이지의 인덱스 추적
  const currentPage = useRef(0);
  // 현재 스크롤 가능 여부를 추적, 여러 번의 스크롤 이벤트가 한 번에 호출되는 것을 방지
  const canScroll = useRef(true);
  // 이전 터치 이벤트의 Y축 위치 기록
  const oldTouchY = useRef(0);
  // 이동된 페이지를 화면에 리렌더링
  const [, refresh] = useState(0);

  const scrollDown = () => {
    // 참조하는 DOM 요소의 첫 번째 자식 높이를 가져오기
    const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
    if (outerDivRef.current && pageHeight) {
      // 다음 스크롤 위치 설정
      outerDivRef.current.scrollTo({
        top: pageHeight * (currentPage.current + 1),
        left: 0,
        behavior: "smooth",
        // outer,
      });
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, 500);
      //  페이지 인덱스가 마지막 페이지보다 큰 경우에만 증가
      if (outerDivRef.current.childElementCount - 1 > currentPage.current) currentPage.current++;
    }
    // console.log(currentPage.current);
    onPageChange(currentPage.current);
    refresh((v) => v + 1);
  };

  const scrollUp = () => {
    const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
    if (outerDivRef.current && pageHeight) {
      outerDivRef.current.scrollTo({
        top: pageHeight * (currentPage.current - 1),
        left: 0,
        behavior: "smooth",
      });
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, 500);
      // 페이지 인덱스가 0보다 큰 경우에만 감소
      if (currentPage.current > 0) currentPage.current--;
    }
    // console.log(currentPage.current);
    onPageChange(currentPage.current);
    refresh((v) => v + 1);
  };

  const wheelHandler = (e) => {
    e.preventDefault();
    if (!canScroll.current) return;
    const { deltaY } = e;
    if (deltaY > 0 && outerDivRef.current) {
      scrollDown();
    } else if (deltaY < 0 && outerDivRef.current) {
      scrollUp();
    }
  };

  const scrollHandler = (e) => {
    e.preventDefault();
  };

  const onTouchDown = (e) => {
    oldTouchY.current = e.changedTouches.item(0)?.clientY || 0;
  };

  const onTouchUp = (e) => {
    const currentTouchY = e.changedTouches.item(0)?.clientY || 0;
    const isScrollDown = oldTouchY.current - currentTouchY > 0 ? true : false;

    if (isScrollDown) {
      scrollDown();
    } else {
      scrollUp();
    }
  };

  useEffect(() => {
    const outer = outerDivRef.current;
    if (!outer) return;
    onLoad(outerDivRef.current.childElementCount);
    refresh((v) => v + 1);
    outer.addEventListener("wheel", wheelHandler);
    outer.addEventListener("scroll", scrollHandler);
    outer.addEventListener("touchmove", scrollHandler);
    outer.addEventListener("touchstart", onTouchDown);
    outer.addEventListener("touchend", onTouchUp);
    return () => {
      outer.removeEventListener("wheel", wheelHandler);
      outer.removeEventListener("scroll", scrollHandler);
      outer.removeEventListener("touchmove", scrollHandler);
      outer.removeEventListener("touchstart", onTouchDown);
      outer.removeEventListener("touchend", onTouchUp);
    };
  }, []);

  const movePageTo = (index) => {
    const num = currentPage.current;
    if (index > num) for (let i = 0; i < index - num; i++) scrollDown();
    else if (index < num) for (let i = 0; i < num - index; i++) scrollUp();
  };

  return (
    <>
      <div ref={outerDivRef} style={{ height: "100vh", width: "100%", overflowY: "hidden" }}>
        {children}
      </div>
      <Dots limit={outerDivRef.current?.childElementCount || 0} currentIndex={currentPage.current} onDotClick={movePageTo} />
    </>
  );
};

export default FullPageScroll;
