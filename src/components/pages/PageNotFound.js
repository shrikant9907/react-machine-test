import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layouts/Layout'

const PageNotFound = () => {
  return (
    <Layout>
      <h2>Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </Layout>
  )
}

export default PageNotFound