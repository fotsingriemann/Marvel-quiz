/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'

const Landing = () => {


    const refWolverine = React.useRef(null);

    const [btn, setBtn] = React.useState(false)
    
    React.useEffect(() => {
        refWolverine.current.classList.add("startingImg")

        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg")
            setBtn(true)
        }, 1000)

    }, [])


    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg")
    }

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg")
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains("leftImg")){
            refWolverine.current.classList.remove("leftImg")
        } else if(refWolverine.current.classList.contains("rightImg")){
            refWolverine.current.classList.remove("rightImg")
        }
    }

    const displaybtn = btn && (
    <React.Fragment>
        <div onMouseOver={ setLeftImg } onMouseOut={clearImg}  className='leftBox'>
            <button className='btn-welcome'> Inscription </button>
        </div>
        <div onMouseOver={ setRightImg } onMouseOut={clearImg} className='rightBox'>
            <button className='btn-welcome'> Connexion </button>
        </div>
    </React.Fragment>
    )

    return (
        <main ref={refWolverine} className='welcomePage'>
            {displaybtn}
        </main>
    )
}

export default Landing