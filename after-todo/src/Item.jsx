import React, { Component } from 'react'

export default class Item extends Component {
    state={
        inEdit:false, //是否进入编辑状态
        flag:true  //是否可以执行onBlur处理函数里面的代码
    }
    //双击进入编辑状态调的函数  ————功能4
    handleEdit=()=>{
        let { todo }=this.props;
        this.setState({
            inEdit:true
        },()=>{
            this.refs.myInput.value=todo.value;
            //原生js模拟触发————模拟用户将鼠标点入文本框
            this.refs.myInput.focus();
        })
    }
    render() {
        let { handleEdit }=this;
        let { inEdit,flag }=this.state;
        let { todo,delTodo,changeHasCompleted,editTodo }=this.props;
        let completed=todo.hasCompleted?"completed":"";
        let editing=inEdit?completed+" editing":completed;
        return (
            <li className={editing}>
                <div className="view">
                    <input type="checkbox" className="toggle" 
                    onChange={()=>changeHasCompleted(todo)} 
                    checked={todo.hasCompleted} />
                    <label onDoubleClick={handleEdit}>{ todo.value }</label>
                    <button className="destroy" onClick={()=>delTodo(todo)}></button>
                </div>
                <input type="text" ref="myInput" className="edit" 
                onBlur={ev=>{ //失去焦点更新
                   if(flag){
                        console.log("onBlur");
                        todo.value=ev.target.value.trim();
                        editTodo(todo);
                        this.setState({
                            inEdit:false
                        })
                   }
                }}
                onKeyUp={ev=>{  //回车更新
                    if(ev.keyCode===13){
                        todo.value=ev.target.value.trim();
                        editTodo(todo);
                        this.setState({
                            inEdit:false
                        })
                    }
                    if(ev.keyCode===27){
                        // editTodo(todo);
                        this.setState({
                            inEdit:false,
                            flag:false
                        });
                        setTimeout(()=>{  //Esc取消更新用到的 ————功能7
                            this.setState({flag:true})
                        },10)
                    }
                }}
                />
            </li>
        )
    }
}
