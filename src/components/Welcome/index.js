import React from 'react'
import FirebaseContext from '../Firebase/contexte'
import Logout from '../Logout'
import Quiz from '../Quiz'


const Welcome = (props) => {


    const firebase = React.useContext(FirebaseContext)

    const [userData, setUserData] = React.useState(null)

    const [userSession, setUserSession] = React.useState(null)

    React.useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })


        if(!!userSession){

            firebase.user(userSession.uid).get().then(doc => {
                if(doc && doc.exists){
                    const myData = doc.data()
                    setUserData(myData)
                }
            }).catch(error => {
                console.log(error)
            })

        }


        return () => {
            listener()
        }

    }, [userSession])





    return userSession === null ? (
        <React.Fragment>
            <div className='loader'></div>
            <p className='loaderText'>Authentification ...</p>
        </React.Fragment>
    ): (
        <React.Fragment>
            <div className='quiz-bg'>
                <div className='container'>
                    <Logout />
                    <Quiz userData={userData}/>
                </div>
            </div>
        </React.Fragment>
    )

    
}

export default Welcome