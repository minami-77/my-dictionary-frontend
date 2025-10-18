import React from 'react'
import Signup from '../../components/Signup.js'
import Login from '../../components/Login.js'
import Search from '../../components/Search.js'

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
