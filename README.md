# ReactNative_ReduxTest

리액트 네이티브 Redux 테스트
--------
- Redux는 React의 단방향 데이터 흐름 지향을 보완하기 위해 Flux Design Pattern을 참고해 만들어짐

- 시작 시 필요 npm
1. redux
2. react-redux

- redux-hook로 변경(function Component)
    - import { useDispatch, useSelector } from 'react-redux';
    - 사용 함수
        1. useSelector
            - mapStateToProps와 유사한 기능으로 Store state를 데이터에 할당할 수 있도록 하는 함수
            - 연결된 Action이 dispatch 될 때 마다 Selector에 접근하여 값을 반환

        2. useDispatch
            - Store에 설정된 Action Dispatch를 연결하는 함수

참조 : https://medium.com/@trustyoo86/react-redux%EC%9D%98-hooks%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-78f9b8aaa365


- Flux Design Pattern : MVC Design Pattern의 단점을 극복하기 위해 만들어진 Pattern
    - MVC는 Model 과 View의 상호작용을 통해 데이터가 전달되는데, View의 Action에 의해 여러 모델을 업데이트하거나 의존성 때문에 필요치 않은 Model의 사용이 발생하는 단점이 있음
    - 위와같은 단점을 극복하기 위해 단방향 데이터 흐름을 추구하는 Flux Design Pattern이 탄생
    - 아래와 같은 흐름을 가짐
        - Action(0) -> Dispatcher(1) -> Store(2) -> View(3) -> Action(0)

    - Action(Action 생성자) : type(시스템에 정의 된 Action)과 payload(MESSAGE)를 포함한 Action을 생성, 디스패처로 해당 Action을 전송

    - Dispatcher
        1. MVC Pattern의 Dispatcher는 정해진 type에 필요한 Action을 보내는 반면
        2. Flux Pattern의 Dispatcher는 type과는 관계없이 등록된 모든 Store에 Action을 보냄(Store가 특정 Action만 구독하는것이 아닌 특정 Action을 받은 뒤 받은 Action을 처리할지 여부를 결정)
        3. 동기적 처리방식으로 실행되어 우선순위를 가진 Action순으로 처리됨(순서를 무시하고 받아야 하는 특정 상황에선 waitFor()라는 함수를 활용 가능)

    - Store
        1. App내의 모든 State(상태), 그리고 State에 관련된 로직을 갖고 있음
        2. 특정 다수의 Action을 받은 Store는 내부에서 어떤 Action을 실행할지 결정하기 위해 보통 Switch문을 통해 결정
        3. 특정 Action이 상태변경에 대한 내용이 포함되어 있다면 해당 상태변경 진행
        4. Store에서 자체적으로 상태를 변경할 수 없음

    - View
        1. View에는 Store와 View 사이를 이어주는 Controller View와 render를 진행하는 View가 있음
        2. 전달받은 데이터를 처리해서 사용자가 알 수 있는 포맷으로 변환 및 출력

- 동작
    - 준비
        1. Store가 Dispatcher를 바라보며 Action이 오는것을 기다림
        2. Controller View가 Store에 State를 확인
        3. Store가 Controller View에 State를 전달
        4. Controller View가 View에 State를 전달, View가 rendering
        5. 2~4 반복

    - 데이터 흐름
        1. 사용자 입력
        2. View가 Action에 사용자 입력 전달
        3. Action 가공, Dispatcher에 전달
        4. 들어온 Action 순서대로 Store에 전달
        5. Store에서 전달받은 Action 중 필요한 Action만 골라 State 변경
        6. State 변경 완료 시 Store를 바라보고 있는 Controller View에 연락
        7. Controller View가 Store에 변경된 State 요청
        8. Store가 Controller View에 변경된 State 전달
        9. Controller View가 받은 새로운 State를 보고 View가 re-rendering

참조 : https://blog.naver.com/backsajang420/221368106022


- Redux
    - Flux Design의 구현체중 하나, App의 State를 예측 가능하게 함
    - Flux의 문제를 해결하기 위해 reducer가 추가됨

    - Reducer
        1. Store가 갖고 있던 상태 변환을 위한 로직을 가짐
        2. Store는 Action 발생 시 어떤 변화를 만들어야 하는지 Reducer에게 요청, 이로인해 핫 리로딩 가능
        3. 첫번째 인수로 기존상태 값, 두번째 인수로 액션을 가짐, 다음 상태를 반환하는 순수 함수
            - 항상 다음상태를 계산해서 반환하는 역할만 함
            - API 호출이나 값이 변하는 순수하지 않은 함수를 호출해서는 안됨
            - undefined 상태로 호출하여 초기상태를 반환

        4. (주의사항) 첫번째 인수로 기존 상태를 갖고 있는 State는 수정하지 않음, 상태 수정 시 새롭게 생성해야 함
            - 이 주의사항을 지킴으로써 각각의 Action 발생 시 새로운 상태의 객체가 생성, Redux의 특징인 시간 여행 디버깅이 가능

        5. Action이 일어나 상태가 변할것이라는 사실을 말하면 실제 App의 State가 어떻게 바뀌는지 담당

    - Store
        1. Flux는 다수의 Store를 가질 수 있었지만 Redux는 하나의 Store만을 가짐
            - 데이터를 다루는 로직을 나눌 경우 여러개의 reducer를 활용

        2. 상태트리 전체를 유지하는 책임을 가짐
        3. Redux의 Store는 Flux의 Dispatcher 역할을 대신 함
        4. 무엇이 일어날지를 표현하는 Action과 이 Action에 따라 App State를 어떻게 수정할지를 나타내는 Reducer를 함께 가져오는 객체
        5. 다음과 같은 일을 함
            - App의 State 저장
            - getState()를 통해 State에 접근
            - dispatch(action)을 통해 상태를 수정
            - subscribe(listener)를 통해 listener를 등록

    - Action
        1. App의 State를 갖고있는 Store로 전달하는 데이터 묶음(store.dispatch()를 통해 Store에 Action을 전달 가능)
        2. 평범한 js 객체이며 type 속성을 가짐
            - 이 type 속성은 Action을 전달받은 Store가 App의 상태변환 로직을 갖고있는 reducer를 참조할 때 사용

    - Action 생성자
        1. Action을 만드는 함수
        2. Action을 반환하는 역할
        3. 실제 Action 전달 시 결과값을 dispatch 함수에 전달하거나 생성된 Action을 자동으로 보내주는 bind 된 Action 생성자를 만듬(무슨 말?)

    - The View layer binding
        1. 생성된 Store를 View에 연결하기 위해 필요
        2. connect()를 통해 Component(View)가 App State를 업데이트 받을 수 있도록 모든 연결을 만들어 줌

    - Root component
        1. 계층 구조에서 가장 위체 위치하는 Component
        2. Store를 생성하고 어떤 reducer를 사용할지 알려주고 The View layer binding과 View를 불러옴

- Redux 사용 준비
    1. combineReducers()를 통해 reducer를 하나로 묶은 후 Root Component가 createStore()를 이용해 Store를 생성할 때 전달
    2. Root Component는 공급 Component와 Store 사이를 연결함으로써 Store와 Component 사이의 커뮤니케이션을 준비(이후 Component에서 connent()를 통해 State를 업데이트 받을 수 있음)

- Redux 데이터 흐름
    - 단방향 데이터 흐름
        - Action(0) -> Store(1) -> reducer(2) -> Store(1)

    1. Action 생성 후 Store에 전달
    2. Store가 reducer 호출
    3. Root Reducer가 각 reducer와 합쳐 하나의 State tree 생성
    4. Store가 Root Reducer에 의해 반환된 State tree를 저장

참조 : https://jongmin92.github.io/2017/02/12/ReactNative/redux-for-starter/
