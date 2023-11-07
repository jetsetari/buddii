//libs
// import { useNavigate } from 'react-router-dom';

//styling
import { useSearchParams } from 'react-router-dom';
import './Expired.scss';

//assets

function Expired() {

  return (
    <section className="wrapper registration">
      <div className="bg-clip"></div>
      <article className="expired-container">
        <h1>Link has expired</h1>
        <p className="subtext">Contact your company owner to<br />make a new invite.</p>
      </article>
    </section>
  );
}

export default Expired;
