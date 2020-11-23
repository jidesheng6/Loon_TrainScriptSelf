const Cookies = $persistentStore.read("Gen_Cookie_Key");
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
if(Cookies!=undefined)
{
    async function AsyncFun()
    {
        Gold_Rong();//金融任务
        await Get_DoubleSign();//领取双签奖励
    }
    AsyncFun()

}
else
{
    $notification.post("京东签到系列Cookie-错误","","请先获取cookie再试");
}
