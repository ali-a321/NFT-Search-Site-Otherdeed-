import React from "react";
import '../App.css';

export default function Search(){
    const [formData, setFormData] = React.useState('')
    const [deedInfo, setDeedInfo] = React.useState([])
    const [deedImg, setDeedImg] = React.useState()
    const [keyIndex, setKeyIndex] = React.useState()
    const [loading,setLoading] = React.useState(false)
 
    async function getSearchId(e){
        e.preventDefault()
        setLoading(true);
        const otherdeedNumber = formData
        console.log(otherdeedNumber)
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        const LOOKS_APIURL = "https://api.looksrare.org/api/v1/tokens?collection=0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258&tokenId="   
        const FINAL_URL = LOOKS_APIURL + otherdeedNumber
        const retrieveListing = await fetch(FINAL_URL, options)
        const response =  await retrieveListing.json()
        const traitFilter = response.data.attributes
        console.log(response.data)
        setDeedInfo(traitFilter)
        setDeedImg(response.data.imageURI)
        setKeyIndex(response.data.name)
        setLoading(false);
        setFormData('')
       
    }
  
    return (
        <>
        <div className="formContainer">
          <form id="deedForm" onSubmit={getSearchId}>
            <label className="searchLabel">{loading ? <>Loading..</> : <>Otherdeed ID:</>}</label>
            <input
              type="number"
              placeholder="ID number"
              className="otherdeedID"
              name="otherdeedID"
              minLength={1}
              maxLength={99999}
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
            />
          </form>
        </div>
        <div className="landSearchContainer">
          <div key={keyIndex}>
            {deedImg ? (
              <img
                key={keyIndex}
                className="landImg"
                loading="lazy"
                src={deedImg}
                alt="Otherside Land Image"
              />
            ) : (
              ""
            )}
            <div className="landIdSearch">
              {deedInfo.map((item) => (
                <div key={item.id}>{item.traitType + ": " + item.value}</div>
              ))}
            </div>
          </div>
        </div>
      </>
      
    )
}