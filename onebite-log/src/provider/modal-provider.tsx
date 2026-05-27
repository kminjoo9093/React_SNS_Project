import PostEditorModal from "@/components/modal/post-editor-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

//createPortal => 모달에 사용하면 효과적
//첫번째 인수로 전달하는 UI요소를, 두번째 인수로 전달하는 dom요소 아래에 렌더링 시켜줌
//=> 특정 dom요소를 지정해서 해당 요소 아래에 ui요소를 위치시킬 수 있음

//이렇게 복잡하게 모달을 렌더링 시키는 이유
//모달은 전체 요소 중 맨 위에 떠야함 -> 일반적인 컴포넌트 처럼 return문 안에 적어버리면 리액트 컴포넌트의 계층 구조에 따라
//부모 컴포넌트들에 의해서 css스타일 충돌, z-index 값 충돌 등 렌더링이 잘 되지 않는 문제 발생 가능
//=> 모달처럼 전체 화면 위에 떠야 하는 컴포넌트들은 createPortal 이라는 메서드를 통해서
//컴포넌트의 계층 구조를 벗어나, 특정 dom 요소 아래에 바로 렌더링 될 수 있도록 하는 것이 일반적이고 효율적임

//ModalProvider는 모달들을 App컴포넌트 아래에 렌더링 시키는 역할
//=> 여러개의 모달을 쓸 경우 하나의 provider안에 여러 모달을 넣으면 됨
    //   {createPortal(
    //     <>
    //     <Modal 1 />
    //     <Modal 2/>
    //     </>,
    //     document.getElementById("modal-root")!,
    //   )}


export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <PostEditorModal/> */}
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
