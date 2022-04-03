import React, {Component} from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { FaChevronRight } from 'react-icons/fa';
import {QuizMarvel} from '../QuizMarvel'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import QuizOver from '../QuizOver'
import {MathJax} from 'better-react-mathjax'

toast.configure()

class Quiz extends Component{


    constructor(props){
        super(props)

        this.initialstate = {
            levelsName: ["debutant","confirme","expert"],
            quizLevel: 0,
            maxQuestion: 10,
            storeQuestions:[],
            question: null,
            options: [],
            idQuestion: 0,
            userAnswer: null,
            disabled: true,
            showWelcomeMsg: false,
            score:0,
            gameEnd: false,
            percent:0
        }

        this.state = this.initialstate

        this.storeDataRef = React.createRef()

    }



  

    loadQuestion = level => {
        const fetchArrayQuiz = QuizMarvel[0].quizz[level]

        const leng = fetchArrayQuiz[0].options.length
           for(let j = 0; j<this.state.maxQuestion; j++){
                for(let i = 0; i<leng; i++){
                    var indice1 = Math.floor(Math.random() * (3 - 0 + 1)) + 0
                    var indice2 = Math.floor(Math.random() * (3 - 0 + 1)) + 0
                    const temp = fetchArrayQuiz[j].options[indice1]
                    fetchArrayQuiz[j].options[indice1] = fetchArrayQuiz[j].options[indice2]
                    fetchArrayQuiz[j].options[indice2] = temp
                }
               
             }

        // this.randomizeTheOptions(fetchArrayQuiz[0].options)

         this.storeDataRef.current = fetchArrayQuiz

         

         console.log(fetchArrayQuiz[0].options)

        if(fetchArrayQuiz.length >= this.state.maxQuestion){

            const newArray = fetchArrayQuiz.map((answer, ...keepRest) => keepRest)

            this.setState({
                storeQuestions : newArray
            })

        }else{
            console.log('pas assez de question')
        }

        const array = fetchArrayQuiz
    }



    showWelcomeMsg = pseudo => {
      if(!this.state.showWelcomeMsg){


            this.setState({
                showWelcomeMsg:true
            })

            toast.warn('Bienvenue '+pseudo+' et bonne chance pour la suite', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    componentDidMount() {
        this.loadQuestion(this.state.levelsName[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState){
        if((this.state.storeQuestions !== prevState.storeQuestions) && this.state.storeQuestions.length){
            this.setState({
                question : this.state.storeQuestions[1][1][this.state.idQuestion].question,
                options: this.state.storeQuestions[1][1][this.state.idQuestion].options
            })
        }

        if((this.state.idQuestion !== prevState.idQuestion) && this.state.storeQuestions.length){
            this.setState({
                question : this.state.storeQuestions[1][1][this.state.idQuestion].question,
                options: this.state.storeQuestions[1][1][this.state.idQuestion].options,
                userAnswer: null,
                disabled: true,
            })
        }

        if(this.state.gameEnd !== prevState.gameEnd){

             const gradeLevel = this.getPercentage(this.state.maxQuestion, this.state.score)
            
             this.gameOver(gradeLevel)
        }

        if(!!this.props && !!prevProps){
            if(!!this.props.userData && !!prevProps.userData){
                if(this.props.userData.pseudo !== prevProps.userData.pseudo){
                     this.showWelcomeMsg(this.props.userData.pseudo)
                }
            }
        }
    }



        handleChange = selectedAnswer => {
            this.setState({
                userAnswer: selectedAnswer,
                disabled: false,
            })

        }


        nextQuestion = () => {
            if(this.state.idQuestion === this.state.maxQuestion - 1){

                this.setState({gameEnd: true})

            }else{
                this.setState(prevState => ({
                    
                    idQuestion: prevState.idQuestion + 1,
                
                }))

                
            }

            const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer

            if(this.state.userAnswer === goodAnswer){
                this.setState(prevState => ({
                    score: prevState.score + 1
                }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });

            }else if(this.state.userAnswer !== goodAnswer){
                toast.error('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });

            }


        }

      

     
        getPercentage = (maxQuestion, score) => ((score) / maxQuestion) * 100

        gameOver = (gradeLevel) => {

            if(gradeLevel > 50){
                this.setState({
                    quizLevel: this.state.quizLevel + 1,
                    percent:gradeLevel
                })
            }else{
                this.setState({
                    percent:gradeLevel
                })
            }

         
        }


        nextLevelQuestion = (nextLevel) => {
            this.setState({...this.initialstate, quizLevel: nextLevel})

            this.loadQuestion(this.state.levelsName[nextLevel])
        }



    render(){




        const theOptions = (this.state.options.map((option, index) => {
            return  <p key={index} onClick={() => this.handleChange(option)} className={this.state.userAnswer === option ? 'answerOptions selected' : 'answerOptions'} style={{display:'flex'}}>   <MathJax>{option}</MathJax> </p>
        }))

        return this.state.gameEnd ?
        (
            <QuizOver  nextLevelQuestion={this.nextLevelQuestion} ref={this.storeDataRef} score={this.state.score} percent={this.state.percent} maxQuestion={this.state.maxQuestion} levelsName={this.state.levelsName} quizLevel={this.state.quizLevel} />
        )
        :
        (
             <React.Fragment>
                <Levels quizLevel={this.state.quizLevel} levelsName={this.state.levelsName}/>
                <ProgressBar 
                idQuestion={this.state.idQuestion}
                maxQuestion={this.state.maxQuestion}
                />
                <h2><MathJax>{this.state.question}</MathJax></h2>
                
                {theOptions}
                <button disabled={this.state.disabled} className='btnSubmit' onClick={this.nextQuestion}> 
                
                {this.state.idQuestion < this.state.maxQuestion -1 ? "Suivant" : "Terminer" }

                </button>
            </React.Fragment>
        )

        }
    }

export default Quiz