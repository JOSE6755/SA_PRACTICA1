import { useState, useEffect } from "react";
import SOAPrequest from "./SOAP";
function Countries_list() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const request = async () => {
      const result = await SOAPrequest();
      if (result) {
        setCountries(result);
        console.log(result);
      }
    };
    request();
  }, []);
  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.length > 0 ? (
          countries.map((e, index) => {
            return (
              <li key={index}>
                {e["m:tLanguage"].children[1]["m:sName"].content}
              </li>
            );
          })
        ) : (
          <h1>Cargando...</h1>
        )}
      </ul>
    </div>
  );
}

export default Countries_list;
