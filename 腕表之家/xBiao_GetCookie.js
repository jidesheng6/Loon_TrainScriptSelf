function GetHeadersCookie()
{
    var RawCookieStr = unescape($request.headers["Cookie"]);
    $persistentStore.write(RawCookieStr,"RawCookie");
}
function SubCookieInfo()
{
    const RegexStr_Userid = /userid=\d+?;/
    const RegexStr_UserKey = /userkey=.+?(;|\S+)/
    GetHeadersCookie();
    var StoreCookie = $persistentStore.read("RawCookie").trim();
    var UserId = RegexStr_Userid.exec(StoreCookie)[0];
    var UserKey = RegexStr_UserKey.exec(StoreCookie)[0];
    var FinalCookieStr = UserId + UserKey+";";
    if(UserId!=null&&UserKey!=null)
    {
        $notification.post("腕表之家","Cookie获取成功,请打开log日志进行复制","");
        console.log("\n\n\n请复制您的Cookie信息填入本地JS文件:\n\n\n"+FinalCookieStr);
    }
    else
    {
        $notification.post("腕表之家-错误","Cookie获取失败-请重试","");
    }
}
SubCookieInfo()
//http-request表达式:^https?:\/\/ios\.xbiao\.com.+?\/set
//MITM域名:*.xbiao.com
:smile:

