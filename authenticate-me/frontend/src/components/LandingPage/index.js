import './LandingPage.css'

function LandingPage() {
  // const history = useHistory();

  // const sessionUser = useSelector(state => state.session.user);

  // if(sessionUser) {
  //   history.push('/');
  //   return (
  //     <div className="li-body">
  //       <h1>Logged in LandingPage</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="landing-body">
      <div className="landing-text-container">
        <h1 className="landing-title">Find your inspiration.</h1>
          <p className="landing-text">Join the Flickr community, home to <br/>tens of billions of photos and 2 million groups. <br/>(I'll make something more original later.)</p>
      </div>
    </div>
  )
}

export default LandingPage;
