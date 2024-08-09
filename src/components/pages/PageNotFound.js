import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layouts/Layout'

const PageNotFound = () => {
  return (
    <Layout>
      <h2>Page Not Found</h2>
      <Link to="https://shrikant9907.github.io/react-test-task1/">Go to Home</Link>
    </Layout>
  )
}

export default PageNotFound