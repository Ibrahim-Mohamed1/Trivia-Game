import React, { Component } from 'react';
import axios from "axios";
const { Provider, Consumer } = React.createContext();

class Context extends Component {
    constructor() {
        super()
        this.state = {
            answeredRight: 0,
            questions: 0,
            category: null,
            difficulty: '',
            type: '',
            result: [],
            display: true
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    handleNumberOfQuestionsChange = (e) => {
        e.preventDefault()
        this.setState({ questions: e.target.value })
    }
    handleCategoryChange = (e) => {
        e.preventDefault()
        this.setState({ category: e.target.value })
    }
    handleDifficultyChange = (e) => {
        e.preventDefault()
        this.setState({ difficulty: e.target.value })
    }
    handleTypeChange = (e) => {
        e.preventDefault()
        this.setState({ type: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ display: false })
        this.fetchData(this.state.questions, this.state.category, this.state.difficulty, this.state.type)
    }
    handleClick = () => {
        let num = this.state.num
        if (num < this.props.questions) {
            this.setState({
                title: (this.props.result.results[num] ? this.props.result.results[num].category : null)
            })
        } else {
            this.setState({ gameOver: true })
        }
        this.setState(prevState => ({num: prevState.num + 1}))
    }
    addPoint = () => {
        this.setState(prevState => ({ answeredRight: prevState.answeredRight + 1 }))
    }

    fetchData = (questions, category, difficulty, type) => {
        if (category === null && type === '' && difficulty === '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else if (category === null && type === '' && difficulty !== '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&difficulty=${difficulty}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else if (category === null && type !== '' && difficulty === '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&type=${type}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else if (category !== null && type === '' && difficulty === '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&category=${category}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else if (category === null && type !== '' && difficulty !== '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&difficulty=${difficulty}&type=${type}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else if (category !== null && type === '' && difficulty !== '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else if (category !== null && type !== '' && difficulty === '') {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&category=${category}&type=${type}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        } else {
            axios.get(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`)
                .then(res => {
                    this.setState({
                        result: res.data
                    })
                })
        }
    }

    // https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

    render() {
        return (
            <Provider value={{
                fetchData: this.fetchData,
                handleNumberOfQuestionsChange: this.handleNumberOfQuestionsChange,
                handleCategoryChange: this.handleCategoryChange,
                handleDifficultyChange: this.handleDifficultyChange,
                handleTypeChange: this.handleTypeChange,
                handleSubmit: this.handleSubmit,
                handleClick: this.handleClick,
                addPoint: this.addPoint,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default Context;
export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}