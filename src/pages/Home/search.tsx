import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { search } from '../../api/product'
import { Link } from 'react-router-dom';
type Props = {}
export type PRODUCT = {
    _id: number,
    name: string;
    feature: string;
    descriptionS: string;
    descriptionL: string;
    saleOffPrice: number;
    originalPrice: number;
    image: string;
};
const Search = (props: Props) => {
    const { search_value } = useParams()
    const [search_ilitial, setSearch] = useState<PRODUCT[]>([])

    useEffect(() => {
        const searchs = async () => {
            const { data } = await search(search_value)
            console.log(data)
            setSearch(data)
        }
        searchs()
    }, [search_value])

    return (

        <div className="container mx-auto px-6">
            <h3 className="text-gray-700 text-2xl font-medium"> Tìm thấy <span className='font-bold text-2xl my-10'>"{search_ilitial.length}"</span>  sản phẩm </h3>
            <div className="row">
                {search_ilitial.map((product, index) => {
                    return (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                
                                <div className="bestselling__product-img">
                                                <a href="single-page.html">{product.image
                                                    ? <img src={product.image} width={100} alt="" />
                                                    : null}</a>
                                </div>
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href='' className="bestselling__product-link">{product.name}</a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    {product.saleOffPrice} vnd
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <Link to={`/product/${product._id}`}><button className="bestselling__product-btn">Xem hàng</button></Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search