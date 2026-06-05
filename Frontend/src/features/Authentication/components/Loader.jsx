import React, { useEffect, useState } from 'react'
import "../auth.styles.scss";


const Loader = ({ data }) => {
  const [currentIndex , setCurrentIndex] =useState(0)

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev)=> {
        if(prev == data.length -1 ){
          clearInterval()
          return prev
        }
        return prev+1
      })
      
    }, 5000);
    return () => clearInterval()
    }, [data])
  
  return (
    <main className="loader-container">
        <div className="loader"></div>
        { data && <p className="loader-text"> {data[currentIndex]}</p> }
    </main>
  )
}

export default Loader
