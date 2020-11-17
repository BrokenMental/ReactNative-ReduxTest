import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActionCreator from '../actions';

/*
* 카운트 되는 숫자를 보여주는 텍스트와 카운트가 증가하는 버튼으로 구성
* 생성된 Action과 Reducer를 Count Component에서 사용할 수 있도록 connect()를 통해 연결을 만들어줌
* connect()는 Store의 state를 Component의 props로 전달하고 State에 변화가 있을 때 자동으로 Component를 re-render 함
* connect()는 아래의 인자를 가짐
* 1. mapStateToProps : Store의 State를 해당 Component의 props로 전달(mapping)
* 2. mapDispatchToProps : Store의 dispatch를 props에 전달, dispatch()를 통해 Action 생성자에서 생성한 Action을 Store에 전달할 수 있음
*
* redux-hook로 변경(function Component)
* 1. useSelector
*   - mapStateToProps와 유사한 기능으로 Store state를 데이터에 할당할 수 있도록 하는 함수
*   - 연결된 Action이 dispatch 될 때 마다 Selector에 접근하여 값을 반환
*
* 2. useDispatch
*   - Store에 설정된 Action Dispatch를 연결하는 함수
*/
const Count = () => {
    const dispatch = useDispatch();
    const count = useSelector((store) => store.count);

    const countUp = (num) => {
        dispatch(ActionCreator.countUp(num));
    }

    const countDown = (num) => {
        dispatch(ActionCreator.countDown(num));
    }

    return (
      <View style={s.container}>
        <Text style={{ fontSize: 20 }}>{count}</Text>
        <TouchableOpacity style={s.upButton} onPress={() => countUp(1)}>
          <Text style={{ fontSize: 20 }}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.upButton} onPress={() => countUp(2)}>
          <Text style={{ fontSize: 20 }}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.downButton} onPress={() => countDown(1)}>
          <Text style={{ fontSize: 20 }}>-1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.downButton} onPress={() => countDown(2)}>
          <Text style={{ fontSize: 20 }}>-2</Text>
        </TouchableOpacity>
      </View>
    );
}

const s = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  upButton: {
    marginLeft: 20,
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 20
  },
  downButton: {
    marginLeft: 20,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 20
  },
});

export default Count;