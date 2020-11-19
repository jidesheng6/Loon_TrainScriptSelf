const DevApiKey = "4cb4f60d3a6045c48da6adbbe988b4ed";
const SearchCityUrl = "https://geoapi.qweather.com/v2/city/lookup?";
const NowWeatherUrl = "https://devapi.qweather.com/v7/weather/now?"

function GetCityLocalId(CityName)
{
    CityName = encodeURI(CityName);
    GetQueryPar = `location=${CityName}&key=${DevApiKey}`;
    let FullUrl = SearchCityUrl + GetQueryPar;
    $httpClient.get(FullUrl,function(err,response,data)
    {
        var JsonObj = JSON.parse(data);
        const DataTree = JsonObj.location;
        const LocationId = DataTree.id;
        const statusCode = JsonObj.code;
        if(statusCode!=200)
        {
            console.log("API出错,调试信息如下:\n"+data);
        }
        else
        {
            console.log("写入城市ID成功");
            $persistentStore.write(LocationId,"id");
        }
        
    })
}
console.log("死马APP喜欢搞心态是吧")
function GetWeatherInfo()
{
    const SearchCity=$persistentStore.read("NowLocation");
    if(SearchCity==undefined)
    {
        $notification.post("获取位置信息失败","","请使用云闪付APP获取位置后重试");
    }
    else
    {
        GetCityLocalId(SearchCity)//StoreId:id
        const LocaltionID = $persistentStore.read("id");
        const QueryPar = `location=${LocaltionID}&key=${DevApiKey}`;
        const FullGetUrl = NowWeatherUrl + QueryPar;
        console.log(FullGetUrl);
        $httpClient.get(FullGetUrl,function(error,response,data)
        {
            console.log(error);
            console.log(data);
            let JsonReturn = JSON.parse(data);
            const NowJson = JsonReturn.now;
            console.log(NowJson)
            const Now_Tmp = NowJson.temp;
            const Now_FeelTmp = NowJson.feelsLike;
            const Now_text = NowJson.text;
            const Now_WindDir = NowJson.windDir;
            const Now_WindLev = NowJson.windScale;
            const Now_humidity = NowJson.humidity;
            const TempIcon = "℃";
            const NofityMessage = 
            `🌏您的城市当前天气情况为:${Now_text}\n☁️当前温度:${Now_Tmp}${TempIcon}\n🌟体感温度:${Now_FeelTmp}${TempIcon}\n🌠风向:${Now_WindDir}风 风力${Now_WindLev}级\n💨相对湿度${Now_humidity}%`
            $notification.post("和风天气API-实况天气💥",``,NofityMessage);
            console.log("\n和风天气API调试信息:"+data);
    })
   }
}
GetWeatherInfo()
