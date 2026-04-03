import { useDecrease, useIncrease, useCountStore } from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  // const {decrease, increase} = userCountStore();

  //select 함수 활용해서 불필요한 리렌더링 방지(이렇게 하면 count값은 불러오지 않음)
  // const decrease = userCountStore((store)=>store.decrease);
  // const increase = userCountStore((store)=>store.increase);

  // const { increase, decrease } = userCountStore((store) => store.actions);

  const increase = useIncrease();
  const decrease = useDecrease();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
