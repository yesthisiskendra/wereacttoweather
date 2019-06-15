import React, {Component} from 'react';

// Import Materialize
import M from "materialize-css";


class Dropdown extends Component {
    constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      console.log('PROPS', this.props)
        // Auto initialize all the things!
        // M.AutoInit();
        let selects = document.querySelectorAll('select');
         M.FormSelect.init(selects, {});
    }
    
    handleClick(e){
      console.log("Ive been clicked!", e.target.value)
      this.props.onDateChange(e.target.value)
    }
    render() {
      const options = this.props.options
      return(
        <div className="">
          <div className="">
            <select onChange={this.handleClick}>
              {options.map((option) =>
                <option >{option}</option>
                )}
            </select>
            <label>Month</label>
          </div>
        </div>
        )
    }
}

export default Dropdown;