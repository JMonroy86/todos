import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [userInput, setUserInput] = useState("")
  const [todos, setTodos] = useState([])
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    getTask_from_API()
  }, [])

  const handleChange = e => {
    // setUserInput({ ...userInput, [e.target.name]: e.target.value })
    setUserInput(e.target.value)
  }
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      console.log("hola")
      setTodos([...todos, userInput])
      setUserInput("")
    }
  }
  const handleClick = i => {
    const newArray = todos.filter(item => item !== todos[i])
    setTodos(newArray)
  }
  const addLike = i => {
    console.log("object")
  }
  const getTask_from_API = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(resp => resp.json())
      .then(data=> setCharacters(data.results))
      .catch(error=>console.log(error))
  }
  return (
    <div className="container pt-5">
      <div className="row pb-5">
        <input type="text"
          value={userInput}
          name="name"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)} />
        {/* <input type="text" value={userInput.lastName} name="lastName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => handleChange(e)} /> */}
      </div>
      <div className="row">
        {
          characters.map((character, i) => {
            return (
              <div key={i} className="col-md-4 pb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="card-subtitle">{character.name}</h6>
                      </div>
                      <div className="col-md-3">
                        <img className="img-fluid"
                          src={character.image}
                          alt=""
                          onClick={() => handleClick(i)} />
                      </div>
                      <div className="col-md-3">
                        <img className="img-fluid w-100"
                          src="https://www.clipartmax.com/png/middle/110-1101158_icono-de-facebook-pulgar-facebook-pulgar-dedo-pulgar-like-icon.png"
                          alt=""
                          onClick={() => addLike(i)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
