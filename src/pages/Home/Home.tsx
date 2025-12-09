import React from 'react'
import Signup from '../../components/Signup'
import Login from '../../components/Login'
import Search from '../../components/Search'

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      <h5>🙈Search without login🙈</h5>
      <div className="w-full justify-center items-center space-x-2 my-4">
        <Search/>
        <div className="flex flex-row">
          <div className="basis-1/2 mx-4">
            <Signup/>
          </div>
          <div className="basis-1/2 mx-4">
            <Login/>
          </div>
        </div>
      </div>

    </>

  )
}
