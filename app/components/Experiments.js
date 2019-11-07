import React from 'react'
import {fetchExperiments} from '../utils/api'
import {fetchExperimentsResults} from '../utils/api'

function Navigation({onUpdateClient}) {
  const navigation = [
      {
        name: 'BetEasy', 
        projectID: 2790750072,
        token: '2:yBNEg0oByYRpALKYAmVitAab1KWzvUOMQg8ZchvdtIryno_xRSbw'
      },
      {
        name: 'Health Insurance Compare', 
        projectID: 83458987,
        token: '2:4wX1xWArY39njRxQsZoWBs4mNZYWyXTle9qo-2l-HtfYsyXRAe_8'
      }
    ]

  return (
    <ul>
      {navigation.map((item, index) => (
        <li key={item.name}>
          <button
            onClick={() => onUpdateClient(item.projectID, item.token)}>
            {item.name}
          </button>
        </li>  
      ))}
    </ul>
  )
}

function ResultsGrid ({ results }) {
  return (
    <ul className='grid space-around'>
      {results.map((result, index) => {
        return (
          <li key={index} className='repo bg-light'>
            <h4 className='header-lg center-text'>
              {result.experiment_id}
            </h4>
            <ul>
              {result.metrics.map((metric, index) => {
                return (
                  <li key={index}>
                    {metric.name}
                    {Object.keys(metric.results).filter((result) => {
                      
                      return !metric.results[result].is_baseline;
                    })
                    .map((result, index) => {
                      return (
                        <div key={metric.results[result].variation_id}>
                          {metric.results[result].lift.is_significant && `Variation ${index + 1} is Stat Sig`}
                        </div>
                      )
                    })}
                  </li>
                )
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

export default class Experiments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectID: 83458987,
      token: '2:4wX1xWArY39njRxQsZoWBs4mNZYWyXTle9qo-2l-HtfYsyXRAe_8',
      experiments: null,
      experimentIds: null,
      results: null,
      error: null
    }

    this.updateClient = this.updateClient.bind(this)
    this.isLoadingExperiments = this.isLoadingExperiments.bind(this)
    this.getExperimentIds = this.getExperimentIds.bind(this)
    this.getExperimentResults = this.getExperimentResults.bind(this)
    this.isLoadingResults = this.isLoadingResults.bind(this)
  }

  updateClient(projectID, token) {
    this.setState({
      projectID,
      token,
      experiments: null,
      experimentIds: null,
      results: null,
      error: null
    })

    fetchExperiments(projectID, token)
      .then((experiments) => this.setState({
        experiments,
        experimentIds: null,
        token,
        results: null,
        error: null
      })).then(() => {
        this.getExperimentIds(this.state.experiments, token)
      })
      .catch(() => {
        this.setState({
          error: `There was an error fetching the repositories.`
        })
      })
  }

  getExperimentIds(experiments, token) {
    const experimentIds = experiments.map((item) => {
      return item.id
    });

    this.setState({
      results: null,
      experimentIds
    })

    this.getExperimentResults(this.state.experimentIds, token)
  }

  getExperimentResults(ids, token) {
    let resultsData = [];
    const resultsArray = ids.map(id => {
      fetchExperimentsResults(id, token)
        .then((data) => {
          resultsData.push(data)
        }).then((data) => {
          this.setState({
            results: resultsData,
          })
        })
    });
    console.log(resultsData);
  } 
  
  componentDidMount () {
    this.updateClient(this.state.projectID, this.state.token)
  }

  isLoadingExperiments() {
    return this.state.experiments === null && this.state.error === null
  }

  isLoadingResults() {
    return this.state.results === null && this.state.error === null
  }

  render() {
    const { experiments, experimentsIds, results } = this.state

    return (
      <React.Fragment>
        <Navigation 
          onUpdateClient={this.updateClient}
        />

        {this.isLoadingExperiments() && <p>Loading experiments</p>}

        {this.isLoadingResults() && <p>Loading Results</p>}

        {results && <ResultsGrid results={this.state.results}/>}
      </React.Fragment>
    )
  }
}