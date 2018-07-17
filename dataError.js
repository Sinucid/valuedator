import chks from "./data/innerChks";

function dataErrorChk(value, chk){
    
    if (process.env.NODE_ENV === 'development') {

        for (let key in chks[chk]){

            if (!hasError && chks[chk][key](value)) {

                return {warn : key};
                            
            }

        }
        
    }

    return false;

}
    
export default dataErrorChk;