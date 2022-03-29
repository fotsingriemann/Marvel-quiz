import React from 'react'
import FirebaseContext from '../Firebase/contexte'
import ReactTooltip from 'react-tooltip';

const Logout = (props) => {

    const firebase = React.useContext(FirebaseContext)
    const [checked, setChecked] = React.useState(false)

    React.useEffect(() => {
        if(checked){
            firebase.signoutUser()
        } 
    }, [checked, firebase])

    const handleChange = e => {
        setChecked(e.target.checked)
    }

    return (
        <div className='logoutContainer'>
           <label className='switch'>
                <input 
                    onChange={handleChange}
                    type='checkbox'
                    checked={checked}
                />

                <span className='slider round'  data-tip='Déconnexion'></span>

           </label>
            <ReactTooltip 
                place="left"
                effect="solid"
            />
        </div>

    )
}

export default Logout