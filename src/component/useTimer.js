import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function useTimer({setShowSecond, setShowMinute, setShowHour, setDisable, Disable}) {
    
    const [second , setSecond] = useState(5)
    const [minute , setMinute] = useState(1)
    const [hour , setHour] = useState(1)
    
    const [SwitchDark, setSwitchDark] = useState(localStorage.getItem("theme") ? () => localStorage.getItem("theme") : true )
    
    // Switch Mood
    function handleSwitchMood() {
        if (SwitchDark === true) {
            setSwitchDark(false)
            localStorage.setItem("theme" , SwitchDark)
        }else if (SwitchDark === false) {
            setSwitchDark(true)
            localStorage.setItem("theme" , SwitchDark)
        }
    }

    /* Start & Stop function */
    function handleCondition(params) {
        setShowSecond(false)
        setShowMinute(false)
        setShowHour(false)
        switch (params) {
            case "Start":
                setDisable(true)
                break;
            case "Stop":
                setDisable(false)
            default:
                break;
        }
    }

    /* Correct Input */
    function handleChangeInput(e,params) {
        if (e.target.value > 24) {
            if (params === "H") {
                setHour(24)
            }
        }
        else if (e.target.value > 60 ) {
            if (params === "S") {
                setSecond(60)
            }
            else if (params === "M") {
                setMinute(60)
            }
        }else if (e.target.value < 0) {
            if (params === "S") {
                setSecond(0)
            }
            else if (params === "M") {
                setMinute(0)
            }else {
                setHour(0)
            }
        }else if (!e.target.value || e.target.value === ".") {
            if (params === "S") {
                setSecond(0)
            }
            else if (params === "M") {
                setMinute(0)
            }else {
                setHour(0)
            }
        }else{
            if (params === "S") {
                setSecond((v) => (e.target.validity.valid ? parseInt(e.target.value) : v))
            }
            else if (params === "M") {
                setMinute((v) => (e.target.validity.valid ? parseInt(e.target.value) : v))
            }else {
                setHour((v) => (e.target.validity.valid ? parseInt(e.target.value) : v))
            }
        }
    }
    
    useEffect(()=>{ 
        let timer
        if (Disable) {
            timer = setInterval(() => {
            if (second > 0) {
                setSecond((second)=> second - 1)
            }else if (minute > 0) {
                setMinute((minute) => minute - 1)
                setSecond(59)
            }else if (hour > 0) {
                setHour((hour) => hour - 1)
                setMinute(59)
                setSecond(59)
            }
        }, 1000)}
        return () => clearInterval(timer)
    },[second, minute, hour, Disable])

  return {
    second,
    minute,
    hour,
    handleCondition,
    handleChangeInput,
    handleSwitchMood,
    SwitchDark,
  }
}
