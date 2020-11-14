//@description:这是一个本地测试JS文件，用于同步到手机上进行LOON脚本开发。
const UserName = "";//表情宅账号
const PassWord = "";//表情宅密码
function LoginTeddy(UserName,PassWord)
{
    const LoginUrl = "https://dou.imd.im/api/login";
    const InfoPost = {"username":UserName,"password":PassWord};
    const ParamsLogin = 
    {
        url:LoginUrl,
        body:InfoPost
    }
    $httpClient.post(ParamsLogin,function(error,response,data)
    {
        let ReturnObj = JSON.parse(data);
        var statusCode = ReturnObj.status;
        if(statusCode==0)
        {
            $notification.post("表情宅-出错","您的账号或密码错误,请重新配置","");
        }
        else
        {
            var DataTree = ReturnObj.data;
            var NickName = DataTree.nickname;
            var CoinCount = DataTree.coinCount;
            var TokenValue = DataTree.token;
            var UserId = DataTree.id;
            $persistentStore.write(TokenValue,"Token");
            $persistentStore.write(UserId,"Id");
            $persistentStore.write(CoinCount,"coin");
            console.log("\n\n表情宅调试信息:写入Token和Id信息成功");
            $notification.post("表情宅-登陆登陆成功","","昵称:"+NickName+"\n金币:"+CoinCount);
        }
    })
}
LoginTeddy(UserName,PassWord);
function CheckIn()
{
    const CheckInUrl = "https://dou.imd.im/api/checkin";
    const PostDataHeader = 
    {
        "Authorization":"Bearer " + $persistentStore.read('Token'),
        "userid":$persistentStore.read("Id")
    }
    const SendDataPar = 
    {
        url:CheckInUrl,
        headers:PostDataHeader
    }
    $httpClient.post(SendDataPar,function(error,response,data)
    {
        let ReturnJson = JSON.parse(data);
        var statusCode = ReturnJson.status;
        if(statusCode==0)
        {
            $notification.post("表情宅-失败","今天已经签到过了,请勿重复签到","");
        }
        else
        {
            var CheckInSuccessData = ReturnObj.data;
            var CheckInCoinCount = CheckInSuccessData.count + $persistentStore.read("coin");
            $notification.post("表情宅-成功","签到完成:\n当前金币数量:"+CheckInCoinCount);
        }
        console.log("\n\n表情宅原始信息调试:\n\n"+data);
    })
}
setTimeout(CheckIn,1300)//太快了不太好，你们会觉得我的程序根本没在运行什么
//tips：不做定时通知顺序会乱
