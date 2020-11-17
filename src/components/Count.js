import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from '../actions';

/*
* 카운트 되는 숫자를 보여주는 텍스트와 카운트가 증가하는 버튼으로 구성
* 생성된 Action과 Reducer를 Count Component에서 사용할 수 있도록 connect()를 통해 연결을 만들어줌
* connect()는 Store의 state를 Component의 props로 전달하고 State에 변화가 있을 때 자동으로 Component를 re-render 함
* connect()는 아래의 인자를 가짐
* 1. mapStateToProps : Store의 State를 해당 Component의 props로 전달(mapping)
* 2. mapDispatchToProps : Store의 dispatch를 props에 전달, dispatch()를 통해 Action 생성자에서 생성한 Action을 Store에 전달할 수 있음
*/
class Count extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={{ fontSize: 20 }}>{this.props.count}</Text>
        <TouchableOpacity style={s.upButton} onPress={() => this.props.countUp(1)}>
          <Text style={{ fontSize: 20 }}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.upButton} onPress={() => this.props.countUp(2)}>
          <Text style={{ fontSize: 20 }}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.downButton} onPress={() => this.props.countUp(-1)}>
          <Text style={{ fontSize: 20 }}>-1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.downButton} onPress={() => this.props.countUp(-2)}>
          <Text style={{ fontSize: 20 }}>-2</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    countUp: (num) => {
      dispatch(ActionCreator.countUp(num));
    },
    countDown: (num) => {
      dispatch(ActionCreator.countDown(num));
    }
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Count);