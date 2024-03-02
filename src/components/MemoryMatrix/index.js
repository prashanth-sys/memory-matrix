import {Component} from 'react'

import {FaArrowLeft} from 'react-icons/fa'

import RulesModal from '../RulesModel'

import './index.css'

class MemoryMatrix extends Component {
  state = {
    highlightedIndices: [],
    isModelOpen: false,
  }

  componentDidMount() {
    this.getGridButtons()

    this.intervalId = setInterval(this.getGridButtons, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getGridButtons = () => {
    const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const shuffledArray = myArray.sort(() => Math.random() - 0.5)
    const slicedArray = shuffledArray.slice(0, 3)
    this.setState({highlightedIndices: slicedArray}, () => {
      setTimeout(() => {
        this.setState({highlightedIndices: []})
      }, 3000)
    })

    console.log('New grid buttons:', slicedArray)
  }

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  onClickCell = index => {
    console.log(index)
    clearInterval(this.intervalId)
    const {highlightedIndices} = this.state

    if (highlightedIndices.includes(index + 1)) {
      console.log('matched')
      return 'highlighted'
    }
    if (!highlightedIndices.includes(index + 1)) {
      console.log('not matched')
      this.intervalId = setInterval(this.getGridButtons, 6000)
    }
    return ''
  }

  nextLevel = () => {}

  render() {
    const {highlightedIndices, isModelOpen} = this.state

    return (
      <div className="memory-matrix-container">
        <div className="game-rules-container">
          <button type="button" className="back-button">
            <FaArrowLeft className="icon" />

            <p className="back">Back</p>
          </button>

          <RulesModal isOpen={isModelOpen} onClose={this.toggleModel} />

          <button
            type="button"
            className="rules-button"
            onClick={this.toggleModel}
          >
            Rules
          </button>
        </div>

        <h1 className="game-heading">Memory Matrix</h1>

        <div className="level-container">
          <p className="level">Level-1</p>

          <p className="level">Max Level-00</p>
        </div>

        <div className="game-container">
          {Array.from({length: 9}, (_, index) => (
            <button
              key={index}
              type="button"
              className={`button ${
                highlightedIndices.includes(index + 1) ? 'highlight' : ''
              }`}
              onClick={() => this.onClickCell(index)}
            >
              {_}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default MemoryMatrix
