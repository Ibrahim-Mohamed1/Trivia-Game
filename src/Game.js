import React, { Component } from 'react';
import { withData } from './Context';
import Atob from 'atob'
import Results from './Results.js';
import Nope from './Nope.mp3'
import Ding from './Ding.mp3'

class Game extends Component {
    constructor() {
        super()
        this.state = {
            right: 0,
            answer: '',
            num: 0,
            buttonText: 'Next',
            gameOver: false
        }
    }

    handleNext() {
        var num = this.state.num
        if (num < this.props.questions - 1) {
            this.setState(prevState => ({
                num: prevState.num + 1
            }))
        } else (
            this.setState({ gameOver: true, buttonText: "Results" })
        )
    }

    checkAnswer = (e) => {
        const { value, style } = e.target
        let question = this.props.result.results[0] ? this.props.result.results[this.state.num] : this.props.result.results[this.state.num]
        let answer = question.correct_answer;
        if (value === answer) {
            var ding = new Audio(Ding)
            ding.play()
            style.backgroundColor = 'lime'
            setTimeout(() => {
                style.backgroundColor = 'white'
                this.props.addPoint()
                this.handleNext()
            }, 500);
        } else {
            var nope = new Audio(Nope)
            nope.play()
            style.backgroundColor = 'red'
            setTimeout(() => {
                style.backgroundColor = 'white'
                this.handleNext()
            }, 500);
        }

    }
    render() {

        var stuff = this.props.result.results[0] ? this.props.result.results : this.props.result.results
        var mappedTrivia = stuff.map((item, i) => {

            if (item.type === 'bXVsdGlwbGU=') {
                let arr = []
                arr.push(item.incorrect_answers[0], item.incorrect_answers[1], item.incorrect_answers[2], item.correct_answer)
                let shuffled = arr
                    .map((a) => ({ sort: Math.random(), value: a }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value)
                return (
                    <div>
                        <h2 style={{display: "inline"}}>{Atob(item.category)}</h2>
                        <h4 style={{display: "inline", marginLeft:10}}>[{Atob(item.difficulty)}]</h4>
                        <h1>{this.state.num + 1}. {Atob(item.question)}</h1>
                        <div className='multpleChoiceBtns'>
                            <button className='mBtns' onClick={this.checkAnswer} value={shuffled[0]}>{Atob(shuffled[0])}</button>
                            <button className='mBtns' onClick={this.checkAnswer} value={shuffled[1]}>{Atob(shuffled[1])}</button>
                            <button className='mBtns' onClick={this.checkAnswer} value={shuffled[2]}>{Atob(shuffled[2])}</button>
                            <button className='mBtns' onClick={this.checkAnswer} value={shuffled[3]}>{Atob(shuffled[3])}</button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h2 style={{display: "inline"}}>{Atob(item.category)}</h2>
                        <h4 style={{display: "inline", marginLeft: 10}}>[{Atob(item.difficulty)}]</h4>
                        <h1>{this.state.num + 1}. {Atob(item.question)}</h1>
                        <button 
                            className='TFBtns' 
                            onClick={this.checkAnswer} 
                            value={item.correct_answer === 'VHJ1ZQ==' ? item.correct_answer : null}>
                            True
                        </button>
                        <button 
                            className='TFBtns' 
                            onClick={this.checkAnswer} 
                            value={item.correct_answer === 'RmFsc2U='? item.correct_answer:null}>
                            False
                        </button>
                    </div>
                )
            }
        })
        return (
            <>
                {this.state.gameOver === true ?
                    <Results /> :
                    <div>
                        <div>
                            {mappedTrivia[this.state.num]}
                        </div>
                        {/* <button onClick={() => this.handleNext()}>{this.state.buttonText}</button> */}
                    </div>
                }
            </>
        );
    }
}

export default withData(Game);