import React, { Component } from 'react'

export default class App extends Component {
        state={  //语法插件会自动转成以前那种写法，就不用写了
            count:0
        }
    handleClick=()=>{  //箭头函数指向外部this，就是新new的App
        let { count }=this.state;
        this.setState({
            count:count+1
        })
    }
    render() {
        console.log("render");
        let { count }=this.state;
        return (
            <div>
                <p>{ count }</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
    componentDidMount(){
        console.log("同步语句1------->count值:",this.state.count); //0
        this.setState((prevState,props)=>({
            count:prevState.count+1
        }));
        console.log("同步语句1------->count值:",this.state.count); //0
        this.setState((prevState,props)=>({
            count:prevState.count+1
        }));
        console.log("同步语句1------->count值:",this.state.count); //0
        // 解决：this.setState写成回调函数
    }
}
