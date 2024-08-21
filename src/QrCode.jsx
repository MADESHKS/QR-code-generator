import React, { useState } from 'react'

const QrCode = () => {
     const [img,setimg]=useState("")
     const [loading,setloading]=useState(false)
     const [qrdata,setqrdata]=useState("http;//www.youtube.com/")
     const [qrsize,setqrsize]=useState("150")
function generateQR(){
    setloading(true)
    try{
     const url=`http://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data={${encodeURIComponent(qrdata)}`
     setimg(url)
    }catch(error)
    {
     console.error("Error generator QR code",error)
    }finally{
     setloading(false)
    }
}
function downloadQR(){
     fetch(img)
     .then((response)=>response.blob())
     .then((blob)=>{
          const link=document.createElement("a")
          link.href=URL.createObjectURL(blob)
          link.download="madeshk.png"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
     })
}
  return (
    <div className='app-cointainer'>
     <h1>QR CODE GENERATOR</h1>
     {img && <img src={img} className='images' />}
     {loading && <p>Please wait...</p>}
          <div>
               <label htmlFor="datainput" className='input-label' >
                    Dta for QR Code :
               </label>
               <input type="text" id="datainput" value={qrdata} placeholder='Enter data for QR Code' 
               onChange={(e)=>setqrdata(e.target.value)}/>
               <label htmlFor="sizeinput" className='input-label'>
                    Image Size (e.g., 150)
               </label>
               <input type="text" id="sizeinput"  placeholder='Enter image size' value={qrsize}
               onChange={(e)=>setqrsize(e.target.value)}/>\
               <button className='generate-button' onClick={generateQR} disabled={loading}> Generate QR Code</button>
               <button className='download-button' onClick={downloadQR}> Download QR Code</button>
          </div>
    </div>
  )
}

export default QrCode