import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // 모든 상품 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query] = useSearchParams();

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      let url = `http://localhost:3004/products`;
      console.log('API URL:', url);
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      console.log('받은 데이터:', data);

      // API 응답이 value 속성을 가진 객체인 경우 처리
      let products = [];
      if (data && data.value) {
        console.log('value 속성에서 데이터 추출:', data.value);
        products = data.value;
      } else if (Array.isArray(data)) {
        console.log('배열 형태의 데이터:', data);
        products = data;
      } else {
        console.error('예상치 못한 데이터 형식:', data);
        products = [];
      }

      setAllProducts(products); // 모든 상품 저장
      filterProducts(products, query.get('q') || '');

      // 이미지 URL 확인을 위한 로그
      products.forEach((product, index) => {
        console.log(`상품 ${index + 1}:`, {
          id: product.id,
          title: product.title,
          img: product.img,
        });
      });
    } catch (err) {
      console.error('데이터 가져오기 오류:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 클라이언트 사이드 필터링 함수
  const filterProducts = (products, searchQuery) => {
    if (!searchQuery.trim()) {
      setProductList(products);
      return;
    }

    const filtered = products.filter((product) => {
      const title = product.title?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return title.includes(query);
    });

    console.log('필터링된 상품:', filtered);
    setProductList(filtered);
  };

  useEffect(() => {
    getProducts();
  }, []); // 컴포넌트 마운트 시에만 실행

  // 검색 쿼리가 변경될 때마다 필터링 실행
  useEffect(() => {
    if (allProducts.length > 0) {
      filterProducts(allProducts, query.get('q') || '');
    }
  }, [query, allProducts]);
  if (loading) {
    return (
      <div className='text-center mt-5'>
        <h3>로딩 중...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center mt-5'>
        <h3>오류가 발생했습니다: {error}</h3>
        <button onClick={getProducts} className='btn btn-primary mt-3'>
          다시 시도
        </button>
      </div>
    );
  }

  const searchQuery = query.get('q') || '';

  return (
    <div>
      <Container>
        {searchQuery && (
          <div className='mb-4'>
            <h4>검색 결과: "{searchQuery}"</h4>
            <p>총 {productList.length}개의 상품을 찾았습니다.</p>
          </div>
        )}
        <Row>
          {productList.length === 0 ? (
            <Col className='text-center mt-5'>
              <h3>
                {searchQuery
                  ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                  : '상품이 없습니다.'}
              </h3>
            </Col>
          ) : (
            productList.map((menu) => (
              <Col lg={3} key={menu.id}>
                <ProductCard item={menu} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
