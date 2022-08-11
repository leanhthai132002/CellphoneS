import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProduct, updateProduct, getProduct } from "../../../api/product";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import "react-toastify/dist/ReactToastify.css";

type PRODUCT_TYPE = {
    name: string;
    feature: string;
    descriptionS: string;
    descriptionL: string;
    saleOffPrice: number;
    originalPrice: number;
    image: string;
};

function FormProduct() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [imageBase64, setImageBase64] = useState<any>('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            feature: "",
            descriptionS: "",
            descriptionL: "",
            saleOffPrice: 0,
            originalPrice:0,
            image: "",
        },
    });
    const onSubmit: SubmitHandler<PRODUCT_TYPE> = (data) => {
        const submitData = {
            ...data,
            saleOffPrice: +data.saleOffPrice,
            originalPrice: +data.originalPrice,
            image: imageBase64  
        };
        if (id) {
            return handleUpdateProduct(submitData);
        }
        return handlecreateProduct(submitData);
    };

    const handlecreateProduct = async (data: PRODUCT_TYPE) => {
        const response = await createProduct(data);

        if (response.status === 200) {
            alert("Thêm sản phẩm thành công")
            navigate("/admin");
        }
    };

    const handleUpdateProduct = async (data: PRODUCT_TYPE) => {
        const response = await updateProduct(id, data);

        if (response.status === 200) {
            alert("Cập nhật sản phẩm thành công")
            navigate("/admin");
        }
    };

    const handleGetProduct = async (id: string) => {
        const response = await getProduct(id);
        if (response.status === 200) {
            reset({
                ...response.data,
                status: `${response.data.status}`,
            });
        }
    };

    const getEventResult = (event: any) => {
        if (event && event.target && typeof event.target.result == 'string') {
            return event.target.result;
        }

        return '';
    };

    const handleChangeFile = (event: any) => {
        // const acceptImageTypes = ['image/png', 'image/jpg'];
        const file = event.target.files[0];
        if (!file) {
            console.log('Không có file');
            return;
        } else if (file.size > 500000) {
            console.log('File quá lớn');
            return;
        } 
        // else if (!acceptImageTypes.includes(file.type)) {
        //     console.log('File không đúng định dạng');
        //     return;
        // }

        // 1. Định nghĩa 1 đối tượng đọc file
        const reader = new FileReader();
        // 2. Định nghĩa việc load file
        reader.onload = (e) => {
            const image = new Image();
            if (e && e.target) {
                image.src = getEventResult(e);
                console.log(image.width, image.height, file.size, file.type);
                setImageBase64(e.target.result);
            }
        };

        // 3. Load file mà lấy được từ input
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (id) {
            handleGetProduct(id);
        }
    }, [id]);

    return (
        <div>

            <form
                onSubmit={handleSubmit(onSubmit)} style={{
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                }}
            >

                <div className="">
                    <div className="mb-3">
                        <label className="form-label">Tên sản phẩm</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Sản phẩm'
                            {...register(
                                'name',
                                {
                                    required: { value: true, message: 'Không được bỏ trống' },
                                }
                            )}
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.name ? errors.name.message : ''}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tính năng nổi bật</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Tính năng nổi bật'
                            {...register(
                                'feature',
                                {
                                    required: { value: true, message: "Không được bỏ trống" }
                                }
                            )}
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.feature ? errors.feature.message : ''}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Mô tả ngắn'
                            {...register(
                                'descriptionS',
                                {
                                    required: { value: true, message: "Không được bỏ trống" }
                                }
                            )}
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.descriptionS ? errors.descriptionS.message : ''}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Mô tả dài'
                            {...register(
                                'descriptionL',
                                {
                                    required: { value: true, message: "Không được bỏ trống" }
                                }
                            )}
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.descriptionL ? errors.descriptionL.message : ''}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giá khuyến mại</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Giá khuyến mại'
                            {...register(
                                'saleOffPrice',
                                {
                                    required: { value: true, message: "Không được bỏ trống" }
                                }
                            )}
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.saleOffPrice ? errors.saleOffPrice.message : ''}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giá mặc định</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Giá mặc định'
                            {...register(
                                'originalPrice',
                                {
                                    required: { value: true, message: "Không được bỏ trống" }
                                }
                            )}
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.originalPrice ? errors.originalPrice.message : ''}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ảnh</label>
                        <input
                            className="form-control"
                            type="file"
                            {...register(
                                'image',
                                {
                                    required: { value: true, message: "Không được bỏ trống" }
                                }
                            )}
                            onChange={(event) => handleChangeFile(event)}
                            
                        />
                        <div id="emailHelp" className="form-text" style={{ color: 'red' }}>
                            {errors.image ? errors.image.message : ''}
                        </div>
                        <img src={imageBase64} width={100} alt="" />

                    </div>
                 

                    <button className="btn btn-primary">
                        {id ? "Cập nhật" : "Tạo mới"}
                    </button>

                </div>
            </form>
        </div>
    );
}

export default FormProduct;