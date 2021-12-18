import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)

// 执行流程：
// 一运行npm run dev就进行打包，就加载React,ReactDom,App，一加载App，就加载React和Component，
// 创建App类，这个类继承Component上的属性，然后创建里边的函数，但是不会调用。然后执行ReactDom.render,
// <App />就是渲染App组件，渲染它，就是new App()，一new，因为它是类，就进入它的生命周期方法，
// 就调render，render一渲染，就返回这个Dom（<div>App组件</div>），然后new App()就被这个Dom替换了
// 然后这个Dom就innerHTML到它的挂载点