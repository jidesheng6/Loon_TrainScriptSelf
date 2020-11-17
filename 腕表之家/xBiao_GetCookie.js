function GetHeadersCookie()
{
    var RawCookieStr = unescape($request.headers["Cookie"]);
    $persistentStore.write(RawCookieStr,"RawCookie");
}/*食用方法:打开腕表之家，点击个人资料，然后点击保存，就可以获取到Cookie，此时禁用笨脚本就ok了*/
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
        $notification.post("腕表之家","Cookie获取成功","");
        $persistentStore.write(FinalCookieStr,"Xbiao_cookie");
        console.log(FinalCookieStr);
        //console.log("\n\n\n请复制您的Cookie信息填入本地JS文件:\n\n\n"+FinalCookieStr);
    }
    else
    {
        $notification.post("腕表之家-错误","Cookie获取失败-请重试","");
    }
}
SubCookieInfo()
//http-request表达式:^https?:\/\/ios\.xbiao\.com.+?\/set
//MITM域名:*.xbiao.com


