import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';

import { register } from '../slices/auth';
import { clearMessage } from '../slices/message';

const Register = () => {
    // get state of Form && state of message
    const [successful, setSuccessful] = useState(false);
    const { message } = useAppSelector((state) => state.message);
    const dispatch = useAppDispatch();

    const initialValues = {
        username: "",
        email: "",
        password: ""
    };

    // si l'user est connecté, on le redirect
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    if (isLoggedIn) { return (<Navigate to="/profil" />); }

    // Schéma de validation - lib Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Ce champs est requis!")
            .test(
                "usernameLength",
                "Le nom d'utilisateur doit être compris entre 3 et 20 caractères.",
                (value?: string | undefined) =>
                    typeof value === 'string'
                    && value.toString().length >= 3
                    && value.toString().length <= 20
            ),
        email: Yup.string()
            .required("Ce champs est requis!")
            .email("Le format d'email n'est pas valide."),
        password: Yup.string()
            .required("Ce champs est requis!")
            .test(
                "passwordLength",
                "Le mot de passe doit contenir au moins 8 caractères.",
                (value: string | undefined) =>
                    typeof value === 'string'
                    && value.toString().length >= 8
            )
    });

    const handleRegister = (formValue: any) => {
        const { username, email, password } = formValue;
        setSuccessful(false);

        // simulé ici :
        // appel vers un reducer qui demande au backend d'inscrire un nouvel utilisateur
        dispatch(register({ username, email, password })); // ajoute le user dans le state et localStorage
        setSuccessful(true);
    };

    return (
        <div className="col-md-12 signup-form">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <h1 className='text-center'>Inscription</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
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
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary btn-block">inscription</button>
                                    <hr />
                                    <p>Déjà inscrit? <br /><Link to={"/login"}>&gt; connexion</Link> </p>
                                </div>
                            </div>
                        )}
                        {successful && (
                            <div className='text-center'>
                                <h1>Bienvenue !</h1>
                                <h3><Link to={'/profil'}> &gt; Naviguer</Link></h3>
                            </div>
                        )
                        }
                    </Form>
                </Formik>
            </div>

            {message && (
                <div className="form-group">
                    <div
                        className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;