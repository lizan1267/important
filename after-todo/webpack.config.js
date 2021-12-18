//加载Dev配置=dev专有配置+base公共配置
const dev=require("./webpack.config.dev.js");
//加载prod配置=prod专有配置+base公共配置
const prod=require("./webpack.config.prod.js");

//process是nodejs的内置对象--进程对象
const Target=process.env.NODE_ENV;
//运行npm run dev，Target的值就是 dev
//运行npm run build，Target的值就是 build
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
if(Target==="dev"){
    //导出dev配置
    module.exports=dev;
}
if(Target==="build"){
    //导出prod
    module.exports=prod;
}