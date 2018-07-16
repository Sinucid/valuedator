import warnings from "./data/innerWarn.js";
import chks from "./data/innerChks";

function testData(value, chk, i){
    
    if (process.env.NODE_ENV === 'development') {

        let correctData = true;

        for (let key in chks[chk]){

            if (chks[chk][key](value)) {

                correctData = false;
                let index = i !== undefined ? " in an array element [" + i + "]," : "";
                console.warn("DATA ERROR:" + index + "\r\n" + warnings[key])
                
            }

        }
        
        return correctData;

    }

    return true;

}
    
export default testData;