import React from 'react'
import { IoIosAttach } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Escribe algo...'/>
      <div className='send'>
        <IoIosAttach className='send-icon'/>
        <input type='file' style={{display:"none"}} id='file'/>
        <label htmlFor='file'>
          <MdOutlineAddPhotoAlternate className='send-icon'/>
        </label>
        <button>Enviar</button>
      </div>
    </div>
  )
}

export default Input
