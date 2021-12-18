const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const base=require("./webpack.config.base")
const merge=require("webpack-merge");
const TerserPlugin=require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin=require('optimize-css-assets-webpack-plugin');

module.exports=merge(base,{
    module:{
        rules:[
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
    mode:"production",
    optimization:{  //webpack打包优化配置项
        minimize:true, //使用TerserPlugin压缩js，默认true
        minimizer:[  //自定义TerserPlugin压缩
            new TerserPlugin({
                cache:true,  //缓存 优化速度
                parallel:true  //多线程
            }),
            new OptimizeCSSAssetsPlugin({}) //css压缩
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            //Options similar to the same options in webpackOptions.output
            //both options are optional
            filename:'css/[name]-[hash].css',
            chunkFilename:'[id].css',
        }),

    ],

})