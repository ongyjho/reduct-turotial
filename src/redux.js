//중앙 스토어의 개념

export function createStore(reducer) {
  let state; //immutable하게.
  const listeners = [];
  const getState = () => ({ ...state });
  //js는 참조형이기 때문에 원본을 언제든지 바꿀 수 있기 때문에 복사본을 사용한다..
  const dispatch = (action) => {
    state = reducer(state, action);
    console.log(listeners);
  };
  const subscriber = (fn) => {
    listeners.push(fn);
  };

  return {
    getState,
    dispatch,
    subscriber
  };
}
