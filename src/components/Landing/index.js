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


    const displaybtn = btn && (
    <React.Fragment>
        <div className='leftBox'>
            <button className='btn-welcome'> Inscription </button>
        </div>
        <div className='rightBox'>
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