const Target=process.env.NODE_ENV;
const dev=require("./webpack.config.dev")
const prod=require("./webpack.config.prod")

if(Target==="development"){
    module.exports=dev;
}
if(Target==="production"){
    module.exports=prod;
}