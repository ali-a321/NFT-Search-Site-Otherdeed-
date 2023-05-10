import React from 'react'

function Footer() {
    var style = {
        backgroundColor: "#0b2434",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "10px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "1rem",
        width: "100%",
    }
  return (
    <div className='footerContainer' style={style} >Thank you to LooksRare & Moralis for free API service.</div>
  )
}

export default Footer