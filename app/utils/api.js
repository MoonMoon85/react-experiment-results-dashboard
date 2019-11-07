export function fetchExperiments (projectID, token) {
  return fetch(`https://api.optimizely.com/v2/experiments?project_id=${projectID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message)
      }
      
      return data
    })
}

export function fetchExperimentsResults (experimentID, token) {
  return fetch(`https://api.optimizely.com/v2/experiments/${experimentID}/results`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message)
      }
      
      return data
    })
}