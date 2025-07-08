import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const menuList = [
    '여성',
    'Divided',
    '남성',
    '신생아/유아',
    '아동',
    'H&M Home',
    'Sale',
    '지속가능성',
  ];
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = (event) => {
    if (event.key === 'Enter') {
      //입력한 검색어를 읽어와서
      let keyword = event.target.value;
      console.log('keyword', keyword);
      //url을 바꿔준다
      navigate(`/?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };
  return (
    <div>
      <div>
        <div className='login-button' onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} />
          <div>로그인</div>
        </div>
      </div>
      <div className='nav-section'>
        <img
          width={100}
          className='logo'
          src='https://brandyhq.com/wp-content/uploads/2024/12/H-and-M-Logo.jpg'
          alt=''
        />
      </div>
      <div className='menu-area'>
        <ul className='menu-list'>
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </ul>
        <div className='search-container'>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type='text'
            className='search-input'
            value={searchKeyword}
            onChange={handleSearchChange}
            onKeyDown={(event) => search(event)}
            placeholder='상품을 검색하세요...'
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
