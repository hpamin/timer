import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import useTimer from './useTimer'

import sound from '../voice/timer-song.mp3'

export default function Screen() {
    
    const [showSecond, setShowSecond] = useState(false)
    const [showMinute, setShowMinute] = useState(false)
    const [showHour, setShowHour] = useState(false)
    const [Disable, setDisable] = useState(false)
    const [isPlaying , setIsPlaying] = useState(false)

    let audio = new Audio(sound)
    
    
    const {second, minute, hour, handleCondition, handleSwitchMood, SwitchDark, handleChangeInput} = useTimer({setShowSecond, setShowMinute, setShowHour, setDisable, Disable, setIsPlaying, audio})
    
    let bgTimer = { backgroundColor : SwitchDark ? "rgb(234 234 234)" : "#1f1f1f" }
    let textColor = {color : SwitchDark && "#1f1f1f" }
    

    function handleShow(params) {
        switch (params) {
            case "S":
                setShowSecond(true)
                audio.pause()
                break;
            case "M":
                setShowMinute(true)
                audio.pause()
                break;
            case "H":
                setShowHour(true)
                audio.pause()
                break;
            default:
                break;
        }    
        setIsPlaying(false)
        setDisable(false)  
        console.log(Disable);
    }
    
    useEffect(()=>{
        if (second === 0 && minute === 0 && hour === 0 ) {
            setDisable(false)
        }
        if (isPlaying) {
            audio.play()    
            audio.loop = true
        }
        
    },[isPlaying, Disable, second, minute, hour, showSecond, showMinute, showHour])


  return (
    <section className='w-full h-screen' style={{backgroundColor: SwitchDark ? "#FAFAFA" : "#121212"}}>

        <nav> 
            
            <h1 className='logo' style={textColor}>HP<span className='text-purple-700'>amin</span></h1>
            
            
            <div className='Mood' onClick={handleSwitchMood}>
                <button className='circle' style={{right : SwitchDark ? "6px" : "40px"}} >{SwitchDark ? "🌑" : "🌞"}</button>
            </div>
        </nav>

        <div className='timerScreen'>

            {/* second */}
            <div className='timerBox'>
                {/* input & timer */}
                <div className='timer' style={bgTimer}>

                    {showSecond ?
                        <input type='text' pattern="[0-9]*" style={textColor} maxLength={2} value={second} className='TimerInput' onChange={(e)=>handleChangeInput(e,"S")} autoFocus /> 
                        :
                        <h3 style={textColor} >  {second} </h3>
                    }

                </div>

                {/* timer name */}
                <div className='timerName'>

                    <h2 style={textColor}> second </h2>
                    <Icon style={textColor} onClick={() => handleShow("S")} icon="material-symbols:edit-square-outline" />

                </div>
            </div>

            {/* minute */}
            <div className='timerBox'>
                {/* input & timer */}
                <div className='timer' style={bgTimer}>

                    {showMinute ?
                        <input type='text' pattern="[0-9]*" style={textColor} maxLength={2} value={minute} className='TimerInput' onChange={(e)=>handleChangeInput(e,"M")} autoFocus />
                        :
                        <h3 style={textColor}>  {minute} </h3>

                    }

                </div>

                {/* timer name */}
                <div className='timerName'>

                    <h2 style={textColor}> minute </h2>
                    <Icon style={textColor} onClick={() => handleShow("M")} icon="material-symbols:edit-square-outline" />

                </div>
            </div>

             {/* hour */}
            <div className='timerBox'>
                {/* input & timer */}
                <div className='timer' style={bgTimer}>

                    {showHour ?
                        <input type='text' pattern="[0-9]*" style={textColor} maxLength={2} value={hour} className='TimerInput'  onChange={(e)=>handleChangeInput(e,"H")} autoFocus />
                        :   
                        <h3 style={textColor}>  {hour} </h3>

                    }

                </div>

                {/* timer name */}
                <div className='timerName'>

                    <h2 style={textColor}> hour </h2>
                    <Icon style={textColor} onClick={() => handleShow("H")} icon="material-symbols:edit-square-outline" />

                </div>
            </div>
           

        </div>
        
        {/* Start & Stop */}
        <div className='running'>
            <button onClick={() => handleCondition("Start") } disabled={second === 0 && minute === 0 && hour === 0 ? !Disable : Disable} className="btn" style={{...textColor, boxShadow: !Disable ? `2px 3px 0px 0px ${SwitchDark ? "black" : "white" }` : "none"}}>start</button>
            <button onClick={() => handleCondition("Stop") } disabled={!Disable} className='btn' style={{...textColor, boxShadow: Disable ? `2px 3px 0px 0px ${SwitchDark ? "black" : "white" }` : "none"}}>stop</button>
        </div>

    </section>
  )
}
