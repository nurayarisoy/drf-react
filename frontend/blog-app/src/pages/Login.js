import { Avatar, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { clearErrors, login } from '../redux/actions/userAction';

//! Yup --> validation olarak kullanılıyor
//! Bu şemayı Formik içerisine validationShema olarak atıyoruz.
const signUpValidationSchema = Yup.object().shape({
  //! En az 2 karakter olması lazım. olmazsa yanına yazdığımız mesajı
  email: Yup.string().email('Invalid Email'),
  username: Yup.string().min(2, 'Username must be at least 2 characters'),
  password: Yup.string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/\d+/, 'Password must have a number')
    .matches(/[a-z]+/, 'Password must have a lowercase')
    .matches(/[A-Z]+/, 'Password must have a uppercase')
    .matches(/[!?.@#$%^&*()-+]+/, 'Password must have a special char')
});

function Login() {
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector(state => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, dispatch, isAuthenticated, navigate, redirect]);

  const handleSubmit = (values, { resetForm }) => {
    // console.log(values);
    dispatch(login(values, navigate));
    resetForm();
   