//libs
import { Link } from 'react-router-dom';

//styling
import './Terms.scss';

//assets

function Terms() {
  return (
    <section className="wrapper registration terms">
      <div className="bg-clip"></div>
      <article className="registration-container signup">
        <Link className="btn-close" to="/register">Close</Link>
        <h1>Terms & Conditions</h1>
          <p>Please read these terms and conditions carefully before using Buddii operated by Buddii BV</p>
          <span>Conditions of use</span>
          <p>By using Buddii , you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the Buddii tool and not subscribe. Buddii BV only grants use and access of this tool, its products, and its services to those who have accepted its terms.</p>
          <span>Privacy policy</span>
          <p>Before you continue using Buddii, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</p>
          <span>Age restriction</span>
          <p>You must be at least 18 (eighteen) years of age before you can use Buddii. By using this Buddii, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. Buddii BV assumes no responsibility for liabilities related to age misrepresentation.</p>
          <span>Intellectual property</span>
          <p>You agree that all materials, products, and services provided on this tool are the property of Buddii BV, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the [name]’s intellectual property in any way, including electronic, digital, or new trademark registrations.</p>
          <p>You grant Buddii BV a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.</p>
          <span>User accounts</span>
          <p>As a user of this tool, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.</p>
          <p>If you think there are any possible issues regarding the security of your account on Buddii, inform us immediately so we may address them accordingly.</p>
          <p>We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.</p>
          <span>Applicable law</span>
          <p>By using Buddii, you agree that the laws of the Belgium, without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between Buddii BV and you, or its business partners and associates.</p>
          <span>Disputes</span>
          <p>The Belgian law is applicable to the agreements of Buddii BV. Any dispute relating to the conclusion, validity, execution and / or termination of this agreement will be settled by the competent court for the registered office of Buddii BV.</p>
          <span>Indemnification</span>
          <p>You agree to indemnify Buddii BV and its affiliates and hold Buddii BV harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.</p>
          <span>Limitation on liability</span>
          <p>Buddii BV is not liable for any damages that may occur to you as a result of your misuse of our website.</p>
          <p>Buddii BV reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between Buddii BV and the user, and this supersedes and replaces all prior agreements regarding the use of this website.</p>
      </article>
    </section>
  );
}

export default Terms;
