import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // item이 없으면 렌더링하지 않음
  if (!item) {
    console.log('ProductCard: item이 없습니다');
    return null;
  }

  console.log('ProductCard 렌더링:', item);

  const showDetail = () => {
    if (item.id) {
      navigate(`/product/${item.id}`);
    } else {
      console.error('ProductCard: item.id가 없습니다', item);
    }
  };

  // 이미지 URL 생성 함수
  const getImageUrl = () => {
    if (!item?.img) {
      return 'https://via.placeholder.com/300x400/CCCCCC/FFFFFF?text=이미지+없음';
    }

    // API에서 받은 이미지 URL 반환
    return item.img;
  };

  // 대체 이미지 URL 생성 (이미지 로드 실패 시 사용)
  const getFallbackImageUrl = () => {
    const colors = [
      'FF6B6B',
      '4ECDC4',
      '45B7D1',
      '96CEB4',
      'FFEAA7',
      'DDA0DD',
      '98D8C8',
      'F7DC6F',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const productName = item?.title || '상품';

    return `https://via.placeholder.com/300x400/${randomColor}/FFFFFF?text=${encodeURIComponent(
      productName
    )}`;
  };

  return (
    <div
      className='card'
      onClick={showDetail}
      style={{
        cursor: 'pointer',
        margin: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', height: '200px' }}>
        {!imageLoaded && !imageError && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
            }}
          >
            이미지 로딩 중...
          </div>
        )}
        <img
          src={getImageUrl()}
          alt={item?.title || '상품 이미지'}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none',
          }}
          onError={(e) => {
            console.log('이미지 로드 실패:', {
              originalUrl: item?.img,
              attemptedUrl: e.target.src,
              productTitle: item?.title,
            });
            setImageError(true);
            e.target.src = getFallbackImageUrl();
          }}
          onLoad={(e) => {
            console.log('이미지 로드 성공:', {
              url: e.target.src,
              productTitle: item?.title,
            });
            setImageLoaded(true);
            setImageError(false);
          }}
        />
      </div>
      <div className='card-body' style={{ padding: '15px' }}>
        <div style={{ color: '#666', fontSize: '12px' }}>Conscious choice</div>
        <div style={{ fontWeight: 'bold', margin: '8px 0' }}>
          {item?.title || '제목 없음'}
        </div>
        <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>
          {item?.price || '가격 정보 없음'}
        </div>
        {item?.new === true && (
          <div
            style={{
              color: '#27ae60',
              fontSize: '12px',
              fontWeight: 'bold',
              marginTop: '5px',
            }}
          >
            신제품
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
