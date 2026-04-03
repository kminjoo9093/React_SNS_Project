import { create } from "zustand"; // create : state와 action함수(상태를 변화시키는)를 포함하는 객체인 store를 생성하는 역할
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// type Store = {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// };

export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increase: () => {
                set((state) => {
                  state.count += 1;
                });

                //불변성 직접 관리하는 케이스
                // set((state) => ({
                //   count: state.count + 1,
                // }));
              },
              decrease: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "countStore",
        partialize: (store) => ({
          count: store.count, //로컬 스토리지에 저장할 값만 선택
        }),
        storage: createJSONStorage(() => sessionStorage), //세션스토리지에 저장되도록 바꾸기
      },
    ),
    {
      name: "countStore",
    },
  ),
);

useCountStore.subscribe(
  (store) => store.count, //count값이 변경될때마다 아래 리스너 함수 실행
  (count, prevCount) => {
    //Listener
    console.log(count, prevCount);

    const store = useCountStore.getState();
  },
);

// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increase: () => {
//       // const count = get().count;
//       // set({ count: count + 1 }); //업데이트 하고자 하는 값만 명시하면 됨

//       set((store) => ({
//         count: store.count + 1,
//       }));
//     },
//     decrease: () => {
//       set((store) => ({
//         count: store.count - 1,
//       }));
//     },
//   },
// }));

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncrease = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecrease = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};

//get : 객체 형태의 store를 그대로 반환하는 역할
// create 함수 : store 객체를 생성하고, 리액트 훅을 반환까지 함
