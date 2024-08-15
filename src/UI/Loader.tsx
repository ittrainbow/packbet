export const Loader = () => {
  return (
    <div className="loader flex pt-8 max-w-24 items-center justify-center absolute top-[calc(50%-3rem)] left-[calc(50%-3rem)] h-24 w-24">
      <div className="inner absolute box-border w-full h-full rounded-[3rem] l-0 top-0 one border-b-8 animate-rotate-one border-green-600"></div>
      <div className="inner absolute box-border w-full h-full rounded-[3rem] r-0 top-0  border-r-8 animate-rotate-two border-green-600 two"></div>
      <div className="inner absolute box-border w-full h-full rounded-[3rem] r-0 bottom-0 border-t-8 animate-rotate-three border-green-600 three"></div>
    </div>
  )
}
