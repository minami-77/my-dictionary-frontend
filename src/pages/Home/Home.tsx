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
      <div className="flex flex-row">
        <div className="basis-1/2">
          <Signup/>
        </div>
        <div className="basis-1/2">
          <Login/>
        </div>
      </div>

    </>

  )
}
