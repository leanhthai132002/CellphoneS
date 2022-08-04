import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signin } from '../../api/auth';

type FormInputs = {
  phone: string,
  email: string,
  password: string | number
}
const Signin = () => {
  const { register, handleSubmit, formState } = useForm<FormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const { data: user } = await signin(data);
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/admin/product')
  }
  return (
    <BodyStyle>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FormStyle action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp"{...register('email', { required: true })} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="">Mật khẩu</label>
          <input type="password" className="form-control form-control-user" id="exampleInputPassword" {...register('password', { required: true })} />
        </div>
        <section />
        <br />
        <input type="Đăng nhập" name="dangnhap" className="btn btn-primary form-control btn-user btn-block" defaultValue="Đăng nhập" />
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
      <br />

    </BodyStyle>

  )
}

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
export default Signin