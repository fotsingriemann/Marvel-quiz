import React from 'react'
import Stepper from 'react-stepper-horizontal/lib'


const Levels = (props) => {


	const [quizlevel, setQuizLevel] = React.useState(0)
	const [levelName, setlevelName] = React.useState([])

		React.useEffect(() => {

			setQuizLevel(props.quizLevel)
			setlevelName(props.levelsName)

		},[props])


		const levelSteps = levelName.map(level => ({title:level.toUpperCase()}))


	return (
		<div className='levelsContainer' style={{background:'transparent'}}>
      			<Stepper 
      			steps={ levelSteps } 
      			activeStep={ quizlevel } 
      			circleTop = {0}
      			activeColor={'red'}
      			completeColor={'#E0E0E0'}
      			activeTitleColor={'red'}
      			completeTitleColor={'#E0E0E0'}
      			defaultTitleColor={'#E0E0E0'}

      			/>

		</div>

	)
}

export default React.memo(Levels) 