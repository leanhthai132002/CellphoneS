import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import LogoImage from '../../assets/images/logo.png'
import AutoComplete from "../Input/AutoComplete";
const Header = () => {
    return (
        <Wrapper>
            <Container>
                <Link to={'/'}><Logo src={LogoImage} /></Link>
                <AutoComplete/>
                <ul>
                    <UlStyle>Gọi mua hàng</UlStyle>
                    <UlStyle>Cửa hàng gần bạn</UlStyle>
                    <UlStyle>Tra cứu đơn hàng</UlStyle>
                    <UlStyle><Link style={{color: '#fff'}} to='/cart'>Giỏ hàng</Link></UlStyle>
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
