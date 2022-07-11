import './App.css';
import './slider_box.css';
// import SliderSimple from './components/slidesSimple';
import {firstValue} from "./utility/data_example.json";
import {Component} from 'react';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            sladers:firstValue
        };
        
        this.handleChange=this.handleChange.bind(this);
    }

    plus(num1=0,num2=0,presicion=1000000){
        return (parseInt(num1*presicion)+parseInt(num2*presicion))/presicion;
    }

    reOrder(sliders=[{
        value:Number,
        id:String
    }],exclude=''){
        // let residuo = parseFloat(sliders.filter(slider=>slider.value<0).map(slide=>slide.value).reduce((previos,current)=>previos+current).toFixed(2));
        let residuo = parseFloat(sliders.filter(slider=>slider.value<0).map(slide=>slide.value).reduce((previos,current)=>this.plus(previos,current)).toFixed(2));
        
        return sliders.map(slider=>{
            if(slider.id===parseFloat(exclude)){
                return slider;
            }else if(slider.value<=0){
                return {
                    ...slider,
                    value:0
                };
            }else{
                // let value=parseFloat((parseFloat(slider.value.toFixed(2))+parseFloat((residuo/(sliders.length-sliders.filter(slider=>slider.value<=0).length).toFixed(2)))).toFixed(2));
                let value = parseFloat(
                    this.plus(Number(slider.value),Number(residuo/(sliders.length-sliders.filter(slider=>slider.value<=0).length))).toFixed(2)
                );
                
                return {
                    ...slider,
                    value
                };
            }
        });
    }
    
    handleChange(e){
        let indexSliderChange=this.state.sladers.findIndex(slider=>`${slider.id}`===`${e.target.id}`)
        let sladerChange=this.state.sladers[indexSliderChange];

        let newValue =Number(e.target.value);
        
        if(newValue>97){
            let newSladers=this.state.sladers.map(slader=>({
                ...slader,
                value:(`${slader.id}`===`${sladerChange.id}`)?97:0
            }));
            this.setState({
                sladers:newSladers
            });
        }else{
            let rest=this.plus(Number(sladerChange.value),newValue*-1);
            console.log(rest);
            let otherSlider=this.state.sladers.filter(slader=>slader.value>0);
            let inZero=this.state.sladers.filter(slader=>slader.value===0);

            let newSladers=this.state.sladers.map(slader=>{
                if(`${slader.id}`===`${sladerChange.id}`){
                    return {
                        ...slader,
                        value:newValue
                    };
                }else if(
                    slader.value>0||
                    rest>0
                ){
                    let newValue=this.plus(Number(slader.value),Number(rest)/Number(otherSlider.length-inZero.length-1));
                    return {
                        ...slader,
                        value:newValue
                    };
                }else{
                    return slader;
                }
            });

            this.setState({
                sladers:newSladers
            });
        }
    }
    render(){
        return (
            <div className = "App" >
                <h1>Sliders</h1>
                <div id="my_sladers">
                    {this.state.sladers.map((slider,index)=>
                        <div className="" key={slider.id}>
                            <label
                                htmlFor={slider.id}
                                className="form-label"
                            >
                                {`${slider.name}: ${slider.value.toFixed(0)}`}
                            </label>
                            <input 
                                type="range" 
                                className="form-range" 
                                step={0.01}
                                value={slider.value}
                                id={slider.id}
                                onChange={this.handleChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;