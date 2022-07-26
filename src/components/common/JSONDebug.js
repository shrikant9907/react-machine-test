import React from 'react'

const JSONDebug = ({data}) => {
  return (
    <React.Fragment>
      {
        process.env.REACT_APP_DEBUG_MODE === 'true' &&
        <pre>{JSON.stringify(data)}</pre> 
      }
    </React.Fragment>
  )
}

export default JSONDebug;