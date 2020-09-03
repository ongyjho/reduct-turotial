import { createStore } from "./redux";

const INCREAMENT = "increament";
const RESET = "reset";

function reducer(state = {}, action) {
  if (action.type === "abc") {
    return {
      ...state,
      abc: "OK"
    };
  } else if (action.type === INCREAMENT) {
    return {
      ...state,
      count: action.count + 1
    };
  } else if (action.type === RESET) {
    return {
      ...state,
      ...action
    };
  }
  return state;
}

function actionCreator(type, data) {
  return {
    ...data,
    type: type
  };
}

function update() {
  console.log(store.getState());
}

function reset() {
  store.dispatch(
    actionCreator(RESET, {
      resetCount: 10
    })
  );
}

const store = createStore(reducer);
store.dispatch({ type: "abc" });
store.dispatch(actionCreator(INCREAMENT, { count: 10 }));
store.subscriber(update());
reset();
