import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useParams } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getProducts, getProduct } from '../../../api/product';
import { useDispatch } from "react-redux";
import cartSlice from "../Cart/cartSlice.js";
import { Col, Row } from 'antd';
import { Typography } from "antd";
import Card from "react-bootstrap/Card";
type PRODUCT_TYPE = {
    id: string;
    name: string;
    saleOffPrice: number;
    feature: string;
    descriptionS: string;
    descriptionL: string;
    originalPrice: number;
    image: string;
    categories: string
};
const { Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
}));


const DetailPage = () => {
    const [products, setProducts] = useState<PRODUCT_TYPE[]>([]);
    
    const handleGetProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    const dispatch = useDispatch();
    const addToCart = (product: any) => {
        alert("Thêm giỏ hàng thành công")
        dispatch(cartSlice.actions.add(product))

    }
    const { id } = useParams();
    const [product, setProduct] = useState<PRODUCT_TYPE>();
    const handleGetProductDetail = async () => {
        const response = await getProduct(id);
        setProduct(response.data);
    }

    useEffect(() => {
        handleGetProductDetail();
    }, []);
    return (
        <>
            <Layout>
                <Layout>
                    <Layout style={{padding: ' 0 100px' , backgroundColor: '#fff'}}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <LayoutStyle>
                                <div>
                                    <h4>{product?.name}</h4>
                                    <img
                                        style={{ marginBottom: "10px" }}
                                        src={product?.image}
                                        alt=""
                                    />
                                </div>

                                <div>
                                    <div style={{ display: 'flex' }}>
                                        <h4 style={{ color: 'red' }}>{product?.saleOffPrice.toLocaleString()}đ</h4>
                                        <h5 style={{ marginLeft: '10px', fontSize: '18px' }}>{product?.originalPrice.toLocaleString()}đ</h5>
                                    </div>

                                    <p>
                                        {product?.descriptionS}
                                    </p>
                                    <div style={{ marginTop: '160px' }}>
                                        <ButtonStyle type="submit">Mua ngay</ButtonStyle>

                                        <CartStyle onClick={() => addToCart(product)} type="submit">
                                            <ShoppingCartOutlined />
                                        </CartStyle>
                                        <p style={{display: 'inline', width: '2px'}}>Thêm giỏ</p>
                                    </div>
                                </div>
                            </LayoutStyle>
                        </Content>
                        <h3 style={{ marginTop: '50px' }}>Sản phẩm cùng loại</h3>
                        <Row justify="space-around">
                            <Col style={{ border: '1px solid #eceaea', textAlign: 'center' }} span={4}>
                                <img style={{ width: '200px' }} src="https://i.imgur.com/CavfPFX.png" alt="" />
                                <p style={{ textAlign: 'left', paddingLeft: '5px' }} >Tai nghe Bluetooth Samsung Galaxy Buds Live</p>
                                <p style={{ textAlign: 'left', paddingLeft: '5px', color: 'red' }}>1.490.000 ₫</p>
                                <p>20 đánh giá</p>
                            </Col>
                            <Col style={{ border: '1px solid #eceaea', textAlign: 'center' }} span={4}>
                                <img style={{ width: '200px' }} src="https://i.imgur.com/bjmfbvE.png" alt="" />
                                <p style={{ textAlign: 'left', paddingLeft: '5px' }}>Ốp lưng Samsung Galaxy A73 2022 Silicone Cover</p>
                                <p style={{ textAlign: 'left', paddingLeft: '5px', color: 'red' }}>590.000 ₫</p>
                            </Col>
                            <Col style={{ border: '1px solid #eceaea', textAlign: 'center' }} span={4}>
                                <img style={{ width: '200px' }} src="https://i.imgur.com/CJlCOpH.png" alt="" />
                                <p style={{ textAlign: 'left', paddingLeft: '5px' }}>Ốp lưng Samsung Galaxy A73 Spring Seine Scene</p>
                                <p style={{ textAlign: 'left', paddingLeft: '5px', color: 'red' }}>176.000 ₫</p>
                            </Col>
                            <Col style={{ border: '1px solid #eceaea', textAlign: 'center' }} span={4}>
                                <img style={{ width: '200px' }} src="https://i.imgur.com/wrDeQq4.png" alt="" />
                                <p style={{ textAlign: 'left', paddingLeft: '5px' }}>Dán chống va đập full màn đen Samsung Galaxy A73</p>
                                <p style={{ textAlign: 'left', paddingLeft: '5px', color: 'red' }}>120.000 ₫</p>
                            </Col>
                            <Col style={{ border: '1px solid #eceaea', textAlign: 'center' }} span={4}>
                                <img style={{ width: '200px' }} src="https://i.imgur.com/Kt2EjtZ.png" alt="" />
                                <p style={{ textAlign: 'left', paddingLeft: '5px' }}>Ốp lưng Samsung Galaxy A73 OU Silicone</p>
                                <p style={{ textAlign: 'left', paddingLeft: '5px', color: 'red' }}>70.000 ₫</p>
                            </Col>
                        </Row>
                        <div>
                            
                            <div style={{backgroundColor: '#F2F2F2', padding: '10px', marginTop: '10px'}}>
                                <h4>Đặc điểm nổi bật</h4>
                                {product?.feature}
                            </div>
                            <h4>Chi tiết</h4>
                            {product?.descriptionL}
                        </div>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

const ButtonStyle = styled.button`
  background: #FF3945;
  border-radius: 4px;
  color: #fff;
  border: none;
  padding: 10px 40px;
  
`;
const CartStyle = styled.button`
  background: #FFFFFF;
  border: 1px solid #D70018;  
  border-radius: 4px;
  color: red;
  padding: 9px;
  margin: 0 10px;
`;
const LayoutStyle = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    
`;
const StarStyle = styled.span`
  color: orange;

`
export default DetailPage;
