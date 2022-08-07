import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signin } from '../../api/auth';
import LogoImage from '../../assets/images/logo.png'
type FormInputs = {
  _id: string,
  phone: string;
  email: string;
  password: string;
}
const Signin = () => {
  const { register, handleSubmit, formState } = useForm<FormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const { data: user } = await signin(data);
    try {
      alert("Đăng nhập thành công")
    } catch (error) {
      alert("Sai toàn khoản hoặc mật khẩu")
    }
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/admin')
  }
  return (
    <BodyStyle>
      <br />
      <br />
      <br />
      <FormStyle style={{paddingBottom: '88px'}} action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div>
        <div className="form-group">
          <input type="email" placeholder='Email' className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp"{...register('email', { required: true })} />
        </div>
        <br />
        <div className="form-group">
          <input type="password" placeholder='Mật khẩu' className="form-control form-control-user" id="exampleInputPassword" {...register('password', { required: true })} />
        </div>
        <span></span>
        <section />
        <br />
        <input type="submit" name="dangnhap" value="Đăng nhập" className="btn btn-primary form-control btn-user btn-block" defaultValue="Đăng nhập" />
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
export default Signin