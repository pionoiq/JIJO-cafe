import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import MainBanner from "./MainBanner";
import MainMenu from "./MainMenu";
import MainGoods from "./MainGoods";
import MainEvent from "./MainEvent";
import MainStore from "./MainStore";
import Footer from "@/layout/Footer/Footer";
import FullPageScroll from "@/components/Main/FullPageScroll";

function Main() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      // 페이지를 벗어날 때 스타일 제거
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>카페지조-메인페이지</title>
      </Helmet>
      <h1 className="sr-only">메인페이지</h1>

      <FullPageScroll>
        <MainBanner />
        <MainMenu className="h-screen grid grid-cols-2 overflow-hidden  pt-[10%] bg-white mobile:grid-cols-1 mobile:grid-rows-2 tablet:pt-[7%] mobile:py-[10%]" />
        <MainGoods className="grid items-center h-screen grid-cols-2 overflow-hidden mobile:grid-cols-1 mobile:grid-rows-2 mobile:py-20 bg-primary" />
        <MainStore className="relative grid justify-between h-screen grid-cols-2 overflow-hidden mobile:grid-cols-1 mobile:grid-rows-2" />
        <MainEvent className="grid grid-cols-1 place-content-center place-items-center h-screen overflow-hidden mobile:pt-[10%]" />
        <Footer />
      </FullPageScroll>
    </>
  );
}

export default Main;
