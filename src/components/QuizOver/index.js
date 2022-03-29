import React from 'react'
import {GiTrophyCup} from 'react-icons/gi'
import {VscError} from 'react-icons/vsc'
import {GrPowerReset} from 'react-icons/gr'
import {BiReset} from 'react-icons/bi'
import {CgArrowRightO} from 'react-icons/cg'
import ReactTooltip from 'react-tooltip';
import Modal from '../Modal'
import axios from 'axios'


const QuizOver = React.forwardRef((props, ref) => {

	const [quizLevel, setQuizLevel] = React.useState(0)
	const [levelName, setlevelName] = React.useState([])
	const [maxQuestion, setmaxQuestion] = React.useState(0)
	const [score, setScore] = React.useState(0)
	const [percent, setPercent] = React.useState(0)
	const [asked, setAsked] = React.useState([])
	const [openModal, setOpenModal] = React.useState(false)
	const [info, setInfo] = React.useState('')
	const [charactersInfo, setCharactersInfo] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	// const [nextLevelQuestion, setnextLevelQuestion] = React.useState(null)

		React.useEffect(() => {
			setAsked(ref.current)
			setScore(props.score)
			setPercent(props.percent)
			setmaxQuestion(props.maxQuestion)
			setlevelName(props.levelsName)
			setQuizLevel(props.quizLevel)


			if( localStorage.getItem('marvelLocalStorageDate')){
				const date = localStorage.getItem('marvelLocalStorageDate')
				checkStorageDate(date)
			}

			// setnextLevelQuestion(props.nextLevelQuestion)

		},[ref, props])


		const checkStorageDate = date => {
			const today = Date.now()
			const TimeDifference = today - date

			const numberDate = TimeDifference/(1000 * 3600 * 24)

			if( numberDate >= 15 ){
				localStorage.clear()
				localStorage.setItem('marvelLocalStorageDate', Date.now())
			}

		}

		const PUBLIC_API_KEY = process.env.REACT_APP_MARVEL_API_KEY

		const HASH = process.env.REACT_APP_MARVEL_API_HACH

		const openModalInfo = id => {
			setOpenModal(true)

			  if(!localStorage.getItem(id)){

				axios
				.get('https://gateway.marvel.com/v1/public/characters/'+id+'?ts=1&apikey='+PUBLIC_API_KEY+'&hash='+HASH)
				.then(response => {
					setCharactersInfo(response.data)
					console.log(response.data)
					setLoading(false)

					localStorage.setItem(id, JSON.stringify(response.data))

					if(!localStorage.getItem('marvelLocalStorageDate')){
						localStorage.setItem('marvelLocalStorageDate', Date.now())
					}
					
				})
				.catch(err => {console.log(err)})
			}else{
				setCharactersInfo(JSON.parse(localStorage.getItem(id)))
				setLoading(false)
			}
		}

		const closeModal = () => {
			setOpenModal(false)
			setLoading(true)
		}

	

	
	const body = asked.map((question, index) => {
		return <tr key={index}><td>{question.question}</td><td>{question.answer}</td><td><button onClick={() => openModalInfo(question.heroId)} className='btnInfo'>Infos</button></td></tr>
	})


	const averageGrade = score >= maxQuestion / 2

	const decision = averageGrade ? 
				(
					quizLevel < levelName.length ?
					(
						<React.Fragment>
							<p className='successMsg'>Bravo ! passez au niveau suivant</p>
							<button 
								className='btnResult success'
								style={{textAlign:'center'}}
								onClick={() => props.nextLevelQuestion(quizLevel)}

							>
								Niveau suivant
							</button>
						</React.Fragment>
					)
					:
					(
						<React.Fragment>
							<p className='successMsg'><GiTrophyCup size='50px'/>Bravo !vous etes un expert</p>
							<button className='btnResult gameOver'
								onClick={() => props.nextLevelQuestion(0)}
							>
							Accueil
							</button>
						</React.Fragment>
					)

				)
				:
				(
					<React.Fragment>
						<p className='failureMsg'><VscError size='50px' /> Vous avez echoue!</p>
						<div style={{textAlign:'center', spaceBetween:'8px'}}>
						{/*	<button className='btnResult' style={{color:'white'}} 
								title='recommencer au niveau 1'
								 style={{border:'none'}}
								onClick={() => props.nextLevelQuestion(0)}
							
							>*/}<GrPowerReset size='50px' cursor='pointer' onClick={() => props.nextLevelQuestion(0)} border='none' data-tip='Restart Quiz'/>{/*</button>*/}
								   <ReactTooltip 
						                place="left"
						                effect="solid"
           						    />
           						    <p></p>
						{/*	<button className='btnResult'
								style={{border:'none'}}
								title='recommencer le present niveau'
								onClick={() => props.nextLevelQuestion(quizLevel)}
							>*/}<BiReset size='50px' color='red' cursor='pointer' onClick={() => props.nextLevelQuestion(quizLevel)} data-tip='Restart level'/>{/*</button>*/}
									   <ReactTooltip 
							                place="left"
							                effect="solid"
           						    	/>
						</div>
					</React.Fragment>
				)


	return (

	<React.Fragment>	

		<div className='stepsBtnContainer'>

			{decision}
		</div>

		<div className='percentage'>
			<div className='progressPercent'>Reussite: {percent}%</div>
			<div className='progressPercent'>Note: {score}/{maxQuestion}</div>
		</div>

		<hr/>

		<p> Les Réponses aux Questions posées :</p>

		<div className='answerContainer'>

			<table className='answers'>

				<thead>

					<tr>

						<th>Questions</th>
						<th>Reponse</th>
						<th>Infos</th>

					</tr>

				</thead>

				<tbody>

					{averageGrade ? body : <tr><td colSpan='3' style={{textAlign:'center', color:'red'}}> 

					<div className='loader'></div>
					Pas de reponse! 

					</td></tr>}

				</tbody>

			</table>

		</div>

		<Modal openModal={openModal} hiddenModal={closeModal}>

		 {loading || charactersInfo == null ? 

		 	(
		 		<React.Fragment>
				 <div className='loader'></div>
					<p>Pas de reponse!</p> 
				</React.Fragment>
		 	)
		 	:
		 	(
		 	  <React.Fragment>
				<div className='modalHeader'>
					<h2>{charactersInfo.data.results[0].name}</h2>
				</div>
				<div className='modalBody'>
					<div className='comicImage'>
						<img src={charactersInfo.data.results[0].thumbnail.path+'.'+charactersInfo.data.results[0].thumbnail.extension} alt={charactersInfo.data.results[0].name}/>
						{charactersInfo.attributionText}
					</div>
					<div className='comicDetails'>
						{charactersInfo.data.results[0].description ?

							(
								<p>{charactersInfo.data.results[0].description}</p>
							)
							:
							(
								<p>Description non disponible pour ce personage</p>
							)
						}
						<h3>Plus d'infos</h3>
						{
							charactersInfo.data.results[0].urls.map((url, index) => {
							   return <a key={index} target='_blank' rel='noopener noreferrer'  href={url.url}>{url.type.charAt(0).toUpperCase()+url.type.slice(1)}</a>
						    })
						}
					</div>
				</div>
				<div className='modalFooter'>
					<button className='modalBtn'>
						Fermer
					</button>
				</div>
			  </React.Fragment>
			)
		}
		</Modal>

	</React.Fragment>	
			

		
	)
})

export default React.memo(QuizOver)