import React from "react";
import { Link } from "react-router-dom";
import app from "firebase/app";

const ForgetPassword = props => {

    const successStyle = {
        border:'1px solid green',
        color:'green'
    }

    const [email, setEmail] = React.useState('')
    const [success, setSuccess] = React.useState(null)
    const [error, setError] = React.useState(null)

    const disabled = email === ''

    const handleSubmit = e => {
        e.preventDefault()
        app.auth().sendPasswordResetEmail(email)
        .then(() => {
            setError(null)
            setSuccess('Consult your email to change your password')
            setEmail('')
            setTimeout(() => {
               props.history.push('/login')
            }, 5000);
        })
        .catch(error => {
            setError(error)
            setSuccess(null)
            setEmail('')
        })
    }

    
    return (
        <div className='signUpLoginBox'>
                <div className='formBoxLeftForget'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>

                   {success && <span style={successStyle}>{success}</span>}

                   {error && <span>{error.message}</span>}

                    <h2>MOT DE PASSE OUBLIE</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input onChange={e => setEmail(e.target.value)} value={email} type='email' id='email' required autoComplete='off'/>
                                <label htmlFor='email'> Email </label>
                            </div>
                            <button  disabled={disabled}>Récupérer</button>
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>Déja inscrit? connectez-vous</Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ForgetPassword