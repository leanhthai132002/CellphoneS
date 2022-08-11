import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/product";
import { Link } from "react-router-dom";

type PRODUCT_TYPE = {
    _id: number,
    name: string;
    saleOffPrice: number;
    feature: string;
    descriptionS: string;
    descriptionL: string;
    originalPrice: number;
    image: string;
    categories: string
};

export default function ProductAdminPage() {
    const [products, setProducts] = useState<PRODUCT_TYPE[]>([]);

    const handleGetProducts = async () => {
        const response = await getProducts();
        setProducts(response.data)
    };

    const ondelete = async (_id: number) => {
        const response = await deleteProduct(_id);
        if (response.status === 200) {
            handleGetProducts();
        }
    }


    useEffect(() => {
        handleGetProducts();
    }, [])

    return (
        <div>
            <div >
                <Link
                    className="btn btn-primary"
                    style={{ margin: "0px 10px" }}
                    to={"/admin/products/add"}
                >
                    Tạo mới product
                </Link>
            </div>
            <div style={{ marginBottom: "432px" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <td scope="col">ID</td>
                            <td scope="col">Tên sản phẩm</td>
                            <td scope="col">Ảnh</td>
                            <td scope="col">Giá</td>
                            <td scope="col">Mô tả ngắn</td>
                            <td scope="col">Mô tả dài</td>
                            <td scope="col">Danh mục</td>
                            <td scope="col">Ẩn hiện</td>
                            <td scope="col">Thao tác</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td><img style={{width: '100px'}} src={product.image} alt="" /></td>
                                    <td>{product.saleOffPrice.toLocaleString()}</td>
                                    <td>{product.descriptionS}</td>
                                    <td>{product.descriptionL}</td>
                                    <td>{product.categories}</td>
                                    <td><Link className="btn btn-warning" to={`/admin/products/edit/${product._id}`}>Chỉnh sửa</Link></td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => ondelete(product._id as number)}>
                                            <p>Xoá</p>

                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
