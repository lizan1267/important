const MiniCssExtractPlugin=require('mini-css-extract-plugin'); //引入插件
const base=require('./webpack.config.base');
const merge=require('webpack-merge');
const TerserPlugin=require('terser-webpack-plugin');//webpack内置插件，对js进行压缩
const OptimizeCSSAssetsPlugin=require('optimize-css-assets-webpack-plugin');//第三方包：对CSS进行压缩
module.exports=merge(base,{
    plugins:[
        new MiniCssExtractPlugin({
            //Options similar to the same options in webpackOptions.output
            //both options are optional
            filename:'css/[name]-[hash].css', //打包后的文件名
            chunkFilename:'[id].css',  //打包后的chunk名
        }),
    ],
    module:{ //配置各种loader
        rules:[ //转换规则,由数组构成    [{},{}] 每个loader就是一个{}对象
            {
                test:/\.css$/,  //监控css文件
                use:[{
                    loader:MiniCssExtractPlugin.loader
                },{
                    loader:'css-loader',
                    options:{
                        modules:true
                    }
                }], 
                // 写成数组的形式写到一行上，先调右边的，再调左边的  右→左
                // 写成对象的形式，先调下边的，再调上边的  下→上
            },
            {
                test:/\.less$/,  //监控less文件
                use:[{  //写成对象的形式，先调下边的，再调上边的  下→上
                    loader:MiniCssExtractPlugin.loader  //creates style nodes from JS strings
                },{
                    loader:'css-loader',  //translates CSS into CommonJS
                    options:{
                        modules:true,
                    }
                },{
                    loader:'less-loader'  //compiles Less to CSS
                }]
            },
            {
                test:/\.scss$/,  //监控scss文件
                use:[{
                    loader:MiniCssExtractPlugin.loader  //creates style nodes from JS strings
                },{
                    loader:'css-loader'  //translates CSS into CommonJS
                },{
                    loader:'sass-loader'  //compiles sass to CSS
                }]
            },
        ]
    },
    mode:"production",  //启用那两个插件，实现热重载
    devtool:"source-map",
    optimization:{  //webpack配置项
        minimize:true, //使用TerserPlugin压缩js，默认false
        minimizer:[  //自定义TerserPlugin压缩
            new TerserPlugin({
                cache:true,  //缓存 优化速度
                parallel:true  //多线程
            }),
            new OptimizeCSSAssetsPlugin({}) //css压缩
        ]
    }
})