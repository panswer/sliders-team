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
        let slideChange = this.state.sladers.filter(slide=>Number(slide.id)===Number(e.target.id)).pop();
        let otherSlide = this.state.sladers.filter(slide=>Number(slide.id)!==Number(e.target.id));

        let now = Number(slideChange.value);
        let left=Number(e.target.value);

        if(left<=97){
            let amount = now-left;
            let rest = amount<0?otherSlide.filter(slide=>Number(slide.value)===0).length:0;
    
            let newValues = this.state.sladers.map(slade=>{
                if(String(slade.id)===String(e.target.id)){
                    console.log(`${slade.id}:${e.target.id}`);
                    slade.value=parseFloat(e.target.value);
                }else if(Number(slade.value)===0&&amount<0){
                    slade.value=0;
                }else{
                    // let value= parseFloat((parseFloat(slade.value.toFixed(2))+parseFloat((amount/(otherSlide.length-rest)).toFixed(2))).toFixed(2));
                    let value= parseFloat(
                        (
                            this.plus(Number(slade.value),Number(amount/(otherSlide.length-rest)))
                        ).toFixed(2)
                    );
                    
                    slade.value=value;
                }

                return slade;
            });

            while(
                (newValues.filter(slider=>slider.value<0).length>0)&&
                (newValues.filter(slider=>!isFinite(slider.value)).length===0)
                ){
                newValues=this.reOrder(newValues,e.target.id);
            }

            this.setState({
                sladers:newValues
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