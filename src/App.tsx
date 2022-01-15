import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// sécurisation dispatch && selector avec redux toolkit && typescript
import { useAppDispatch, useAppSelector } from './app/hooks';

// Components
import NotFound from './components/NotFound'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Profil from './components/Profil'

import { logout } from "./slices/auth";

function App() {
	const {user: currentUser} = useAppSelector((state) => state.auth); //user contenu dans le state
	const dispatch = useAppDispatch(); //préparation de la fonction dispatch protégée

	const [showModeratorBoard, setShowModeratorBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);


	useEffect(() => {
		if (currentUser) {
			setShowModeratorBoard(currentUser.roles.includes('MODERATEUR'));
			setShowAdminBoard(currentUser.roles.includes('ADMIN'));
		} else {
			setShowModeratorBoard(false);
			setShowAdminBoard(false);
		}
	}, [currentUser]);

	return (
		<div className="App">
			<Router>
				<div className="navbar-wrapper">
					<nav className="navbar navbar-expand navbar-dark bg-dark ms-auto">
						<Link to={"/"} className="navbar-brand">Orixa Login Test</Link>
						<div className="navbar-nav mr-auto navbar-right">

							{showModeratorBoard && (
								<div className="nav-item">
									<Link to={'/mod'} className="nav-link">Dashboard Modérateur</Link>
								</div>
							)}

							{showAdminBoard && (
								<div className="nav-item">
									<Link to={'/admin'} className="nav-link">Dashboard Admin</Link>
								</div>
							)}

							{currentUser ? (
								<div className="navbar-nav ml-auto">
									<li className="nav-item">
										<Link to={"/profil"} className="nav-link">Mon profil : {currentUser.username}</Link>
									</li>
									<li className="nav-item">
										<a href="/login" className="nav-link" onClick={() => dispatch(logout())}>Se déconnecter</a>
									</li>
								</div>
							) : (
								<div className="navbar-nav ml-auto">
									<li className="nav-item">
										<Link to={"/register"} className="nav-link">Inscription</Link>
									</li>
									<li className="nav-item">
										<Link to={"/login"} className="nav-link">Connexion</Link>
									</li>
								</div>
							)}
						</div>
					</nav>
				</div>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					{currentUser && (
						<Route path="/profil" element={<Profil />} />
					)}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
