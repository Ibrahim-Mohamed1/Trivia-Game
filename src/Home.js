import React, { Component } from 'react';
import options from "./options.js"
import { withData } from './Context.js'
import Game from "./Game.js"

class Home extends Component {

    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        var categoryNum = 9;
        let mappedCategory = Object.values(options.categories).map((option, i) =>
            <option value={categoryNum++} key={i}>{option}</option>
        )

        return (
            <>
                {this.props.display ?
                    <div className="mainForm">
                        <form onSubmit={this.props.handleSubmit}>
                            Number of questions: <input type="number" min='1' max='50' required onChange={this.props.handleNumberOfQuestionsChange} />
                            <br />
                            {this.props.questions !== 0 ?
                                <>
                                    Category: <select name="category" id={this.props.category} onChange={this.props.handleCategoryChange}>
                                        <option value="">Any Category</option>
                                        {mappedCategory}
                                    </select>
                                    <br />
                                    Difficulty: <select name="difficulty" onChange={this.props.handleDifficultyChange}>
                                        <option value="">Any Difficulty</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                    <br />
                                    Type: <select name="type" id={this.props.type} onChange={this.props.handleTypeChange}>
                                        <option value="">Any Type</option>
                                        <option value="multiple">Multiple Choice</option>
                                        <option value="boolean">True / False</option>
                                    </select>

                                    <br />
                                    <input type="submit" className="submitButton" />
                                </> : null
                            }
                        </form>
                    </div>
                    :
                    <Game />
                }
            </>
        );
    }
}

export default withData(Home);