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
        $notification.post("���֮��","Cookie��ȡ�ɹ�,���log��־���и���","");
        console.log("\n\n\n�븴������Cookie��Ϣ���뱾��JS�ļ�:\n\n\n"+FinalCookieStr);
    }
    else
    {
        $notification.post("���֮��-����","Cookie��ȡʧ��-������","");
    }
}
SubCookieInfo()
//http-request���ʽ:^https?:\/\/ios\.xbiao\.com.+?\/set
//MITM����:*.xbiao.com