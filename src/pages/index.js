import React, { Component } from "react"
import "../all.css"
import { timingSafeEqual } from "crypto"

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      dataSets: 1,
      template: "",
      data: ["placeHolder"],
      keys: ["key1"],
      output: [],
    }
    this.addData = this.addData.bind(this)
    this.reduceData = this.reduceData.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showOutput = this.showOutput.bind(this)
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  showOutput() {
    console.log(this.state.data)
    let list = []

    for (var j = 0; j < this.state.data[0].length; j++) {
      let template = this.state.template
      for (var k = 0; k < this.state.keys.length; k++) {
        template = template.replace(this.state.keys[k], this.state.data[k][j])
      }
      list.push(
        <div>
          <p className="special">{template}</p>
        </div>
      )
    }

    this.setState({ output: list })
  }
  addData() {
    this.setState(
      {
        dataSets: this.state.dataSets + 1,
        data: this.state.data.concat("placeHolder"),
        keys: this.state.keys.concat("key" + (this.state.dataSets + 1)),
      },
      console.log(this.state.data)
    )
  }

  reduceData() {
    let list = [...this.state.keys]
    list.splice(list.length - 1, 1)
    let listTwo = [...this.state.data]
    listTwo.splice(listTwo.length - 1, 1)
    if (this.state.dataSets !== 1) {
      this.setState(
        {
          dataSets: this.state.dataSets - 1,
          keys: list,
          data: listTwo,
        },
        console.log(this.state.data)
      )
    }
  }

  handleChange(e) {
    let list = [...this.state.data]
    list.splice(e.target.name, 1, e.target.value.split(" "))
    this.setState({ data: list })
  }
  render() {
    const sets = []

    for (var i = 0; i < this.state.dataSets; i++) {
      sets.push(
        <div className="inputHolder">
          <p>
            The Data in this input will be mapped to <span>key{i + 1}</span>
          </p>
          <input
            onChange={this.handleChange}
            name={i}
            className="dataInput"
          ></input>
        </div>
      )
    }

    return (
      <div className="global">
        <div className="content">
          <h1 className="check">
            This App Generates html markup based on copy-and-pasted data from
            Excel columns.
          </h1>
          <p className="short">1. Add data sets from excel columns.</p>
          <p className="short">
            2. Paste in raw HTML markup into the textarea below. Replace dynamic
            content with its respective data set key (key1, key2, key3, etc.)
          </p>
          <p className="short">3. Click the generate button.</p>
          <p className="short">
            4. Copy and Paste the output somewhere safe, like a simple notepad
            or your favorite text editor. 💯
          </p>
          <div className="row">
            <button onClick={this.addData} className="add">
              Add Data Set
            </button>
            <button onClick={this.reduceData} className="add">
              Remove Data Set
            </button>
          </div>
          <div className="dataGrid">{sets}</div>
          <div className="inputHolder">
            <p>This is where you put your HTML template.</p>
            <textarea
              onChange={this.handleInput}
              type="text"
              name="template"
              value={this.state.template}
              className="template"
            />
          </div>
          <button onClick={this.showOutput} className="add">
            Generate
          </button>
          {this.state.output}
        </div>
      </div>
    )
  }
}

export default IndexPage

// for (var k = 0; k < this.state.keys.length; k++) {
//   let template = this.state.template
//   template = template.replace(this.state.keys[k], this.state.data[k][k])
//   list.push(template)
//   console.log(list)
// }

// for (var i = 0; i < this.state.data.length; i++) {
//   for (var j = 0; j < this.state.data[i].length; j++) {
//     let template = this.state.template
//     for (var k = 0; k < this.state.keys.length; k++) {
//       template = template.replace(this.state.keys[k], this.state.data[k][j])
//     }
//     list.push(
//       <div>
//         <p>{template}</p>
//       </div>
//     )
//   }
// }
