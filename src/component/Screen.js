import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import useTimer from './useTimer'

export default function Screen() {

    const [showSecond, setShowSecond] = useState(false)
    const [showMinute, setShowMinute] = useState(false)
    const [showHour, setShowHour] = useState(false)
    const [Disable, setDisable] = useState(false)

    const {second, minute, hour, handleCondition, handleSwitchMood, SwitchDark, handleChangeInput} = useTimer({setShowSecond, setShowMinute, setShowHour, setDisable, Disable})

    let bgTimer = { backgroundColor : SwitchDark ? "rgb(234 234 234)" : "#1f1f1f" }
    let textColor = {color : SwitchDark && "#1f1f1f" }
    let Shadow = {boxShadow: SwitchDark ?"2px 3px 0px 0px black" : "2px 3px 0px 0px white" }
 
    function handleShow(params) {
        switch (params) {
            case "S":
                setShowSecond(true)
                break;
            case "M":
                setShowMinute(true)
                break;
            case "H":
                setShowHour(true)
                break;
            default:
                break;
        }    
        setDisable(false)  
    }


  return (
    <section className='w-full h-screen' style={{backgroundColor: SwitchDark ? "#FAFAFA" : "#121212"}}>

        <nav> 
            
            <h1 className='logo' style={textColor}>HP<span className='text-purple-700'>amin</span></h1>
            
            
            <div className='Mood' onClick={handleSwitchMood}>
                <button className='circle' style={{right : SwitchDark ? "6px" : "40px"}} onClick={handleSwitchMood}>{SwitchDark ? "🌑" : "🌞"}</button>
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
            <button onClick={() => handleCondition("Start") } disabled={Disable} className='btn' style={{...textColor, ...Shadow}}>start</button>
            <button onClick={() => handleCondition("Stop") } disabled={!Disable} className='btn' style={{...textColor, ...Shadow}}>stop</button>
        </div>

    </section>
  )
}
