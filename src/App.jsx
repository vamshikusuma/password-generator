import { useCallback, useEffect, useState,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]=useState(true)
  const[charAllowed, setCharAllowed]=useState(true)
  const[password, setPassword]=useState("")
  const passwordRef=useRef(null)
const PasswordGenerator =useCallback(()=>{
 let pass=""
 let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 if(numberAllowed) str+="0123456789"
 if(charAllowed) str+="~`!@#$%^&*_-+='"

  for (let i = 1; i <=length; i++) {
    let char =Math.floor(
      Math.random()*str.length+1
    )
    pass+=str.charAt(char)
    
  }
  setPassword(pass);
  
  },
    
    [length,numberAllowed,charAllowed])

    const copyPasswordToClipBoard=useCallback(()=>{
      passwordRef.current?.select()
     window.navigator.clipboard.writeText(password)

    },[password])
   
    useEffect( ()=>{ PasswordGenerator()},
  [length,numberAllowed,charAllowed,PasswordGenerator] )

  

  return (
    <>  


    <div   className='  w-2/4  h-72  rounded-3xl bg-slate-700 mt-20 ml-96'>
    <div>  <h1 className= 'text-white text-4xl pt-2 pl-56 pr-3 flex shadow overflow-hidden mb-4'> Password Generator</h1>
    
     <input type="text" className='ml-28  outline-dotted  mt-6 pl-0 pt-8  mr-0  w-2/3 rounded-md text-red-600 text-3xl 'ref={passwordRef}  value={password} readOnly /> 
           <button className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0  rounded-lg pt-5'onClick= {copyPasswordToClipBoard}
           >copy</button>

     </div>
        
        <div className='flex items-center gap-x-2 m-16 text-orange-600 ml-40'>
          <input 
          type="range"
          min={8}
          max={100}
          value={length}
          placeholder='password'
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length:{length}</label>

          <div>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id='inputNumber'
           onChange={()=>{
            setNumberAllowed((prev)=>!prev)
           }}
           /><label htmlFor=""> Numbers</label>
        </div> 

        
        <div>
          <input type="checkbox"
        defaultChecked={charAllowed}
          id='inputChar'
           onChange={()=>{
            setCharAllowed((prev)=>!prev)
           }}
           /><label htmlFor=""> Characters</label>
        </div> 
        </div>
       
   
    </div>
      

   
    </>
  )
}

export default App
