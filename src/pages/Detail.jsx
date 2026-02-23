import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addCart } from '../store/cartSlice';

function Detail(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let { pid } = useParams(); // url 파라미터 가져옴
  let thisProduct = props.product.find(function (x) {
    return x.id == pid;
  });
  let [count, setCount] = useState(0);
  let [visible, setVisible] = useState(true);
  let [inputValue, setInputValue] = useState('');
  let [tab, setTab] = useState(2);
  let [fade, setFade] = useState('');

  // 최근 본 상품 - 접속하면, 상품 ID 를 localStorage에 저장
  useEffect(() => {
    let rArry = localStorage.getItem('watched');
    rArry = JSON.parse(rArry); // parse : JSON -> array/object
    console.log(thisProduct.id);
    rArry.push(thisProduct.id);
    rArry = new Set(rArry);
    rArry = Array.from(rArry);
    localStorage.setItem('watched', JSON.stringify(rArry));
  }, []);

  // 화면 페이드인 효과
  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 300);
  }, []);

  // 페이지 로드 2초 후 숨기기
  useEffect(() => {
    let timer = setTimeout(() => {
      //console.log('timer 실행');
      setVisible(false);
    }, 2000);
    return () => {
      //console.log('cleanup funciton - timer 초기화');
      clearTimeout(timer);
    };
  }, []);

  // 상품 정보(배열)에서 id == pid 인 객체를 찾아라
  let 찾은상품 = props.product.find((x) => x.id == pid);
  let prd = props.product.find(function (x) {
    return x.id == pid;
  });

  useEffect(() => {
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue !== sanitizedValue) {
      alert('숫자만 입력해주세요.');
      setInputValue(sanitizedValue);
    }
  }, [inputValue]);

  var 현재상태 = 'shipping';

  return (
    <div className={`"detail start " relative p-4 ${fade}`}>
      {visible ? (
        <p className="bg-dark-bg animation-floating absolute top-2 left-2 rounded-2xl p-1 px-2 text-white">
          이벤트 할인 진행중!
        </p>
      ) : null}
      <div className="__img flex aspect-video items-center justify-center rounded-xl bg-gray-200 p-1">
        <img
          src={prd.img}
          alt="상품이미지"
          className="max-h-[80%] max-w-[90%] object-contain"
        />
      </div>
      <div className="__info border-b border-b-gray-300 p-4">
        <h3 className="mb-2">{prd.title}</h3>
        <div className="mb-2">
          <p>가격: {prd.price}원</p>
          <p>
            재고: {count}
            <span
              onClick={() => {
                setCount(count++);
              }}
            >
              +증가
            </span>
          </p>
          <p>
            수량:
            <input
              type="text"
              placeholder="숫자만 입력가능합니다."
              onChange={(element) => {
                setInputValue(element.target.value);
              }}
              value={inputValue}
            />
            개
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(addCart({ id: prd.id, name: prd.title, count: 1 }));
          }}
        >
          장바구니 담기
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setTab(0);
          }}
        >
          상품정보
        </button>
        <button
          onClick={() => {
            setTab(1);
          }}
        >
          배송정보
        </button>
        <button
          onClick={() => {
            setTab(2);
          }}
        >
          환불약관
        </button>
      </div>
      <TabContent tab={tab} />
      <div style={{ height: '100vh' }}></div>
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      clearTimeout(timer);
      setFade('');
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용 1</div>, <div>내용 2</div>, <div>내용 3</div>][tab]}
    </div>
  );

  // if (tab == 0) {
  //   return <div>내용 1</div>;
  // }
  // if (tab == 1) {
  //   return <div>내용 2</div>;
  // }
  // if (tab == 2) {
  //   return <div>내용 3</div>;
  // }
}

export default Detail;
