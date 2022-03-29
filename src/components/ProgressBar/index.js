import React, {Fragment} from 'react'


const ProgressBar = ({idQuestion, maxQuestion}) => {

	const width = {
		width:(((idQuestion + 1) / maxQuestion) * 100).toString()+'%'
	}


	return (
		<Fragment>
		<div className='percentage'>
			<div className='progressPercent'>Question: {idQuestion + 1}/{maxQuestion}</div>
			<div className='progressPercent'>Progression: {((idQuestion + 1) / maxQuestion) * 100}%</div>
		</div>
		
		<div className='progressBar'>
			<div className='progressBarChange' style={width}>

			</div>
		</div>

		</Fragment>

	)
}

export default React.memo(ProgressBar)