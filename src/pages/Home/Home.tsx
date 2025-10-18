import React from 'react'
import Signup from '../../components/Signup'
import Login from '../../components/Login'
import Search from '../../components/Search'

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      <h5>🙈Search without login🙈</h5>
      <Search/>
      <Signup/>
      <Login/>

    </>

  )
}
