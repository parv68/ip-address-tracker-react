import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="contianer">
        <div className="heading">
          <h1>IP Address Tracker</h1>
          <div className="input">
            <input type="text" placeholder='Search for any IP address or domain' className='border-blue-700 border-2' />
            <button className='bg-black'><img src=".\src\images\icon-arrow.svg" alt="arrow-icon"/></button>
          </div>
        </div>
        <div className="info">
          <div className="address">
            <p>IP ADDRESS</p>
            <p></p>
          </div>
          <div className="location">
            <p>LOCATION</p>
            <p></p>
          </div>
          <div className="timezone">
            <p>TIMEZONE</p>
            <p></p>
          </div>
          <div className="isp">
            <p>ISP</p>
            <p></p>
          </div>
        </div>
        <div className="map"></div>
      </div>
    </>
  )
}

export default App
