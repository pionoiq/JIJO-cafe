import Categories from "@/components/Categories"
import JijoSpinner from "@/components/JijoSpinner"
import MenuBubble from "@/components/MenuBubble"
import MenuTitle from "@/components/MenuTitle"
import Products from "@/components/Products"
// import { usePocketBaseFilteredData } from "@/hooks/usePocektBaseData";
import { useState } from "react"
import LazyImage from "@/utils/LazyImage"
// import MenuSearchForm from "@/components/Menu/MenuSearchForm";
import JiJoHelmet from "@/utils/JiJoHelmet"
import foodImage01 from "@/assets/images/menu/food/food_image01.jpg"
import usePaginationQuery from "@/hooks/usePaginationQuery"

// const collection = "foods"

function Food() {
  const [category, setCategory] = useState("전체보기")

  const { error, ...rest } = usePaginationQuery({
    perPage: 16,
    queryKey: "foods",
    dependency: category,
    options: {
      sort: "-created",
      filter: category !== "전체보기" ? `(category~'${category}')` : "",
    },
  })

  // const {data, status} = usePocketBaseFilteredData( collection, 1, 20, category !== "전체보기" ? `(category~'${category}')` : "" );
  // console.log(category);

  const handleCategory = (newCategory) => {
    setCategory(newCategory)
  }

  if (status === "loading") {
    return <JijoSpinner />
  }

  if (error) {
    return <div role="alert">{error.toString()}</div>
  }

  return (
    <div>
      <JiJoHelmet pageTitle="메뉴소개 - 푸드" />
      <MenuTitle title="MEGA MENU" mainMenu="메뉴소개" subMenu="푸드" mainLink="/menu/drink" linkTo="/menu/food">
        FOOD MENU
      </MenuTitle>
      <MenuBubble>
        <strong>음료와 잘 어울리는</strong>
        <br />
        다양한 디저트
      </MenuBubble>
      <section className="bg-white mx-auto max-w-7xl mobile:w-full flex mobile:flex-col justify-between items-center mobile:items-start gap-[3.125rem] pt-[6.25rem] mobile:px-5">
        <div>
          <p className="text-jj_24 font-light">카페 지조 가을시즌 신메뉴</p>
          <h2 className="text-jj_60 font-bold break-keep leading-tight my-10">풍요로운 가을이 만든 달콤함</h2>
          <div className="text">
            <p className="title text-jj_22 border-b pb-5">청송 사과 한 잔, 보름달 한 상</p>
            <p className="desc text-[#1c1c1b] opacity-70 pt-5">
              가을이 키운 달콤한 청송 사과 신메뉴와
              <br /> 가을을 닮은 풍요로운 보름달 신메뉴 출시!
              <br /> 지금 바로 가까운 메가MGC커피에서 만나보세요!
            </p>
          </div>
        </div>
        <figure className="shrink-0 tablet:shrink mobile:w-full">
          <LazyImage src={foodImage01} alt="가을을 닮은 풍요로운 보름달 한 상" />
        </figure>
      </section>
      <section className="bg-white mx-auto max-w-7xl mt-[6.25rem] mobile:px-5">
        <div className="titleArea text-center">
          <p className="text-jj_24 font-light">카페 지조의 엄선된 메뉴</p>
          <h2 className="text-jj_60 font-black">JIJO MENU</h2>
          <span className="text-jj_14 font-light text-[#1c1c1b] opacity-70">※메뉴 이미지는 연출컷이라 실물과 다를 수 있습니다.</span>
        </div>

        <div className="checkboxArea border border-gray-200 p-[1.875rem] my-10">
          <p className="title text-jj_22 leading-tight pb-5 mb-5 border-b border-b-gray-200">분류보기</p>
          <Categories collection="foods" category={category} handleCategory={handleCategory} />
        </div>

        {/* <Products data={data} /> */}
        <Products {...rest} />
      </section>
    </div>
  )
}

export default Food
