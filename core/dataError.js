import chks from "./innerChks.js";

function dataErrorChk(item, chk){
    
    var warn_arr = [];

    if (chk === undefined) {

        for (var prop in item) {

            if (prop in chks) {

                for (var key in chks[prop]){

                    if (chks[prop][key](item[prop])) {
        
                        warn_arr.push(key);
                                    
                    }
        
                }

            }

        }

    } else {

        for (var key in chks[chk]){

            if (chks[chk][key](item)) {

                warn_arr.push(key);
                            
            }

        }

    }

    if (warn_arr.length > 0 && process.env.NODE_ENV === 'development') {

        return warn_arr;

    }

    return true;

}
    
export default dataErrorChk;