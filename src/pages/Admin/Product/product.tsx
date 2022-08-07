import React, { useEffect, useState } from "react";
import { getAll, deleteProduct } from "../../../api/product";
import { Link } from "react-router-dom";

type PRODUCT_TYPE = {
    id: string,
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
        const response = await getAll();
        setProducts(response.data)
    };

    const ondelete = async (id: string) => {
        const response = await deleteProduct(id);
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
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td><img style={{width: '100px'}} src={product.image} alt="" /></td>
                                    <td>{product.saleOffPrice.toLocaleString()}</td>
                                    <td>{product.descriptionS}</td>
                                    <td>{product.descriptionL}</td>
                                    <td>{product.categories}</td>
                                    <td><Link className="btn btn-warning" to={`/admin/products/edit/${product.id}`}>Chỉnh sửa</Link></td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => ondelete(product.id as string)}>
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
