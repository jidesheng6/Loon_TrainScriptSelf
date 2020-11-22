function Lotty()//每日签到
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
                default:
                    $notification.post("京东-每日抽奖","","发生未定义错误,请查看Log日志");
                    console.log(data);
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
                default:
                    $notification.post("京东-每日抽奖","","发生未定义的错误代码,请查看日志");
                    console.log(data);
            }
        }

        }
        else
        {
            $notification.post("京东-每日抽奖","","您的Cookie已过期");
        }
        
    })
}
