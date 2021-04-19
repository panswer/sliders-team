import {Component} from 'react';

class SliderSimple extends Component{
    constructor(props){
        super(props);

        this.state={
            id:props.data.id,
            name:props.data.name,
            value:props.data.value,
            handleChange:props.handleChange
        };
    }

    render(){
        return (
            <div className="">
                <label
                    htmlFor=""
                    className="form-label"
                >
                    {this.state.name}
                </label>
                <input 
                    type="range" 
                    className="form-range" 
                    step={1}
                    value={this.state.value}
                    onChange={e=>this.state.handleChange(e,this.state.name,this.state.value)}
                />
            </div>
        );
    }
}

export default SliderSimple;