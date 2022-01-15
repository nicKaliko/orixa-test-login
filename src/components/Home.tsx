import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const Home = () => {
	const { user: currentUser } = useAppSelector((state) => state.auth);

	return (
		<div>
			{!currentUser ? (
				<div className='col-md-12'>
					<div className='row d-flex justify-content-center'>
					<div className="col-md-5 col-md-push-1">
						<img alt='' src='https://svgshare.com/i/dVU.svg' title='' />
					</div>
					<div className='col-md-6 align-self-center'>
						<div className="container d-flex justify-content-center container-intro">
							<div className="jumbotron my-auto">
								<h1 className="display-3">Hello, world!</h1>
							</div>
						</div>
						<div className="container d-flex justify-content-center text-center">
							<div className="d-flex flex-column">
								<div className="p-2"><h3>Quelques propositions d'actions:</h3></div>

								<div className="p-2">
									<Link to={"/login"}>Se connecter</Link> <br />
									<Link to={"/register"}>S'inscrire</Link> <br />
									<Link to={"/profil"}>Essayer d'accéder à une page réservée</Link><br />
								</div>
							</div>
						</div>
					</div>
					</div>
					


				</div>
			) : (
				<div>
					<div className="container d-flex justify-content-center text-center">
						<div className="container d-flex justify-content-center container-intro">
							<div className="jumbotron my-auto">
								<h1 className="display-3">Bienvenue, {currentUser.username}</h1>
							</div>
						</div>
					</div>
					<div className="container d-flex justify-content-center text-center">
						<div className="d-flex flex-column">
							<div className="p-2">
								<p>Vous pouvez consulter votre profil pour changer vos rôles, ou vous déconnecter.</p>
							</div>
						</div>
					</div>
				</div>

			)}
		</div>
	);
}

export default Home;