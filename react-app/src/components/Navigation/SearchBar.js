import { useHistory } from "react-router-dom"
import { useState } from "react"
export default function SearchBar(){
  const history = useHistory()
  const [keyword, setKeyword] = useState("")
  const handleSearch = () => {
    history.push('/questions/3')
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
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  )
}
