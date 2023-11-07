//libs
import { useNavigate } from 'react-router-dom';

//styling
import './Invite.scss';

//assets

function Invite() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/choosepass");
  }

  return (
    <section className="wrapper registration">
      <div className="bg-clip"></div>
      <article className="invite-container">
        <h1>You've been invited</h1>
        <p className="subtext">The Island</p>
        <input type="submit" onClick={handleClick} className="invite_input" value="Create account" />
      </article>
    </section>
  );
}

export default Invite;
