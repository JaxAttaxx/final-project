import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {   Menu } from 'semantic-ui-react'
import './DashHeader.css'
import { setCurrentGuest, setGuestCount } from '../../redux/actions'

export default function DashHeader() {
  const dispatch = useDispatch()
  const guestCount = useSelector(state=>state.guestCount)
  const [activeItem, setActiveItem] = useState('')
  const currentGuest = useSelector(state=>state.currentGuest)
  const tableNum = useSelector(state => state.tableNum)

  function removeGuest(){
    if(guestCount === 1){
      return
    }else{
      if (currentGuest === guestCount) {
        dispatch(setCurrentGuest(currentGuest - 1))
        dispatch(setGuestCount(guestCount - 1))
        setActiveItem('removeGuest')
      }
      else{
        dispatch(setGuestCount(guestCount - 1))
        setActiveItem('removeGuest')
      }  
    }
  }
  
  function addGuest(){  
    dispatch(setGuestCount(guestCount + 1))    
    setActiveItem('addGuest')
        
    }
  

  function previousGuest(){ 
    setActiveItem('previousGuest')
    return (currentGuest > 1 ? dispatch(setCurrentGuest(currentGuest - 1)) : console.log("can't go that low"))
  }

  function nextGuest(){ 
    setActiveItem('nextGuest')
    return (currentGuest < guestCount  ? dispatch(setCurrentGuest(currentGuest + 1)) : console.log("can't go that high"))
  }
  
  return (
    <Menu className='menu' inverted fluid color="black" style={{justifyContent:'center', margin:'0', background: '#000 !important'}}>
        <Menu.Item
          style={{justify:'right', borderLeft:  '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center'}}
          name='Table #'
        >
         <div style={{paddingTop:'10px'}}> Table #: {tableNum}</div>
        </Menu.Item>  
      
        <Menu.Item
          name='Previous Guest'
          active={activeItem === 'previousGuest'}
          onClick={()=>previousGuest()}
          >
         <div style={{paddingTop:'10px'}}> {"<"}Previous Guest </div>
        </Menu.Item>
        <Menu.Item
          name='Current Guest'
          style={{backgroundColor:'white', color:'black', border:'1px solid black'}}
          >
          <div style={{paddingTop:'10px'}}> Current Guest: {currentGuest}</div>
        </Menu.Item>
        <Menu.Item
          name='Next Guest'
          active={activeItem === 'nextGuest'}
          onClick={()=>nextGuest()}
          >
          <div style={{paddingTop:'10px'}}> Next Guest{">"} </div>
        </Menu.Item>   
       
      </Menu>
            
  )
}
