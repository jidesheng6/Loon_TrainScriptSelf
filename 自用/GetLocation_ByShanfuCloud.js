function GetLocation()
{
    var YunShanFuFlag = $request.headers["X-Tingyun-Id"];
    console.log($request.headers);
    if(typeof(YunShanFuFlag)!=undefined)
    {
    const CatchYunShanFuResponse = JSON.parse($response.body);
    const RegeoDetail = CatchYunShanFuResponse.regeocode;
    const LocationInfo = RegeoDetail.addressComponent;
    const StreetInfo = LocationInfo.streetNumber;
    const SaveStoreVar = LocationInfo.district;
    var StreetNumber,StreetName,DetailsLocation,FinalMessage;
    StreetNumber = StreetInfo.number;
    StreetName=StreetInfo.street;
    DetailsLocation = RegeoDetail["pois"][0].name;
    FinalMessage = `您当前所在位置为${SaveStoreVar}${StreetName}${StreetNumber}${DetailsLocation}`;
    $notification.post("云闪付通知","信息获取成功",FinalMessage);
    $persistentStore.write(SaveStoreVar,"NowLocation");
    console.log("位置信息写入成功");
    }
    else
    {
        //
    }
}
GetLocation()
//^https:\/\/restapi.amap.+
