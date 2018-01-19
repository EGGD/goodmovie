# GOODMOVIE是什么？
是一个`个人电影网站`。
## GOODMOVIE的功能是什么？
可收录个人的`观看电影`及`未观看电影`的`详情`和`下载地址`
## GOODMOVIE如何使用？
#### 一共分为四个模块
  * 1、没有观看过但是想看的`电影列表`
  * 2、观看过的`电影列表`
  * 3、电影`详情`页
  * 4、电影`详情添加`页
#### 进入页面开始显示的是电影的`未观看列表`及`已观看列表`
  点击图片或电影名称、时间等可以进入详情页
#### 详情页内容
  电影的详情及图片内容 右下 可以`转换图标` 可用于转换此电影为`未看`或者`已看`
#### 添加页内容
  基本内容与详情页相同 电影默认添加类型为`未观看`
## Hue使用了什么技术
 #### `前台：`<p>
 * `React`用于数据展示及其交互
 * 动画为`Css3`编写
 #### `后台：`<p>
 * 使用`express`来编写`接口`及`爬虫`
 * 使用`Mysql`来设计`数据库`及`其表`
 ## 当时编写GOODMOVIE的技术难点
 * 难点：单页面显示多页面内容 类table页显示 切换
 * 解决：用map遍历显示所有模块 多个条件显示不同内容
 ```javascript
    //用showindex 判断显示什么模块 利用它的渲染模块来切换内容
    let Content = this.state.nava.map((e, index) => {
        if (index === 0 && index === this.state.showindex) {
            return (<NotSeen notSeenData={this.state.notSeenList} showDetailMovie={this.showDetailMovie.bind(this)} key={index} />);
        } else if (index === 1 && index === this.state.showindex) {
            return (<HaveSeen haveSeenData={this.state.haveSeenList} showDetailMovie={this.showDetailMovie.bind(this)} key={index} />);
        } else if (index === 2 && index === this.state.showindex) {
            return (<DetailMoive key={index} moivesDetail={this.state.moivesDetail} setDetailMovie={this.setDetailMovie.bind(this)} />);
        } else if (index === 3 && index === this.state.showindex) {
            return (<AddMoive key={index} refreshDataList={this.refreshDataList.bind(this)} />);
        } else {
            return (null);
        }
    });
    // 添加模块需要登录显示
    // 遍历内容添加 添加模块 退出时删除模块
    showOnLogin() {
        var nava = this.state.nava;
        nava.push({
            name: "Add Movies"
        });
        this.setState({ onlogin: true, login: false, nava: nava, showindex: 0  });
    }
 ```
  * 难点：图片及其他外部js封装
  * 解决：使用`import`及`export default`来进行封装
  
  * 难点：`express`多表联查数据
  * 解决：使用`async.waterfall`回调来进行数据查询`sql`  方式如下:
```javascript
    async.waterfall([
        function (callback) { //第一个请求           
            connection.query(AddMovie.selectMovie(), [
                param.Name
            ], function (err, result) {
                if (result) {
                    callback(err, result);
                } else {
                    res.send(err);
                };
            })
        }, function (selsect, callback) { //第一个请求           
            if (selsect.length != 0) {
                responseJSON(res, {
                    data: '数据已存在',
                    item: selsect
                });
                connection.release();
            } else {
                connection.query(AddMovie.postAddMovie(), [
                    param.Name, param.Name_Title, param.Category, param.Director, param.Decsription,
                    param.Date_Time, param.Create_Time, param.Create_User, param.Is_Delete, param.sys_user_ID
                ], function (err, result) {
                    if (result) {
                        callback(err, result);
                    } else {
                        res.send(err);
                    };
                })
            }
        }, function (AddMoive, callback) { //第二个请求
            let onimglist = ""
            if (param.Image_Url) {
                onimglist = param.Image_Url.split("|");
                for (let i = 0; i < onimglist.length; i++) {
                    if (onimglist[i] != "") {
                        connection.query(AddMovie.postAddMovieImage(), [AddMoive.insertId, onimglist[i]], function (err, result) {
                            if (result) {
                                if (i == onimglist.length - 1) callback(err, AddMoive, result);//请求结果返回到下一个请求
                            } else {
                                res.send(err);
                            };
                        })
                    }
                }
            } else {
                responseJSON(res, param.Image_Url);
                connection.release();
            }


        }, function (AddMoive, imageData, callback) {//第三个请求
            let ondwnlist;
            if (param.Sownload_Url) {
                ondwnlist = param.Sownload_Url.split("|");
                for (let i = 0; i < ondwnlist.length; i++) {
                    if (ondwnlist[i] != "") {
                        connection.query(AddMovie.postAddMovieDownload(), [AddMoive.insertId, ondwnlist[i]], function (err, result) {
                            if (result) {
                                if (i == ondwnlist.length - 1) callback(err, AddMoive, imageData, result);//请求结果返回到下一个请求
                            } else {
                                res.send(err);
                            };
                        })
                    }
                }
            } else {
                responseJSON(res, param.Sownload_Url);
                connection.release();
            }

        }
    ], function (err, AddMoive, imageData, downloadData) {//获取前三个请求的结果
        responseJSON(res, AddMoive);
        connection.release();
    })
```
## 代码获取后如何使用
```javascript
  npm install
  npm start 
  npm build 
```
  数据库备份恢复
## 后续可扩展内容
  * 首页加载过渡、新电影加载过渡、登录过渡等可以添加Css3动画
  * 首页Logo制作并添加
  * 单页面排版色调更换
  * 多用户登录内容替换(添加自己的笔记内容如`观影期待`、`观后感`等)
  * 或论坛类用户评论模块添加(用户详情页、用户历史、收藏等)

  



