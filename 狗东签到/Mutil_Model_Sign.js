function Daily_Sign()//狗东_签到模块_每日签到
{


    const Sign_Url = "https://106.39.171.220/client.action?functionId=signBeanIndex";
    const ReadStore_Cookie = $persistentStore.read("Gen_Cookie_Key")
    console.log(ReadStore_Cookie);
    if(ReadStore_Cookie!=undefined)
    {
        const UserCookie = ReadStore_Cookie;
        var Jd_Host,Jd_Content,Jd_Params,Data_Body,Data_Openudid,Data_Sign,Data_Client,Data_Version,Data_St,Data_Sv,PostData,PostHeaders
        Jd_Host = 'api.m.jd.com';
        Jd_Content = "application/x-www-form-urlencoded";
        Data_Body = `body={"jda":"-1","monitor_source":"bean_app_bean_index","shshshfpb":"","fp":"-1","eid":"","shshshfp":"-1","monitor_refer":"","userAgent":"-1","rnVersion":"4.0","shshshfpa":"-1","referUrl":"-1"}`;
        Data_Openudid = "openudid=93c7ecf5b4a0c8a41249b9a8d47b52900b8a87f9";
        Data_Sign = "sign=1b9fa20b49b070a6f0fa9b90e0379b64";
        Data_Client = "client=apple";
        Data_Version = "clientVersion=9.2.2";
        Data_St = "st=1605575394102";
        Data_Sv="sv=101";
        PostData = `${Data_Body}&${Data_Openudid}&${Data_Sign}&${Data_Client}&${Data_Version}&${Data_St}&${Data_Sv}`;
        PostHeaders = 
    {
        'cookie':UserCookie,
        'Host':Jd_Host,
        'Content-Type':Jd_Content,
        'User-Agent':'JD4iPhone/167422 (iPhone; iOS 13.5.1; Scale/2.00)'
    }
    Jd_Params = 
    {
        url:Sign_Url,
        headers:PostHeaders,
        body:PostData
        //计划将headers和body写入Store,供其他模块调用
    }
    $httpClient.post(Jd_Params,function(error,response,data)
    {
        if(data==null)
        {
            $notification.post("狗东签到脚本-无响应","可能是网络或者数据原因","");
        }
        else
        {
            let ReturnDataObj = JSON.parse(data);
            let StatusCode,SignStatus,DailyInfo,BeansCount,notifyMessage
            StatusCode = ReturnDataObj.code;
            if(StatusCode=="0")
            {
                SignStatus = ReturnDataObj.data.status;
                if(SignStatus=="1")
                {
                    DailyInfo = ReturnDataObj.data.dailyAward;
                    BeansCount = DailyInfo.beanAward.beanCount;
                    notifyMessage = `获得狗东豆子:${BeansCount}个`;
                    $notification.post("狗东签到脚本-成功","签到成功",notifyMessage);
                }
                else
                {
                    $notification.post("狗东签到脚本-失败","重复签到","你今天已经签到过了");
                }
               
                console.log("狗东RAW调试信息:"+data);
            }
            else if(StatusCode=="3")
            {
                $notification.post("狗东签到脚本-Cookie过期","","您的Cookie已过期，请重新获取");
            }
            else
            {
                $notification.post("狗东签到脚本-未知错误","请联系作者提供LOG日志",);
                console.log("错误输出:\n"+data);
            }
        }
        //一些高频重用字符串,也可以考虑加入Store
    })
    }
    else
    {
        $notification.post("狗东签到脚本-读取通用Cookies失败","","请重新获取Cookies");
    }
    
}
Daily_Sign()//需要关闭模块请在最前面加上//即可
function Ten_Street_Beans()//十元街领豆子
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
Ten_Street_Beans()//需要关闭请在前面加上//
