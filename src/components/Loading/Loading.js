import React from 'react'
import './Loading.css'
const Loading = () => {
  return (
    <div className="loader">
        <div className="loader-circle"></div>
        <span className="loader-text">Loading...</span>
    </div>
  )
}

export default Loading