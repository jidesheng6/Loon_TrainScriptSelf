const DevApiKey = "4cb4f60d3a6045c48da6adbbe988b4ed";
const SearchCityUrl = "https://geoapi.qweather.com/v2/city/lookup?";
const NowWeatherUrl = "https://devapi.qweather.com/v7/weather/now?"

function GetCityLocalId(CityName)
{
    //CityName = escape(CityName);
    GetQueryPar = `location=${CityName}&key=${DevApiKey}`;
    let FullUrl = SearchCityUrl + GetQueryPar;
    $httpClient.get(FullUrl,function(err,response,data)
    {
        var JsonObj = JSON.parse(data);
        const DataTree = JsonObj;
        const statusCode = JsonObj.code;
        console.log(JsonObj);
        
    })
}

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
        $httpClient.get(FullGetUrl,function(error,response,data)
        {
            let JsonReturn = JSON.parse(data);
            const NowJson = JsonReturn.now;
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
//GetWeatherInfo()
