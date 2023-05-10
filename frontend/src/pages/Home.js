import logo from '../logo.png';
import '../App.css' ;
import React, { useState, useEffect } from 'react';
import axios from "axios";


function Home() {
  const [address, setAddress] = useState("0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258");
  const [chain, setChain] = useState("0x1");
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const [currentDisplay, setcurrentDisplay] = useState()
  const [information, setInformation] = useState([])
  const [loading,setLoading] = React.useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = (e) => {
    setIsOpen(!isOpen);
    if(!isOpen){
      getInfo(e)
    }
  }
  async function getInfo(e){
    setcurrentDisplay()
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const LOOKS_APIURL = "https://api.looksrare.org/api/v1/tokens?collection=0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258&tokenId="   
    const otherdeedNumber = e.token_id
    const FINAL_URL = LOOKS_APIURL + otherdeedNumber
    const retrieveListing = await fetch(FINAL_URL, options)
    const response =  await retrieveListing.json()

    const traitFilter = response.data.attributes
    const imgFilter = response.data.imageURI
    setcurrentDisplay(<img className='imageClicked' src= {imgFilter} alt= "otherdeed image"/>)
    setInformation(traitFilter)
    
   
    
  }
  
  async function fetchNFTs() {
    setLoading(true);

    let res;
    if (cursor) {
      res = await axios.get(`http://localhost:3030/otherdeeds`, {
        params: { address: address, chain: chain, cursor: cursor },
      });
    } else {
      res = await axios.get(`http://localhost:3030/otherdeeds`, {
        params: { address: address, chain: chain },
        
      });
    }


    let n = NFTs;
    setNFTs(n.concat(res.data.result.result));
    setCursor(res.data.result.cursor);
    setLoading(false);

  } 
  function getImgUrl(metadata) {
    if (!metadata) return logo;

    let meta = JSON.parse(metadata);

    if (!meta.image) return logo;

    if (!meta.image.includes("ipfs://")) {
      return meta.image;
    } else {
      return "https://ipfs.io/ipfs/" + meta.image.substring(7);
    }
  }
 
  return (
    <>
    <div className="App">
      <button onClick={fetchNFTs}>  {loading ? <>Loading..</> : <>Display Deeds</>} </button>
     
         <div> 
            <div className="displayContainer">
              {NFTs?.map((e, i) => {
                return (
                    <div>
                      <img
                        className='landPiece'
                        loading="lazy"
                        key={e.token_id}
                        src={getImgUrl(e.metadata)}
                        alt={e.token_id}
                        onClick={() => togglePopup(e)}
                      />
                      <div> 
                      {isOpen && ( 
                       <div className="popup-box">
                       <div className="box">
                         <span className="close-icon" onClick={togglePopup}>x</span>
                          <div className='infoWrapper'> 
                          <div className='infoText'> {currentDisplay}  </div> 
                          <div className='infoText'> {information.map((item) => <div key={item.i}> {(item.traitType) +": "+ (item.value)  }</div> )}</div>
                          </div>
                       </div>
                     </div>
                        )}
                        </div>
                      <div key={i} className= "landId">
                        {`${e.name}\n${e.token_id}`}
                      </div>
                    </div>
                );
              })}
            </div>
            {cursor && (
             <div className='loadBtn'>
                <button onClick={fetchNFTs}>
                {loading ? <>Loading..</> : <>Show more</>}
                </button>
            </div>
            )}
        </div>
        
      </div> 
      
     </>
  
    );
}

export default Home;
