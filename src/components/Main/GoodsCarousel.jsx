import "swiper/css/pagination";
import "@/styles/Carousel.css";
import pb from "@/api/pocketbase";
import JijoError from "../JijoError";
import LazyImage from "@/utils/LazyImage";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper/modules";
import { getPbImageURL } from "@/utils/getPbImageURL";

function GoodsCarousel() {
  const { data, isError, error } = useQuery({
    queryKey: ["mainProduct"],
    queryFn: async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const mainProduct = await pb.collection("products").getList(1, 8, {
          sort: "updated",
        });
        return { mainProduct };
      } catch (error) {
        throw error;
      }
    },
  });

  if (isError) {
    return (
      <div role="alert">
        <JijoError error={error} />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Keyboard, Pagination]}
      a11y={{
        prevSlideMessage: "이전 슬라이드",
        nextSlideMessage: "다음 슬라이드",
      }}
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={3}
      keyboard={{ enabled: true }}
      grabCursor={true}
      id="shopingMallSwiper"
    >
      {data &&
        data.mainProduct.items?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              {
                <div className="mb-2 bg-white rounded-2xl">
                  <LazyImage src={getPbImageURL(item, "image")} alt={item.title} className="block object-cover w-full h-auto rounded-2xl" />
                  <div className="p-3 shadow-lg bg-slate-200 rounded-b-2xl">
                    <h5 className="overflow-hidden font-medium text-jj_20 mobile:text-jj_15 text-ellipsis break-keep line-clamp-1">{item.title}</h5>
                    <del className="block text-gray-400 text-jj_16 mobile:text-jj_13">{item.price}</del>
                    <b className="text-jj_18 mobile:text-jj_14">회원전용</b>
                    <div className="bg-[#232323] w-fit py-[.125rem] px-[.25rem] text-white rounded-sm text-jj_14 mobile:hidden" aria-hidden="true">
                      <span className="mr-2 font-bold text-black rounded-sm px-[3px] bg-yellow" aria-hidden="true">
                        P
                      </span>
                      회원전용
                    </div>
                  </div>
                </div>
              }
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
export default GoodsCarousel;
