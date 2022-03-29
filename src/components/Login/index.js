import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from './../Firebase/contexte'
import {VscMail} from 'react-icons/vsc'


const Login = (props) => {

    const firebase = React.useContext(FirebaseContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false)

    const [error, setError] = React.useState('')

    React.useEffect(() => {
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }else if(btn === true ){
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = e => {
        e.preventDefault()
        firebase.loginUser(email, password)
        .then(user => {
            setEmail('')
            setPassword('')
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error)
            setEmail('')
            setPassword('')
        })
    }

    
    const errorMsg = error !== '' && <span>{error.message}</span>

    const bouton = btn ? <button>Connexion</button> : <button disabled>Connexion</button>

    return (
        <div className='signUpLoginBox'>
                <div className='formBoxLeftLogin'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                    {errorMsg}
                    <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input onChange={e => setEmail(e.target.value)} value={email} type='email' id='email' required autoComplete='off'/>
                                <label htmlFor='email'> Email </label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={e => setPassword(e.target.value)} value={password} type='password' id='password' required autoComplete='off'/>
                                <label htmlFor='password'> Mot de passe </label>
                            </div>
                            {bouton}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/signup'>Nouveau sur Marvel-Quiz? inscrivez-vous maintenant</Link>
                            <br/>
                            <Link className='simpleLink' to='/forgetpassword'>Mot de passe oublie? recuperer le ici</Link>
                        </div>
                      

                    </div>
                </div>
        </div>
    )
}

export default Login