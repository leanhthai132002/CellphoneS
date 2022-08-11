import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { SearchOutlined } from "@ant-design/icons";
import LogoImage from '../../assets/images/logo.png'

if (localStorage.getItem('user')) {
  Header.defaultProps = {
    name: 'Chào mừng: ' + JSON.parse(localStorage.getItem('user') || '{}').user.name,
  };
}

function Header(props: any) {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const info = localStorage.getItem('user');
  const onSearch = () => {
    const search_value = (document.querySelector('#search_content') as HTMLInputElement).value
    if (search_value != "") {
      navigate(`/search/${search_value}`)
    }
  }
  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedin(false);
    navigate('/')
  };



  return (
    <Wrapper>
      <Container>
        <Link to={'/'}><Logo src={LogoImage} /></Link>
        <div  style={{display:'flex', height: '40px'}}>
          <input style={{border: 'none'}} type="text" id="search_content"  placeholder="Tìm kiếm tại đây..." />
          <button style={{border: 'none'}} onClick={onSearch} aria-label="Search">
            <div>
            <SearchOutlined />
            </div>
          </button>
        </div>
        <ul>
          <UlStyle>Gọi mua hàng</UlStyle>
          <UlStyle>Cửa hàng gần bạn</UlStyle>
          <UlStyle>Tra cứu đơn hàng</UlStyle>
          <UlStyle><Link style={{ color: '#fff' }} to='/cart'>Giỏ hàng</Link></UlStyle>
          <UlStyle>{!info ? <Link style={{ color: '#fff' }} to='/signin'>Đăng nhập</Link> : <><h5 style={{ color: '#fff' }}>{props.name}</h5> <OutStyle onClickCapture={logout}>Đăng xuất</OutStyle></>}</UlStyle>
        </ul>
      </Container>
    </Wrapper>
  )
}


export default Header


const UlStyle = styled.li`
    display: inline-block;
    padding: 0 20px;
    padding-top: 10px;
    color: #fff;
`

const Logo = styled.img`
    width: 65px;
    height: auto;
    margin-right: 40px;
`

const Wrapper = styled.div`
    background-color: #D70018;
`

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`
const OutStyle = styled.p`
  :hover{
    cursor: pointer;
  }
`