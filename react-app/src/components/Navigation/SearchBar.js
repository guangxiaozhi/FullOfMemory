import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {searchQuestionsThunk} from '../../store/question'



export default function SearchBar(){
  const history = useHistory()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault()
    console.log("keyword?", keyword)
    if (keyword.length == 0){
      history.push('/')
      alert('please input some word in search area')
    }else{
      await dispatch(searchQuestionsThunk(keyword))
      setKeyword("")
      history.push(`/tags/${keyword}`)
    }

  }
  return (
    <div className="nav-search">
      <div className="nav-search-container">
        <form onSubmit={handleSearch} className="search-bar-form">
          <input className='search-input-values'
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            maxLength="100"
          />
          <button type="submit" className="search-button">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  )
}
