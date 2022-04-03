import React from 'react'
import FirebaseContext from './../Firebase/contexte'
import { Link } from 'react-router-dom'


const Signup = (props) => {

    const firebase = React.useContext(FirebaseContext)

    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmpassword:''
    }
      
      


    const [loginData, setLoginData] = React.useState(data)
    const [users,setUsers] = React.useState([])

     React.useEffect(() => {

        const dest = firebase.getAllUsers()
        console.log(dest)

     }, [firebase.getAllUsers()])
     

    const [error, setError] = React.useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const {email, password} = loginData
        firebase.signupUser(email, password)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data})
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error)
            setLoginData({...data})
        })
    }


    
    


    const errorMsg = error !== '' && <span>{error.message}</span>
    


    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]:e.target.value})
    }

    const { pseudo, email, password, confirmpassword } = loginData

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmpassword 
    ? <button disabled> Inscription </button> : <button> Inscription </button> 

    return (
        <div className='signUpLoginBox'>
                <div className='formBoxLeftSignup'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                    <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type='text' id='pseudo' required autoComplete='off'/>
                                <label htmlFor='pseudo'> Pseudo </label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={email} type='email' id='email' required autoComplete='off'/>
                                <label htmlFor='email'> Email </label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={password} type='password' id='password' required autoComplete='off'/>
                                <label htmlFor='password'> Mot de passe </label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmpassword} type='password' id='confirmpassword' required autoComplete='off'/>
                                <label htmlFor='confirmpassword'>confirmer le Mot de passe </label>
                            </div>
                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>Deja inscrit? connectez-vous</Link>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default Signup