function Ten_Street_Beans()
{
    const TenStreetSignInUrl = "https://api.m.jd.com/api?";
    const FunctionID = "functionId=userSignIn";
    const Body = 'body={"activityId":"8d6845fe2e77425c82d5078d314d33c5"}';
    const Appid = 'appid=swat_miniprogram';
    const FinalUrl = encodeURI(`${TenStreetSignInUrl}${FunctionID}&${Body}&${Appid}`);
    const Cookies = $persistentStore.read("Gen_Cookie_Key");
    if(Cookies!=undefined)
    {
        const HeadersWithCookies = 
    {
        "cookie":Cookies,
        "Referer":"https://servicewechat.com/wxa5bf5ee667d91626/107/page-frame.html",
        "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.18(0x17001229) NetType/WIFI Language/zh_CN"
    }
        const FullPar = 
        {
            url:FinalUrl,
            headers:HeadersWithCookies
        }
        $httpClient.get(FullPar,function(error,response,data)
        {
            var StatusCode,JsonObj;
            JsonObj = JSON.parse(data);
            StatusCode = JsonObj.code;
            console.log("十元街Raw信息:"+data);
            if(StatusCode==0)
            {
                let BeansNum = JsonObj.data["beanTotalNum"]
                $notification.post("十元街领豆子-成功","签到成功","获得豆子:"+BeansNum + "个");
            }
            else if(StatusCode==81)
            {
                $notification.post("十元街领豆子-提示","","请勿重复签到");
            }
            else
            {
                $notification.post("十元街领豆子-失败","您的Cookie信息可能已过期,请重新获取","Warning");
            }
        })
    }
    else
    {
        $notification.post("十元街领豆子-错误","请先获取您的京东Cookie再试","");
    }
    
}
Ten_Street_Beans()
