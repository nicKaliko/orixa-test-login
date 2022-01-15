import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center vh-100">
            <h1>404</h1>
            <h2>Page non trouvée!</h2>
            <p>Il semblerait que la page demandée n'existe pas.</p>
            <p><Link to={"/"}>Retourner à l'accueil</Link></p>
        </div>
    )
}

export default NotFound;