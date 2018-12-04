import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      userInput: '',
      items: []
    }
  }
  
  /*
  handleChange = event => {
    const textInput = event.target.value;
    this.setState({
      userInput: textInput
    });
  }
  */

  componentDidMount() {
    this.hydrateStateWithSessionStorage();
  }

  handleChange = (key, value) => {
    this.setState({
      userInput: value
    });
    sessionStorage.setItem(key, value);
  }
  
  addTodo = event => {
    event.preventDefault();
    
    this.setState(
      {
        items: [...this.state.items, this.state.userInput],
        userInput: ''
      }, 
      () => {
        sessionStorage.setItem("items", JSON.stringify(this.state.items));
        sessionStorage.setItem("newItem", "");
      }
    );

  }

  deleteTodo = item => {
    const array = this.state.items;
    const index = array.indexOf(item)
    array.splice(index, 1)

    this.setState(
      {
      items: array
      }, 
      () => {
        sessionStorage.setItem("items", JSON.stringify(array));
      }
    );

  }

  hydrateStateWithSessionStorage() {
    for (let key in this.state) {
      if (sessionStorage.hasOwnProperty(key)) {
        let value = sessionStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  renderTodos = () => (
    this.state.items.map((item, index) => {
      return(
        <div className="item-todo" key={ index }>
          <p>{ item }</p>
          <button 
            onClick={ this.deleteTodo.bind(this, item) }
          >
            <span>X</span>
            </button>
        </div>
      )
    })
  )

  render() {

    return(
      <Fragment>
        <div className="top-todo">
          <div className="top-todo--left">
            <h1><strong>Thursday,</strong> 10th</h1>
            <small>December</small>
          </div>
          <div className="top-todo--right">
            <p className="tasks-counter"><strong>{ this.state.items.length }</strong> Tasks</p>
          </div>
        </div>
        <form>
          <input
            type="text"
            placeholder="Ajouter un item "
            value={ this.state.userInput }
            /* onChange={ this.handleChange.bind(this)} */
            onChange={ e => this.handleChange("userInput", e.target.value)}
          />
          <button 
            type="submit"
            onClick={ this.addTodo.bind(this) }
          >
            +
          </button>
        </form>
        <div className="list-todo">
          { this.renderTodos() }
        </div>
      </Fragment>
    )

  }

}

export default App;