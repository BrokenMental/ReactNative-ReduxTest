import { combineReducers } from 'redux';
import CountReducer from './countReducer';

/*
* 여러개의 reducer를 묶어 Component에서 쉽게 사용할 수 있도록 해주는 역할
* combineReducers()는 트리 구조로 분리된 여러개의 State를 하나의 단일 상태 Tree로 조합
*/
export default combineReducers({
  count: CountReducer
});