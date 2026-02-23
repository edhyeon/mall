import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import UseSmoothScroll from './hooks/useSmoothScroll.js';
import data from '../public/data.js';
//import Detail from './pages/Detail.jsx';
//import Cart from './pages/Cart.jsx';

// lazy : 필요할 때 import 해주세요. 성능개선.
const Detail = lazy(() => import('./pages/Detail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));

function App() {
  UseSmoothScroll();
  let [product, setProduct] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  const urlList = ['/data2.json', 'data3.json'];

  let [recentItem, setRecentItem] = useState([]);

  // 최근 본 상품 - 배열 생성
  useEffect(() => {
    let data = localStorage.getItem('watched');
    if (!data) {
      localStorage.setItem('watched', JSON.stringify([]));
    } else {
      setRecentItem(JSON.parse(data));
    }
  }, []);

  return (
    <div className="App">
      <header className="border-b border-gray-400">
        <div className="inner-container">
          <div className="flex items-center justify-between">
            <h1 className="mt-5 bg-slate-50 pt-5 pb-10">
              <Link to="/">
                <img src="/img/icn-logo.svg" />
              </Link>
            </h1>
            <div className="relative flex gap-2">
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate('/cart');
                }}
              >
                🛒 My Cart
              </span>
              <span className="cursor-pointer" onClick={() => {}}>
                👓 Recent
              </span>
              <div className="absolute top-0 right-0">
                {recentItem.map((item, i) => {
                  return <div key={i}>{item}</div>;
                })}
              </div>
            </div>
          </div>
          <nav className="pb-4">
            <ul className="flex items-center justify-center gap-2.5">
              <li>
                <Link to="/detail" className="block">
                  홍보용품
                </Link>
              </li>
              <li>
                <Link to="/detail" className="block">
                  학습용품
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="inner-container">
          <Suspense fallback={<div>로딩중....</div>}>
            <Routes>
              {/* 홈 */}
              <Route
                path="/"
                element={
                  <div>
                    <h2>Product</h2>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        let copy = [...product];
                        console.log(copy);
                        copy.sort();
                        setProduct(copy);
                      }}
                    >
                      정렬
                    </button>
                    <div className="list">
                      {product.map((item, i) => {
                        return <Product product={item} key={i} />;
                      })}
                    </div>
                    {count < urlList.length && (
                      <div className="text-center">
                        <button
                          onClick={() => {
                            axios
                              .get(urlList[count])
                              .then((result) => {
                                let copy = [...product, ...result.data];
                                setProduct(copy);
                                setCount(count + 1);
                              })
                              .catch(() => {
                                console.log('실패');
                              });
                          }}
                        >
                          더보기
                        </button>
                      </div>
                    )}
                    <div style={{ height: '300vh' }}></div>
                  </div>
                }
              />
              {/* 상세페이지 */}
              <Route
                path="/detail/:pid"
                element={<Detail product={product} />}
              />
              {/* 장바구니 */}
              <Route path="/cart" element={<Cart product={product} />} />
              {/* 이벤트 */}
              <Route path="/event" element={<Event />}>
                <Route
                  path="one"
                  element={<div>첫 주문시 양배추즙 서비스스</div>}
                />
                <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
              </Route>
              {/* 404 */}
              <Route path="*" element={<div>없는 페이지</div>} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <footer className="flow-gradient">
        <div className="container">
          <p className="pt-2 pb-2 text-center">&copy; 2026</p>
        </div>
      </footer>
    </div>
  );
}

function Event() {
  return (
    <>
      오늘의 이벤트
      <Outlet></Outlet>
    </>
  );
}

// 상품 리스트
function Product(props) {
  return (
    <div className="__item">
      <Link to={'/detail/' + props.product.id} className="block">
        <span className="__img">
          <img
            src={props.product.img}
            alt=""
            className="aspect-video object-cover"
          />
        </span>
        <h3>{props.product.title}</h3>
        <p>
          <b>{props.product.price}원</b>
        </p>
      </Link>
    </div>
  );
}

export default App;
