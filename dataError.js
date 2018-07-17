import chks from "./innerChks";

function dataErrorChk(item, chk){
    
    let warn_arr = [];

    if (chk === undefined) {

        for (let prop in item) {

            if (prop in chks) {

                for (let key in chks[prop]){

                    if (chks[prop][key](item[prop])) {
        
                        warn_arr.push(key);
                                    
                    }
        
                }

            }

        }

    } else {

        for (let key in chks[chk]){

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