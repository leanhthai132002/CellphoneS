import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../../api/auth";
import LogoImage from '../../assets/images/logo.png'
type FormInputs = {
  _id: string,
  phone: string;
  email: string;
  password: string;
};
const Signup = () => {
  const { register, handleSubmit, formState } = useForm<FormInputs>();
  const navigate = useNavigate();


  const onSubmit = async (data: FormInputs) => {
    const response = await signup(data);

    if (response.status === 200) {
      alert("Đăng kí thành công");
      navigate("/");
    }else{
      alert("Đăng kí không thành công");
    }
  };

  return (
    <BodyStyle>
      <br />
      <br />
      <br />
      <br />
      <FormStyle style={{paddingBottom: '100px'}} className="user" method="POST" onSubmit={handleSubmit(onSubmit)}>
<div>
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
      <div className="form-group">
        <input
          type="password"
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
</div>
<div>
        <Img2Style src={LogoImage} alt="" />
        </div>
    </FormStyle>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const BodyStyle = styled.div`
  background-color: #E5E5E5;
`

const ImgStyle = styled.img`
  width: 58px;
  margin: 10px;
  margin-bottom: 0px;
`

const Img2Style = styled.img`
  margin: 10px;
  margin-left: 61px;
`
export default Signup;