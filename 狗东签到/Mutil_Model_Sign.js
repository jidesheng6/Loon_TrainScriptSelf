const Cookies = $persistentStore.read("Gen_Cookie_Key");
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
function Gold_Rong()
{
    const PostBody = "reqData=%7B%22channelSource%22%3A%22JRAPP6.0%22%2C%22riskDeviceParam%22%3A%22%7B%5C%22sdkToken%5C%22%3A%5C%22WS2YW6KWOWTHABGXXH7T44MYBUX6Y6GDSRGD5NPHUFRP57EF42QBM5YWRUJTXEFHYSJDVZ2P6RIM6%5C%22%7D%22%7D%0A";
    const Golden_url = "https://ms.jr.jd.com/gw/generic/hy/h5/m/signIn1";
    if(Cookies!=undefined)
    {
        const Headers = 
        {
            "cookie":Cookies
        }
        
        const PostPar = 
        {
            url:Golden_url,
            headers:Headers,
            body:PostBody
        }
        $httpClient.post(PostPar,function(error,res,data)
        {
            let ResultObj,ReesultData,ResBusCode,ResCode;
            ResultObj = JSON.parse(data);
            ResCode = ResultObj.resultCode;
            if(ResCode!=3)
        {
            ReesultData = ResultObj.resultData;
            ResBusCode = ReesultData.resBusiCode;
            switch(ResBusCode)
            {
                case 0:
                    $notification.post("狗东金融-成功","狗东金融","任务成功");
                    Get_DoubleSign();
                    
                    break;
                case 15:
                    $notification.post("狗东金融-提示","狗东金融","请勿重复执行任务");
                    break;
                case 20:
                    $notification.post("狗东金融-提示","狗东金融","请实名后再试");
                    break;
                default:
                    $notification.post("狗东金融-错误","未知错误","请联系作者");
                    console.log("狗东金融调试信息:"+data);
            }

        }
            else
            {
                $notification.post("狗东筋肉-您的Cookie已过期","","请更新您的cookie");
            }
            
        });
    }
    else
    {
        $notification .post("狗东金融-错误","","请先获取Cookie");
    }
    //return 3;
}
function Get_DoubleSign()
{
    const GetBeansFlag = "000sq";
    const ErrorFlag = "300sq";
    const DoubleApiUrl = "https://nu.jr.jd.com/gw/generic/jrm/h5/m/process";
    const PostData = 
    `reqData=%7B%22actCode%22%3A%22F68B2C3E71%22%2C%22type%22%3A4%2C%22frontParam%22%3A%7B%22belong%22%3A%22jingdou%22%7D%2C%22riskDeviceParam%22%3A%22%7B%5C%22fp%5C%22%3A%5C%22926a77dd86340ed62f72a7cc40608078%5C%22%2C%5C%22eid%5C%22%3A%5C%22RA5DKAYILXFNSJOXT35HTO7TNFOYJAJTO3KD54T72AW3CHROZ7QFH6F2SMHRSDFUINJH3QI2TEBTTN4H3E7LC6LS6E%5C%22%7D%22%7D%0A%0A`
    const Headers = {"cookie":Cookies}
    const PostPar = 
    {
        url:DoubleApiUrl,
        headers:Headers,
        body:PostData
    }
    $httpClient.post(PostPar,function(error,res,data)
    {
        var ReturnJsonData = JSON.parse(data);
        var ResultCode = ReturnJsonData.resultCode;
        if(ResultCode!=3)
        {
            var ReturnData,StatusCode,BussinessDta;
        ReturnData = ReturnJsonData.resultData.data;
        BussinessDta = ReturnData.businessData;
        StatusCode = BussinessDta.businessCode;
        if(StatusCode==GetBeansFlag)
        {
            let Msg = BussinessDta.businessData.awardListVo[0].name;
            $notification.post("狗东双签-领取成功","","获得"+Msg);
        }
        else if(StatusCode==ErrorFlag)
        {
            $notification.post("狗东双签-失败","","今天已经领取过啦");
        }
        else
        {
            $notification.post("狗东双签-错误","","未知的错误");
        }
        }
        else
        {
            $notification.post("狗东双签-Cookie已过期","","请更新Cookie");
        }
        
    })
}
function Lotty()//每日抽奖
{
    const LottyUrl = 'https://api.m.jd.com/client.action?functionId=lotteryDraw&body=%7B%22actId%22%3A%22jgpqtzjhvaoym%22%2C%22appSource%22%3A%22jdhome%22%2C%22lotteryCode%22%3A%22wupll7s766xme4p63iqis3e5z2olgso5cosvj7bm5cszrxjcj5rpe4lg4ba6nhb6hiawzpccizuck%22%7D&appid=ld';
    const Cookie = $persistentStore.read("Gen_Cookie_Key");
    const Headers = {cookie:Cookie};
    const Par = 
    {
        url:LottyUrl,
        headers:Headers,
    }
    $httpClient.get(Par,function(error,res,data)
    {
        var ReturnJsonDat = JSON.parse(data);
        if(ReturnJsonDat.code!="3")
        {
            if(typeof(ReturnJsonDat.errorCode)!=undefined)
        {
            let ReturnErrorCode = ReturnJsonDat.errorCode;
            switch(ReturnErrorCode)
            {
                case "T215":
                    $notification.post("京东-每日抽奖","","今日抽奖次数已用光");
                    break;
                case "T210":
                     $notification.post("京东-每日抽奖","","请开启您的支付密码再试");
                     break;
                default:
                    $notification.post("京东-每日抽奖","","发生未定义错误,请查看Log日志");
                    console.log("抽奖调试信息："+data);
            }
        }
        else
        {
            var InfoData = ReturnJsonDat.data;
            var winnerInfo = InfoData.isWinner;
            switch(winnerInfo)
            {
                case "1":
                    $notification.post("京东-每日抽奖","","很抱歉没有中奖哦");
                    break;
                case "0":
                    var PrizeName = InfoData.prizeName
                    $notification.post("京东-每日抽奖","",`获得${PrizeName}`);
                    break;
                default:
                    $notification.post("京东-每日抽奖","","发生未定义的错误代码,请查看日志");
                    console.log("抽奖调试信息："+data);
            }
        }

        }
        else
        {
            $notification.post("京东-每日抽奖","","您的Cookie已过期");
        }
        
    })
}
if(Cookies!=undefined)
{
    /*async function AsyncFun()
    {
        Daily_Sign()//需要关闭模块请在最前面加上//即可
        await Gold_Rong();//金融任务
        Ten_Street_Beans()//需要关闭请在前面加上//
        await Get_DoubleSign();//领取双签奖励
    }*/
    let func = new Promise(function(resolve,reject)
                           {
        Daily_Sign();
        Gold_Rong();
        Ten_Street_Beans();
        Lotty();
        resolve();
    })
}
else
{
    $notification.post("京东签到系列Cookie-错误","","请先获取cookie再试");
}
