import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import './ImagesPage.css'

const ImagesPage = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) {
    history.push('/images/new');
    return (
      <div className='body'>
        <h1>Upload Form</h1>
      </div>
    );
  }
}


export default ImagesPage;
