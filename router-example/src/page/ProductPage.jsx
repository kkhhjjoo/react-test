import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductPage = () => {
  let [query, setQuery] = useSearchParams();
  console.log('ddd', query.get('q'));
  return (
    <div>
      <h1>Show all product!!</h1>
    </div>
  );
};

export default ProductPage;
