import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    increaseQty(state, action) {
      // 1. 클릭한 상품 정보와 state 비교
      // 2. id 가 같은 객체 찾기
      // 3. 그 객체의 count 값을 +1 한다.

      // 1. 클릭한 상품의 id : 0, 2
      console.log(1, action.payload);

      // 2. state 에서 넘어온 값과 id 가 같은 상품 찾기
      let item = state.find(function (x) {
        console.log(2, x.id);
        return x.id == action.payload;
      });

      // 3. count + 1
      item.count += 1;
    },
    addCart(state, action) {
      //state.push({ id: 3, name: 'NEW Grey Yordan', count: 1 });
      // state 에 있는지 확인
      let isIncluded = state.findIndex((x) => x.id == action.payload.id);
      console.log(isIncluded);
      if (isIncluded == -1) {
        // state 에 없으면 추가
        state.push(action.payload);
      } else {
        // state 에 있으면 count++
        state[isIncluded].count += 1;
      }
    },
  },
});

export let { increaseQty, addCart } = cart.actions;

export default cart;
