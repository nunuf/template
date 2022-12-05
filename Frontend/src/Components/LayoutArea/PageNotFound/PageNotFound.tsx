import { NavLink } from 'react-router-dom';
import { Undo } from '@mui/icons-material';
import notFound from '../../../Assets/Images/404.webp'
import './PageNotFound.css';

const PageNotFound = (): JSX.Element => {
  return (
    <div className="PageNotFound">
      <h2>The page you are looking for doesn't exist</h2>
      <img src={notFound} alt='' /> 
      <div>
      <NavLink to="/home" className="Back">Back Home<Undo /></NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
