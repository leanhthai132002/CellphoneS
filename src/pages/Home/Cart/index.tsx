import React from 'react'
import { Breadcrumb, Col, Layout, Menu, MenuProps, Row } from "antd";
import { Link } from 'react-router-dom';
import { LaptopOutlined } from "@ant-design/icons";
import cartSlice from "./cartSlice.js";
import { currency } from "../../../helper.js";
import {Divider, Typography, Button, InputNumber } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
const { Title } = Typography
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

function CartPage() {
    const { cart } = useSelector(store => store)
    const dispatch = useDispatch()
    const decreaseProduct = (id) => {
        dispatch(cartSlice.actions.decrease(id))
    }
    const increaseProduct = (id) => {
        dispatch(cartSlice.actions.increase(id))
    }
    return (
        <div>
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

                                <div className="cart">
                                    <Title level={3}>Giỏ hàng</Title>
                                    {cart.cart?.map(product => (
                                        <Row key={product.id}>
                                            <Col span={20}>
                                                <Title level={5}>{product.name}</Title>
                                                <Row>
                                                    <Col>
                                                        <img width="50%" src={product.image} />
                                                    </Col>
                                                    <Col>
                                                        <Typography>Số lượng</Typography>
                                                        <Row>
                                                            <Col><Button onClick={() => decreaseProduct(product.id)}>-</Button></Col>
                                                            <Col><InputNumber value={product.amount ? product.amount : 1} /></Col>
                                                            <Col><Button onClick={() => increaseProduct(product.id)}>+</Button></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col span={4}>
                                                <Title level={5}>{currency(product.total || product.saleOffPrice)}</Title>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Divider />
                                    <Row>
                                        <Col span={20}>Tổng số tiền</Col>
                                        <Col span={4}><Title level={3} style={{ color: "red" }}>{currency(cart.total)}</Title></Col>
                                    </Row>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        </div>
    )
}

export default CartPage