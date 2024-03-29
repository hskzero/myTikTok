//项目服务器IP和端口

var myURL = "http://150.158.115.140:11316/myTikTok";
alert("请根据键盘↑↓键来切换视频");
//初始化
var index = 0;
var arr = [];
let current = 0;
//获取登录用户信息
var userData = JSON.parse(localStorage.getItem("userData"));

//判断用户登录信息是否过期



//游客登录的情况
if (userData !== "") {
    document.getElementById("user_name").innerText = userData.userName;

    document.getElementById("userlogin").value = "退出登录";
    document.getElementById("userlogin").setAttribute("onclick", "UserExit()");
} else {
    document.getElementById("user_name").innerText = "未登录"

    document.getElementById("userlogin").value = "登录账号";
    document.getElementById("userlogin").setAttribute("onclick", "UserLogin()");
}

// console.log(data)

//频道英文映射表
var myMap = new Map();
myMap.set("热点","top");
myMap.set("关注","care");
myMap.set("直播","broadcast");
myMap.set("商城","shopping");
myMap.set("推荐","referee");


//处理发送的GET请求
function getRequest(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 ){
            arr = [];
            if (xhr.status == 200) {
                // 处理成功的响应
                console.log("服务器响应:\n"+xhr.responseText);
                OKResponse(xhr.responseText);
            }else{
                console.log("服务器未响应,http状态码: " + xhr.status + " 请求当前状态: " + xhr.readyState);
                alert("请求超时,服务器未响应")
                return;
            }
        }
    };
    xhr.send();
}

function OKResponse(responseText){
    if(index == 0||index == 1||index == 4){
        strArray = translateData(responseText);
        updateArray(strArray);
    }else if(index == 2){

    }else if(index == 3){

    }
}


//解析成功返回的数据(未实现)
function translateData(data){
    var strArray = new Array();
    strArray = data.split('\n');
    return strArray;
}


//更新数组
function updateArray(strArray){
    current = 0;
    for(var i = 0;i < strArray.length; i++){
        //arr.unshift(strArray[i]);
        arr.push(strArray[i]);
    }
    current = (current + arr.length)%arr.length;

    //更新视频播放器
    document.getElementById("video").innerHTML = `
        <source id="s" src="${arr[current]}" type="video/mp4">
    `;
    document.getElementById("video").load();
}


//监听事件
//监听键盘
window.onkeydown = function (e)
{
    console.log(e.keyCode);
    if (e.keyCode == 38) {
        //上
        if(arr.length == 0)return;
        current = (current - 1 + arr.length)%arr.length;
        console.log(current);
        document.getElementById("video").innerHTML = `
            <source id="s" src="${arr[current]}" type="video/mp4">
        `;
        document.getElementById("video").load();
    }
    if(e.keyCode == 40){
        //下
        if(arr.length == 0)return;
        current = (current + 1 + arr.length)%arr.length;
        console.log(current);
        document.getElementById("video").innerHTML = `
            <source id="s" src="${arr[current]}" type="video/mp4">
        `;
        document.getElementById("video").load();
    }
}

//初始加载事件
//频道显示
//视频切换源
window.onload = function(){
    var header = document.querySelector('.taghead')
    var lis = header.querySelectorAll('li')
    
    //各标题点击事件(发送get请求)
    for(var i = 0;i < lis.length;i++){
        //设置序号
        lis[i].setAttribute('index',i)
        //注册点击事件
        lis[i].onclick=function(){
            for(var j = 0;j < lis.length;j++){
                lis[j].className = '' 
            }
            this.className = 'tag'
            //获得序号
            index = this.getAttribute('index')
            //根据序号发送get请求
            getRequest(myURL + "/" + myMap.get(this.textContent));
            //在网站上显示发送的请求以便测试
            console.log(myURL + "/" + myMap.get(this.textContent));

            //每个标签设置不同主体
            if(index == 0||index == 1||index == 4){
                document.getElementById("mainbody").innerHTML = `
                    <video id="video" width="652" height="700" controls autoplay loop>
                        <source id="s" src="" type="video/mp4">
                    </video>
                `;
            }else if(index == 2){
                document.getElementById("mainbody").innerHTML = `
                    <h1>暂未开发</h1>
                `;
            }else if(index == 3){
                document.getElementById("mainbody").innerHTML = `
                    <h1>暂未开发</h1>
                `;
            }else {
                document.getElementById("mainbody").innerHTML = `
                    <h1>暂未开发</h1>
                `;
            }

        }
    }

    //初始化窗口
    initWindows();
}

function initWindows(){
    //默认发送热点频道请求
    getRequest(myURL + "/" + myMap.get("热点"));
    //设置主体内容
    document.getElementById("mainbody").innerHTML = `
        <video id="video" width="652" height="700" controls autoplay loop>
            <source id="s" src="" type="video/mp4">
        </video>
    `;
    //加载视频
    if(arr.length == 0) return;
    current = (current + arr.length)%arr.length;
    document.getElementById("video").innerHTML = `
        <source id="s" src="${arr[current]}" type="video/mp4">
    `;
    document.getElementById("video").load();
}

//右上角用户信息
const userAvatar = document.getElementById('user_avatar');
const userMenu = document.getElementById('user_menu');

userAvatar.addEventListener('click', (event) => {
    userMenu.classList.toggle('active');
    event.stopPropagation(); // 阻止事件冒泡
});

userMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // 阻止事件冒泡
});

document.addEventListener('click', () => {
    userMenu.classList.remove('active');
});


//个人中心
function UserInfo(){
    if(!UserIsLogin()){
        alert("用户未登录")
        return 
    }
}

//历史记录
function HistoryVideo(){
    if(!UserIsLogin()){
        alert("用户未登录")
        return 
    }
}

//我的订单
function MyOrder(){
    if(!UserIsLogin()){
        alert("用户未登录")
        return 
    }
    window.location.href = "404.html";
}

//用户登录页面跳转
function UserLogin(){
    window.location.href = "login.html";
}

//退出登录
function UserExit(){
    if(!UserIsLogin()){
        alert("用户未登录")
        return 
    }
    if(confirm("请问是否退出登录")){
        var nowData = "";
        localStorage.setItem("userData", JSON.stringify(nowData));
        window.location.reload();
    }
}

//注销用户
function UserDelete(){
    if(!UserIsLogin()){
        alert("用户未登录")
        return 
    }
    if(confirm("注销用户会导致您的用户所有信息全都删除,请问您真的要注销您的账户吗?")){
        
        fetch(myURL+'/user/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID: userData.userID,userName: userData.userName ,token: userData.token}),
        })
        .then(response => {
            if (!response.ok) {
                alert("服务器未响应")
                throw new Error('Network response was not ok');
            }   
            return response.json();
        })
        .then(data => {
            if(data.status_code != 1100){
                alert(data.status_msg);
                return
            }
            alert(data.status_msg);
            nowData = "";
            localStorage.setItem("userData", JSON.stringify(nowData));
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function UserIsLogin(){
    if(userData == "")return false;
    return true;
}

function UpLoadVideo(){
    if(!UserIsLogin()){
        alert("用户未登录")
        return 
    }
    window.location.href = "upload.html";
}