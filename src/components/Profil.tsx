import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeRole } from '../slices/auth';

const Profil = () => {
	const { user: currentUser } = useAppSelector((state) => state.auth);
	const [rolesValue, setRolesValue] = useState('');
	const dispatch = useAppDispatch();

	// on peut changer le rôle de plusieurs manières :

	// directement en appelant un dispatch sur le onChange du select
	// const handleRole = (role: string) => {
	// 	dispatch(changeRole(role));
	// }

	// ou avec useEffect, qui s'exécutera à chaque fois que la variable rolesValue est changée
	useEffect(() => {
		dispatch(changeRole(rolesValue));
	}, [rolesValue]);

	return (
		<div className="container">
			<div className="row">
				<div className="d-flex align-self-center col-md-4">
					<img src='https://svgshare.com/i/dUP.svg' title='' alt='' />
				</div>
				<div className='col-md-8'>
					<header className="jumbotron">
						<h2>Profil de : <strong>{currentUser.username}</strong></h2>
						<p>
							<strong>Token:</strong> {currentUser.accessToken}
						</p>
						<p>
							<strong>id:</strong> {currentUser.id}
						</p>
						<p>
							<strong>Email:</strong> {currentUser.email}
						</p>
						<strong>Rôles:</strong>
						<ul>
							{currentUser.roles &&
								currentUser.roles.map((role: any, index: any) => <li key={index}>{role}</li>)}
						</ul>
					</header>
					<div className='card'>
						<div className='row'>
						<div className='col-md-12'>
							<label htmlFor='selectRole'>Rôles</label>
							<select name='selectRole' className='form-control' onChange={(e) => setRolesValue(e.target.value)}>
								<option value=''>Tous les rôles</option>
								<option value='ADMIN'>ADMIN</option>
								<option value='MODERATEUR'>MOD</option>
							</select>
						</div>
						</div>
						
						
					</div>
				</div>
			</div>


		</div>
	)
}

export default Profil;