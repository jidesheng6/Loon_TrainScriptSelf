function UnioSignIn()
{
    const SignInUrl = "https://act.10010.com/SigninApp/signin/daySign";
    const Cookies = $persistentStore.read("Uni_Cookie");
    if(Cookies==undefined)
    {
        $notification.post("联通签到-错误","","请先获取Cookies之后再试");
    }
    else
    {
        const Headers = {Cookie:Cookies};
        const PostParam = 
        {
            url:SignInUrl,
            headers:Headers
        }
        $httpClient.post(PostParam,function(err,res,data)
        {
            let SucessCode,FailedCode,ExpireCode,ReturnJsonData,StatusCode;
            SucessCode = "0000";
            FailedCode = "0002";
            ExpireCode = "0001";
            ReturnJsonData = JSON.parse(data);
            StatusCode  = ReturnJsonData.status;
            switch(StatusCode)
            {
                case SucessCode:
                    var SuccessData = ReturnJsonData.data;
                    var PrizeCount = SuccessData.prizeCount;
                    $notification.post("联通签到-成功","签到成功",`获得积分${PrizeCount}个`);
                    break;
                case FailedCode:
                    $notification.post("联通签到-重复","签到失败","您今天已经签到过啦");
                    break;
                case ExpireCode:
                    $notification.post("联通签到-Cookies过期","","您的Cookies已过期,请重新更新Cookie");
                    break;
                default:
                    $notification.post("联通签到-未知错误","","请打开控制台,查看log日志");
                    console.log(data);
            }
        })
    }

}
UnioSignIn();
