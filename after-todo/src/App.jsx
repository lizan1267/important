import React,{Component} from 'react'
import Item from './Item'
import Footer from './Footer'
import './css/index'

export default class App extends Component {
    state={
        todoDatas:[], //存储所有todo的数组
        todoNum:0,  //————功能8
        view:"all",  //过滤状态
        flag:false  //全选和全不选标识
    }

    //添加todo ————功能1
    addTodo=(e)=>{
        console.log("调用了addTodo");
        console.log(e.keyCode);
        //如果按键不是回车，那么就什么也不做
        //函数中return代表函数调用结束，return后面的语句，不会执行
        if(e.keyCode!==13) return;

        //如果是空，不走添加todo逻辑
        if(e.target.value==="") return;

        //如果是回车键13，那么就执行添加todo逻辑
        let { todoDatas,todoNum }=this.state;

        //生成一个新的todo
        let todo={};
        todo.id=new Date().getTime();
        todo.value=e.target.value.trim();
        todo.hasCompleted=false;
        todoDatas.push(todo);
        todoNum++;
        // this.setState({todoDatas:todoDatas}); //属性值相同可以简化成一个
        // 简写：
        this.setState({todoDatas,todoNum});
        e.target.value="";  //添加完之后输入框清空
    }

    //删除todo  ————功能2
    delTodo=(todo)=>{
        let { todoDatas,todoNum }=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(todo.id===value.id){
                if(!todo.hasCompleted){
                    todoNum--;
                }
                return false;
            }
            return true;
        })
        this.setState({todoDatas,todoNum});
    }

    //改变todo状态  ————功能3
    changeHasCompleted=(todo)=>{
        let { todoDatas,todoNum }=this.state;
        todoDatas=todoDatas.map(value=>{
            if(todo.id===value.id){
                value.hasCompleted=!todo.hasCompleted;
                if(value.hasCompleted){
                    todoNum--;
                }else{
                    todoNum++;
                }
            }
            return value;
        })
        this.setState({todoDatas,todoNum});
    }

    //编辑todo  ————功能5(失去焦点更新)  ————功能6(回车键更新)
    editTodo=(todo)=>{
        let { todoDatas }=this.state;
        todoDatas=todoDatas.map(value=>{
            if(todo.id===value.id){
                value.value=todo.value;
            }
            return value;
        })
        this.setState({todoDatas});
    }

    //过滤  ————功能9
    filterTodo=(view)=>{
        this.setState({view})
    }

    //clearCompleted 清除已完成todo  ————功能10
    clearCompleted=()=>{
        let { todoDatas }=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(value.hasCompleted){
                return false;
            }
            return true;
        })
        this.setState({todoDatas});
    }

    //全选和全不选
    isAll=()=>{
        let { flag,todoDatas,todoNum }=this.state;
        flag=!flag;
        if(flag){
            todoDatas=todoDatas.map(value=>{
                value.hasCompleted=true;
                return value;
            })
            todoNum=0;
        }else{
            todoDatas=todoDatas.map(value=>{
                value.hasCompleted=false;
                return value;
            })
            todoNum=todoDatas.length;
        }
        this.setState({flag,todoDatas,todoNum});
    }

    render(){
        let { todoDatas,todoNum,view }=this.state;
        let { addTodo,delTodo,changeHasCompleted,editTodo,filterTodo,clearCompleted,isAll }=this;
        let filterTodos=todoDatas.filter((todo)=>{
            switch(view){
                case 'all':
                    return true;
                case 'active':
                    return !todo.hasCompleted;
                case 'completed':
                    return todo.hasCompleted;
            }
        })
        let items=filterTodos.map(todo=>{
            return (
                <Item todo={todo} key={todo.id} delTodo={delTodo} 
                changeHasCompleted={changeHasCompleted} editTodo={editTodo} />
            )
        })
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>Todos</h1>
                        <input type="text" className="new-todo" placeholder="What needs to be done?" 
                        onKeyUp={addTodo} />
                    </header>
                    <section className="main">
                        <input type="checkbox" id="toggle-all" className="toggle-all"
                        onClick={isAll} />
                        <label htmlFor="toggle-all"></label>
                        <ul className="todo-list">
                            { items }
                        </ul>
                    </section>
                    <Footer todoNum={todoNum} filterTodo={filterTodo} view={view}
                     clearCompleted={clearCompleted} />
                </section>
            </div>
        )
    }
}