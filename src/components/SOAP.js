import axios from "axios";
import { convertXML } from "simple-xml-to-json";
async function SOAPrequest() {
  const options = {
    method: "POST",
    url: "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso",
    headers: {
      "Content-Type": "text/xml",
    },
    data:
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body><ListOfLanguagesByName xmlns="http://www.oorsprong.org/websamples.countryinfo"></ListOfLanguagesByName></soap:Body></soap:Envelope>',
  };

  try {
    const response = await axios.request(options);
    const json = convertXML(response.data);
    console.log(
      json["soap:Envelope"].children[0]["soap:Body"].children[0][
        "m:ListOfLanguagesByNameResponse"
      ].children[0]["m:ListOfLanguagesByNameResult"].children
    );

    return json["soap:Envelope"].children[0]["soap:Body"].children[0][
      "m:ListOfLanguagesByNameResponse"
    ].children[0]["m:ListOfLanguagesByNameResult"].children;
  } catch (error) {
    console.error(error);
  }
}

export default SOAPrequest;
