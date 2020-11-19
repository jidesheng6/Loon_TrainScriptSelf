//@description:这是一个本地测试JS文件，用于同步到手机上进行LOON脚本开发。
const UserName = "17601473499";//表情宅账号
const PassWord = "Jdesheng6.";//表情宅密码
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
            $notification.post("表情宅-登陆","登陆成功","昵称:"+NickName+"\n金币:"+CoinCount);
        }
    })
}
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
        var ReturnJson = JSON.parse(data);
        var statusCode = ReturnJson.status;
        if(statusCode==0)
        {
            $notification.post("表情宅-失败","🧸今天已经签到过了,请勿重复签到","");
        }
        else if(statusCode==1)
        {
            $notification.post("表情宅-签到成功",`签到成功`,`结存金币undefine个`);
        }
        //console.log(ReturnJson)
        console.log("\n\n表情宅原始信息调试:\n\n"+data);
    })
}
async function Tasks()
{
    LoginTeddy(UserName,PassWord);
    await CheckIn();
}
Tasks();
