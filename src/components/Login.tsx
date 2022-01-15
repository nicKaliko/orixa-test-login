import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate, Link } from "react-router-dom";

import { login } from '../slices/auth';

interface formLogin {
  username: string,
  password: string
}

const Login = (props: any) => {
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const { message } = useAppSelector((state) => state.message);

    const dispatch = useAppDispatch();

    const initialValues = {
        username:"",
        password:""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Ce champs est requis!"),
        password: Yup.string().required("Ce champs est requis!")
    });

    const handleLogin = (formValue: formLogin) => {
        const { username, password } = formValue;
        setLoading(true);

        //simul du login
        dispatch( login({ username, password }) );
    };

    if (isLoggedIn) {
        return (<Navigate to="/profil" />);
    }

    return (
        <div className="col-md-12 login-form">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
            <h1 className='text-center'>Connexion</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
    
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>connexion</span>
                  </button>
                </div>

                <div className="text-center">
                <hr />
                <p>
                    Pas encore inscrit? <br />                    
                    <Link to={"/register"}> &gt; inscription</Link>
                </p>
                </div>
              </Form>
            </Formik>
          </div>
    
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          
        </div>
      );
};

export default Login;