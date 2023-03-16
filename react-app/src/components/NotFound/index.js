import { useHistory } from "react-router-dom"
import './NotFound.css'

export default function NotFound(){
  const history = useHistory()
  return (
    <div className="not-found-page">
      <h1>4 0 4</h1>
      <h3>We couldn't find the page...</h3>
      <h5><p>Sorry, but the page you are looking for was either not found or does not exist.</p>
          <p>Try refreshing the page or click the button below to go back to the Homepage.</p>
      </h5>
      {/* <h4>Try refreshing the page or click the button below to go back to the Homepage.</h4> */}
      <button className = "not-found-button" onClick={() => history.push('/')}>Go to home page</button>
    </div>

  )
}
