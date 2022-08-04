import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../../api/auth";

type FormInputs = {
  phone: string;
  email: string;
  password: string | number;
};
const Signup = () => {
  const { register, handleSubmit, formState } = useForm<FormInputs>();
  const navigate = useNavigate();


  const onSubmit = async (data: FormInputs) => {
    const response = await signup(data);

    if (response.status === 200) {
      navigate("/");
      alert("Đăng kí thành công");
    }
  };

  return (
    <BodyStyle>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FormStyle className="user" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-user"
          id="exampleFirstEmail"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>
      <br />
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-user"
          id="exampleInputPhone"
          placeholder="Số điện thoại"
          {...register("phone", { required: true })}
        />
      </div>
      <br />
      <section style={{ color: "red", marginBottom: 10 }} />
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-user"
          id="exampleInputPassword"
          placeholder="Mật khẩu"
          {...register("password", { required: true })}
        />
      </div>
      <br />

      <button
        className="btn btn-primary form-control btn-user btn-block"
        type="submit"
        name="bnt-dk"
      >
        {" "}
        Đăng ký
      </button>
      <section />
        <br />
      <div className='form-group'>
          <p style={{ textAlign: 'center' }} >Hoặc đăng nhập bằng</p>
          <div style={{textAlign: 'center'}}>
            <ImgStyle src="https://i.imgur.com/IDObCCF.png" alt="" />
            <ImgStyle src="https://i.imgur.com/rHtLcZG.png" alt="" />
          </div>
        </div>
    </FormStyle>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </BodyStyle>

  );
};
const FormStyle = styled.form`
  border-radius: 20px;
  padding: 200px;
  width: 50%;
  margin: auto;
  background-color: #fff;
 padding-top: 100px;
`
const BodyStyle = styled.div`
  background-color: #E5E5E5;
`

const ImgStyle = styled.img`
  width: 58px;
  margin: 10px;
  margin-bottom: 0px;
`
export default Signup;
