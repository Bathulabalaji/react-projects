import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setNumAllow]=useState(false)
  const [charAllow,setCharAllow]=useState(false)
  const [password,setPassword]=useState("")
  const [buttonText,setButtonText]=useState("Copy")

  //useRef()

  const passwordRef=useRef(null);

  const newPassword=useCallback(()=>{
    let pass="";
    let s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow) s+="0123456789";
    if(charAllow) s+="~!@#$%^&*()[]{}<>?";
    for(let i=1;i<=length;i++){
      pass+=(s.charAt(Math.floor(Math.random()*(s.length+1))))
    }
    setPassword(pass);
  },[length,numAllow,charAllow,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);
    setButtonText("Copied")
  },[password])
  useEffect(()=>{
    newPassword()
  },[length,numAllow,charAllow,newPassword])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
            value={password}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{buttonText}</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value),setButtonText("Copy")}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllow}
              id='numberInput'
              onChange={()=>{
                setNumAllow((prev)=>!prev);
                setButtonText("Copy");
              }}
            />
          </div>
          <label htmlFor="numberInput">Numbers</label>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllow}
              id='characterInput'
              onChange={()=>{
                setCharAllow((prev)=>!prev);
                setButtonText("Copy");
              }}
            />
          </div>
          <label htmlFor="=characterInput">Characters</label>
        </div>
        <footer>
          <p className='text-[12px] text-center text-white my-3'>© 2024 Balaji Bathula. All rights reserved.</p>
        </footer>

      </div>
    </>
  )
}

export default App
