import React, { PureComponent } from 'react'

export default class Child extends PureComponent {
    UNSAFE_componentWillMount(){
        alert("Child UNSAFE_componentWillMount 1");
    }
    render() {
        alert("Child render 2");
        let {x}=this.props;
        return (
            <div>
                <h3>Child组件</h3>
                <p>父组件给子组件通过属性this.props传递的数据x:{x}</p>
            </div>
        )
    }
    componentDidMount(){
        alert("Child componentDidMount 3");
    }
    //将要接收props
    UNSAFE_componentWillReceiveProps(nextProps){
        alert("Child UNSAFE_componentWillReceiveProps 4");
    }
    // shouldComponentUpdate(nextProps,nextState){
    //     alert("Child shouldComponentUpdate 5");
    //     console.log("nextProps",nextProps);
    //     console.log("nextState",nextState);
    //     return true;//不管this.state,this.props是否改变都会进入更新阶段——重新调用render
    // }
    UNSAFE_componentWillUpdate(){
        alert("Child UNSAFE_componentWillUpdate 6");
    }
    componentDidUpdate(){
        alert("Child componentDidUpdate 7");
    }
}
