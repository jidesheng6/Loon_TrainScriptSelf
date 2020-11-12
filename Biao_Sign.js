//腕表之家-IOS登陆协议
//由于设备的原因，腕表之家的消息体无法在本脚本上进行解密(希望loon作业可以添加解密库的支持)

function SignMain()
{
   var SignUrl="https://ios.xbiao.com/apps/Xbiao/ios-Xbiao-7_6-iPhone8_1-750_1334/sign/today"
   var UserCookies=
     {
      "cookie":"userid=3718082; userkey=6f7ac336add7d3a41ed48398445bb17a; PHPSESSID=nu1da1licjcr8kdfrqnhp8obo0; publicKey=5BJ3e%2BkjDdAIy9gEvnJasIRXqZFnjfTG3Om4ER%2FTcz4%3D; BIGipServerxbiao-ios=566759178.20480.0000"
     }//请在cookie后面的内容中替换为抓包得到的cookie值

//签到开始
  var GetPar={
    url:SignUrl,
    header:UserCookies
   }
$httpClient.get(GetPar,function(error,response,data)
{
var StatusCode=response.status
var Status_Notify={Success:"签到成功，因为技术原因无法解密数据段，请谅解",Falied:"签到失败，请查看log文件"}
//console.log(response.status==)
if(StatusCode==200)
{
$notification.post("提示","腕表之家",Status_Notify.Success)
}
else
{
console.log("腕表之家发生异常:\n"+data)
$notification.post("提示","腕表之家",Status_Notify.Falied)
}
}
)
}
SignMain()
