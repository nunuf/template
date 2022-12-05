import gifts from '../../../Assets/Images/gifts.png';

import './Home.css';

const Home = (): JSX.Element => {
  return (
    <div className="Home">
      <h2>In our online shop you can find any Gift you want</h2>
      <img src={gifts} alt='' />
    </div>
  );
};

export default Home;
