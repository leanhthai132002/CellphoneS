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
import { getAll, getProduct } from '../../../api/product';
import { useDispatch } from "react-redux";
import cartSlice from "../Cart/cartSlice.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Typography } from "antd";
import Card from "react-bootstrap/Card";
type PRODUCT_TYPE = {
    id: string;
    name: string;
    saleOffPrice: number;
    feature: string;
    description: string;
    originalPrice: number;
    image: string;
    categories: string
};
const { Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
    {
        key: "phone",
        icon: React.createElement(LaptopOutlined),
        label: <Link to="/phone">Điện thoại</Link>,
    },
];

const DetailPage = () => {
    const [products, setProducts] = useState<PRODUCT_TYPE[]>([]);
    const handleGetProducts = async () => {
        const response = await getAll();
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
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            style={{ height: "100%", borderRight: 0 }}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
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
                                        {product?.description}
                                    </p>
                                    <div style={{ marginTop: '160px' }}>
                                        <ButtonStyle type="submit">Mua hàng</ButtonStyle>
                                        <CartStyle onClick={() => addToCart(product)} type="submit">
                                            <ShoppingCartOutlined />

                                        </CartStyle>
                                    </div>
                                </div>
                            </LayoutStyle>
                        </Content>
                        <h3 style={{marginTop: '50px'}}>Sản phẩm cùng loại</h3>
                        <>
                            <Row xs={1} md={5} className="g-3">
                                {Array.from({ length: 1 }).map((_, idx) => (
                                    <>
                                        {products.map((product) => (
                                            <Col>
                                                <Card style={{ padding: "5px" }}>
                                                    <Card.Img
                                                        variant="top"
                                                        style={{ width: "227px" }}
                                                        src={product.image}
                                                    />
                                                    <Card.Body>
                                                        <Card.Title>
                                                            <Link to={`/detail/${product.id}`}>{product.name}</Link>
                                                        </Card.Title>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <div className="price-group" style={{ display: "flex" }}>
                                                            <p
                                                                className="old-price"
                                                                style={{ color: "#d71a00", textAlign: "left" }}
                                                            >
                                                                {product.saleOffPrice.toLocaleString()}.đ
                                                            </p>
                                                            <p
                                                                className="price sale-price"
                                                                style={{ textAlign: "right", marginLeft: "50px" }}
                                                            >
                                                                {product.originalPrice.toLocaleString()}đ
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>Thu cũ lên đời - Trợ giá 1 triệu</p>
                                                            <StarStyle className="fa fa-star"></StarStyle>
                                                            <StarStyle className="fa fa-star"></StarStyle>
                                                            <StarStyle className="fa fa-star"></StarStyle>
                                                            <span className="fa fa-star"></span>
                                                            <span className="fa fa-star"></span>
                                                        </div>
                                                    </Card.Footer>

                                                </Card>

                                            </Col>

                                        ))}
                                    </>
                                ))}
                            </Row>
                        </>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

const ButtonStyle = styled.button`
  background-color: red;
  color: #fff;
  border-radius: 20px;
  border: none;
  padding: 10px 40px;
`;
const CartStyle = styled.button`
  border: red 1px solid;
  color: red;
  padding: 9px;
  border-radius: 20px;
`;
const LayoutStyle = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    
`;
const StarStyle = styled.span`
  color: orange;

`
export default DetailPage;
