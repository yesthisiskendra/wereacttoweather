import React, {Component} from 'react';
import M from "materialize-css";


class Dropdown extends Component {
    constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      let selects = document.querySelectorAll('select');
      M.FormSelect.init(selects, {});
    }
    handleClick(e){
      this.props.onDateChange(e.target.value)
    }
    render() {
      const options = this.props.options
      return(
        <div className="">
          <div className="">
            <select onChange={this.handleClick}>
              {options.map((option) =>
                <option key={option} >{option}</option>
                )}
            </select>
            <label>Month</label>
          </div>
        </div>
        )
    }
}

export default Dropdown;