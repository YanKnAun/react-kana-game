import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Guard from './component/guard';
import GameLayout from './component/gameLayout';
import Game from './component/game'
import GameOption from './component/gameOption'
import GameOver from './component/gameOver'

class App extends React.Component {
  componentDidMount() {
    console.log(this)
    console.log("App-componentDidMount")

    // const url =
    //   'https://www.fastmock.site/mock/b3f7f593e7e6f1945c9836fbabd698af/api/api/category/list'

    // fetch(url)
    //   .then((result) => result.json())
    //   .then((result) => {
    //     console.log(result)
    //   })
  }

  componentWillUnmount() {
    console.log("App-componentWillUnmount")
  }

  componentDidUpdate() {
    console.log("App-componentDidUpdate")
  }

  render () {
    return (
      <div className="app">
        <Routes>
          <Route path='/' element={<Guard />} />
          <Route path='/game' element={<GameLayout />}>
            <Route path='option' element={<GameOption />}></Route>
            <Route path='over' element={<GameOver />}></Route>
            <Route path='index' element={<Game />}></Route>
            <Route path='' element={<Navigate to="option" />}></Route>
          </Route>
        </Routes>
      </div>
    )
  }
}

export default App;
