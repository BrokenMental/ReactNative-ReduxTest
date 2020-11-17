import * as countAction from './countAction';

//여러개의 Action을 하나의 객체로 묶어 Component에서 쉽게 사용할 수 있도록 하는 역할
const ActionCreators = Object.assign({},
  countAction
);

export default ActionCreators;