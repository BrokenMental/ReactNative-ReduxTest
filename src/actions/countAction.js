import types from './types';

/*
* Action : App의 State를 갖고 있는 Store로 전달되는 데이터 묶음
* tpye을 통해 증가인지 감소인지 확인
* payload를 통해 증가 혹은 감소하는 값을 전달
*/

export function countUp(num) {
  return {
    type: types.COUNT_UP,
    payload: num
  };
}

export function countDown(num) {
  return {
    type: types.COUNT_DOWN,
    payload: num
  };
}