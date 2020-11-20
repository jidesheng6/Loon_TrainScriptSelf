function Get_JD_GenCookie()
{
    const Raw_Cookies = $request.headers["Cookie"];
    const CookiePtKey_Index = Raw_Cookies.indexOf("pt_key");
    if(CookiePtKey_Index!=-1&&$request.url.indexOf("functionId")==-1)
    {
        console.log($request.url);
        $persistentStore.write(Raw_Cookies,"Gen_Cookie_Key");
        $notification.post("狗东-获取Cookie成功","","狗东Cookie写入成功,需要复制请打开log日志进行复制");
        console.log("狗东Cookie获取成功,请复制您的Cookie:"+Raw_Cookies);
    }
    else
    {
        console.log("非此API的Cookie,此Cookie无法在狗东金融通用");
    }
    $done();
}
Get_JD_GenCookie()
//MITM:api.m.jd.com
//REGEX:https:\/\/api.m.jd.com\/client.action
//StoreKey:Gen_Cookie_Key
