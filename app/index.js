import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Experiments from './components/Experiments.js'

class App extends React.Component {
  render() {
    return (
      <Experiments />
    )
  }
}

ReactDOM.render (
  <App />,
  document.getElementById('app')
)