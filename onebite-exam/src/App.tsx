import "./App.css";

function App() {
  return (
    <div>
      {/* 타이포그래프 */}
      <div className="text-xs text-red-500">text-xs</div>
      <div className="text-[rgb(100, 30, 200)] text-sm">text-sm</div>
      <div className="text-lg font-bold">text-lg</div>
      <div className="text-xl font-extrabold">text-xl</div>
      <div className="text-2xl font-black">text-2xl</div>
      <div className="text-[13px]">text-13px</div>

      {/* 백그라운드컬러 */}
      <div className="bg-amber-500">amber500</div>

      {/* 사이즈 */}
      {/* 설정한 숫자 * 4px(기본간격) 이 실제 적용되는 사이즈 */}
      <div className="w-20 bg-blue-500">box</div>
      <div className="w-[20px] bg-blue-500">box</div>
      <div className="h-20 w-full bg-blue-500">box w-full</div>

      {/* 여백 */}
      <div className="m-5 h-50 w-50 bg-red-400 px-5 py-5">
        <div className="h-full w-full bg-blue-400"></div>
      </div>

      {/* 보더 */}
      <div className="m-5 border-y-3 p-1">border</div>
      <div className="m-5 rounded-md border-t-2 border-r-2 border-b-2 border-l-2 border-red-500 p-1">
        border
      </div>

      {/* 플렉스 컨테이너 */}
      <div className="flex flex-row justify-evenly items-start">
        <div className="h-10 w-10 border">1</div>
        <div className="flex-1 h-20 w-10 border">2</div>
        <div className="h-30 w-10 border">3</div>
        <div className="h-40 w-10 border">4</div>
      </div>
    </div>
  );
}

export default App;
