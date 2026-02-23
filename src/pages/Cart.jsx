import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeName, increaseAge } from './../store/userSlice';
import { increaseQty } from './../store/cartSlice';

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <div className="inner-container">
      <p className="pt-5 pb-1">
        - 고객명: {state.user.name} ({state.user.age})
        <button
          onClick={() => {
            dispatch(increaseAge(1));
          }}
        >
          [ +1 ]
        </button>
        <button
          onClick={() => {
            dispatch(increaseAge(10));
          }}
        >
          [ +10 ]
        </button>
        <br />- 주문일자: 2026.02.10
      </p>
      <table>
        <colgroup>
          <col width="10%" />
          <col width="30%" />
          <col width="10%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.length == 0 ? (
            <tr>
              <td colspan="4">장바구니에 담긴 상품이 없습니다 😢</td>
            </tr>
          ) : null}
          {state.cart.map(function (a, i) {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      dispatch(increaseQty(a.id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ height: '100vh' }}></div>
    </div>
  );
}

export default Cart;
