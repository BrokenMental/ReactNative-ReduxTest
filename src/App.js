import React from 'react';
import { View, Text } from 'react-native';
import Count from './components/Count';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

/*
* Root Component로 사용
* 생성된 Action과 Reducer를 App에서 사용할 수 있도록 설정
* redux 모듈에 createStore를 통해 Store를 생성, Store 생성 시 인자로 reducer를 필요로 함
* 생성된 Store를 React에서 사용하려면 react-redux 모듈의 Provider를 사용
*/
const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>React Native & Redux Example</Text>
        <Count/>
      </View>
    </Provider>
  );
};

export default App;