import React from 'react'

function Navigation({onUpdateClient}) {
  const navigation = ['BetEasy', 'Health Insurance Compare']

  return (
    <ul>
      {navigation.map(item => (
        <li key={item}>
          <button
            onClick={() => onUpdateClient(item)}>
            {item}
          </button>
        </li>  
      ))}
    </ul>
  )
}

export default class Experiments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedClient: 'BetEasy'
    }

    this.updateClient = this.updateClient.bind(this)
  }

  updateClient(selectedClient) {
    this.setState({
      selectedClient
    })
  }

  render() {
    return (
      <React.Fragment>
        <Navigation 
          onUpdateClient={this.updateClient}
        />
      </React.Fragment>
    )
  }
}