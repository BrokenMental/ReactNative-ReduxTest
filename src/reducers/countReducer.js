import types from '../actions/types';

/*
* Action을 전달받은 Store가 State를 변경하기 위해 reducer에게 어떤 상태변환을 해야하는지 요청
* reducer에서는 해당 요청을 처리할 수 있도록 코드를 작성
* reducer는 함수, 첫번째 인자로 이전의 State, 두번째 인자로 Action을 전달받음
* 전달받은 Action의 type을 통해 새로운 State를 반환하는것이 reducer의 역할
* App 실행 후 Redux는 reducer를 undefined 상태로 호출, 아래 switch문이 default인 상태에서 초기 설정
*/

const count = 0;

export default (state = count, action) => {
  switch (action.type) {
    case types.COUNT_UP:
      return state + action.payload;
    case types.COUNT_DOWN:
      return state - action.payload;
    default:
      return state;
  }
};