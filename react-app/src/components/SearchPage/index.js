import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect} from "react"
import { useParams, useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { searchQuestionsThunk } from "../../store/question"
import './searchPage.css'

export default function SearchPage(){
  const {keyword} = useParams()
  const history = useHistory()
  // console.log("keyword from searchPage", keyword)

  const searchResultsObj = useSelector(state => state.question.searchQuestions)

  let allquestions = searchResultsObj ? Object.values(searchResultsObj): []
  // console.log("allquestions", allquestions)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(searchQuestionsThunk(keyword))
      .then(() => setIsLoaded(true))
  }, [dispatch, keyword])



  return (
    isLoaded && (
      allquestions.length > 0
      ? (
      <div  className="all-question-container" >
        <div className="allQuestionsList">
          {
            allquestions.map(question => (
              <div key={question.id} className="question">
                <div className="like-answer">

                  <div>{question.like_count} likes</div>

                  <div className="answer">{question.answer_count} answers</div>
                </div>
                <div className="question-body">
                  <Link className="title" to={`/questions/${question.id}`} >{question.title}</Link>
                  <div className="description">{question.description.substring(0,200)}......</div>
                  <div className="tag-username">
                    <div className="tags">{question.tags}</div>
                    <Link className="user-profile" to={`/users/${question.user.id}`}>
                      <img src={`${question.user.portrait}`} alt="" />
                      <div className="username">{question.user.username}</div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
    : (<div className="no-question-container">
      <h2>We couldn't find any results for "{keyword}", try using another tag to find!</h2>
      <h2>or</h2>
      <h2><Link to="/"> go back to home page</Link></h2>
      </div>)
    ))
}
