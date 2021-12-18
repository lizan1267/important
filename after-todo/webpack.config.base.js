const path=require("path"); //path是nodejs内置模块，所以引入的时候不需要加./
const HtmlWebpackPlugin=require("html-webpack-plugin");  //引入插件
const {CleanWebpackPlugin}=require('clean-webpack-plugin');  //引入插件
const webpackBar=require('webpackbar');  //引入插件
module.exports={
    //入口文件
    entry:{
        index:'./src/index.js',
        one:'./src/one.js'
    },
    //打包目录及文件名
    output:{
        //path打包目录
        path:path.resolve(__dirname,'dist'),  //__dirname:项目根目录  dist:发布目录
            //->path:D:\Learning\a朗科\69班\08_webpack\webpack预习\2021.8.10-68\demo3\dist
        //打包文件名
        filename:"js/[name]_[hash].main.js"   //[name]是webpack中的变量，就是entry里边的键名
    },
    plugins:[
        //配置多个应用
            //把public里边的东西拷贝到发布目录
        new HtmlWebpackPlugin({  //假设是前台应用入口
            title:'首页',
            filename:"index.html",
            template:"./public/index.html",
            chunks:["index"]  //chunks指定需要引入的入口模块的键名 index:"./src/index.js"
        }),
        new HtmlWebpackPlugin({  //假设是后台应用入口one:"./src/one.js"
            title:'One',
            filename:"one.html",
            template:"./public/one.html",
            chunks:["one"]  //chunks指定需要引入的入口模块的键名 one:"./src/one.js"
        }),
            //打包的时候先删除dist，再打包
        new CleanWebpackPlugin(),
        new webpackBar()
    ],
    module:{ //配置各种loader
        rules:[ //转换规则,由数组构成    [{},{}] 每个loader就是一个{}对象
            {
                //正则表达式，test()判断是否匹配，匹配返回true，不匹配返回false
                test: /\.jsx?$/,   //label-loader处理的文件扩展名   以.js/.jsx结尾的文件
                exclude: /(node_modules[bower_components])/, //babel-loader忽略目录
                use:{  //具体的转换规则
                    loader: 'babel-loader',  //loader名称
                    // options:{  //loader使用的语法库
                    //     presets:[ '@babel/preset-env', '@babel/preset-react']
                    //               //   ES6语法库            react语法库
                    // }
                }
            },
            {
                test:/\.(png|jpe?g|gif)$/,  //监控图片文件
                use:[
                    {
                        loader:'url-loader',  //用url-loader来处理
                        options:{  //url-loader的选项
                            limit:8192,  //指定多少字节B的图片，自动转码为base64，再插入到js/css中
                            publicPath:'./../img',  //指定最终引用的文件路径(打包生成的index.html文件里面引用资源的前缀)
                            outputPath:'img/'  //图片复制到的文件夹
                        }
                    }
                ]
            },
            {
                test:/\.(ttf|eot|woff|woff2)$/,  //监控字体文件
                loader:'file-loader',  //用file-loader来处理
                options:{  //选项
                    name:'[name].[ext]',  //保存的文件名--原来的名字
                    publicPath:'./../fonts',  //指定最终引用的文件路径(打包生成的index.html文件里面引用资源的前缀)
                    outputPath:'fonts/'  //字体复制到的文件夹
                }
            }
        ]
    },
    resolve:{
        //扩展名，可以省略的扩展名，按顺序搜索
        extensions:['.jsx','.less','.js','.css']
    }
}