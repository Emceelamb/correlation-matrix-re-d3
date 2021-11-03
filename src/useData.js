import { useState, useEffect } from "react";
import { csv } from "d3";

const useData = (csvUrl) => {
  const [data, setData] = useState();

  useEffect(() => {
    csv(csvUrl).then((rows)=>{
    let longData = []
    rows.forEach((d)=>{
      let x = d["SYMBOL"].toUpperCase().split('_')[0]

      for(let prop in d){
        let y = prop.toUpperCase().split('_')[0]
        let value = d[prop]
        if(prop!=="SYMBOL"){
          longData.push({x:x, y:y, value: +value})
        }
      }
    })
      return longData
    }).then(setData);
  }, [csvUrl]);

  return data;
};

export { useData };
