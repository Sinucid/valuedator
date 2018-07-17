import chk from "./chks.js";
import dataErrorChk from "./dataError";
import style_default from "./data/stylesDefault.js";
import func from "./func.js";
import patterns from "./data/patterns.js";
import message_default from "./data/errorMsgDefault.js";
import warn_message from "./data/innerWarn.js";

function Valuedator(){

    this.config = {

        errorInputClass : "",
        errorMessageClass : "",
        message : message_default,

    }

    let _conf = this.config;

    function chkData(callback, opt_arr, i) {

        let result = callback.apply(null, opt_arr);

        if (typeof result === "boolean") {

            return result;

        }

        let warn_msg = "";

        for (let j = 0; j < result.length; j++) {

            warn_msg += (j + 1) + ":" + warn_message[result[j]] + "\r\n";

        }

        let index = i !== undefined ? " in an array element [" + i + "]," : "";
        console.warn("DATA ERROR:" + index + "\r\n" + warn_msg)

        return false;

    }

    this.validate = function(valarr){

        if (!chkData(dataErrorChk, [valarr, "valarr"])) {

            return true;

        }

        let noError = true,
            hasStyles = false;
                 
        clearErrorDiv();

        for (let i = 0; i < valarr.length; i++){

            let errorMsg = "",
                    item = valarr[i];

            if (!chkData(dataErrorChk, [item, "item"], i)) {

                continue;

            }

            if (func.isObject(item)) {

                if (!chkData(dataErrorChk, [item], i)) {

                    continue;
    
                }

                clearErrorInput(item);

                for (let param in item) {

                    if (!errorMsg) {

                        if (param in chk && !errorMsg) {

                            errorMsg = chk[param](item.value, item[param]);

                            if (typeof errorMsg === "string"){

                                errorMsg = message_default[errorMsg];

                            } if (typeof errorMsg === "boolean") {

                                errorMsg = "";

                            } else if (func.isObject(errorMsg) && "message" in errorMsg) {

                                errorMsg = errorMsg.message;

                            }

                        }

                    }         

                }

                if (errorMsg !== "") {

                    if ("message" in item) {

                        errorMsg = item.message;

                    }

                    noError = false;

                    if ("errorInput" in item) {

                        if (chgStylesInput(item.errorInput)) {
                            hasStyles = true;
                        }
                            
                    }

                    if ("errorDiv" in item) {

                        if (chgStylesMessage(item.errorDiv, errorMsg)) {
                            hasStyles = true;
                        }
                                                    
                    }

                }

            } else {

                if (!chk.value(item)) {
                        
                    noError = false;
                    break;
    
                }

            }
               
        }

        if (!hasStyles && !noError) {

            alert(_conf.message.alert);

        }

        return noError;

    }

    function chgStylesInput(obj){

        let cls,
            elem = obj.elem instanceof HTMLElement ? obj.elem : document.querySelector(obj.elem);

        if ("cls" in obj) {

            cls = obj.cls;

        } else if (_conf.errorInputClass !== "") {

            cls = _conf.errorInputClass;

        }

        if (cls) {

            elem.classList.add(cls);

        } else {

            func.mergeObj(false, elem.style, style_default.input);

        }

        return true;

    };

    function chgStylesMessage(obj, msg){

        let elem, div, cls;

        if ("before" in obj) {

            elem = obj.before;
            
        } else if ("container" in obj) {

            elem = obj.container;

        }

        elem = elem instanceof HTMLElement ? elem : document.querySelector(elem);

        div = document.createElement("div");
        div.className = "errormsg-div"
        div.innerText = msg;

        
        if ("cls" in obj) {

            cls = obj.cls;

        } else if (_conf.errorMessageClass !== "") {

            cls = _conf.errorMessageClass;

        }

        if (cls) {

            div.classList.add(cls);

        } else {

            func.mergeObj(false, div.style, style_default.div);

        }

        if ("before" in obj) {

            elem.parentNode.insertBefore(div, elem.nextSibling);

        } else if ("container" in obj){

            elem.appendChild(div);

        }

        return true;

    }

    function clearErrorInput(item){
        
        if ("errorInput" in item && "elem" in item.errorInput) {

            let cls,
                elem = item.errorInput.elem instanceof HTMLElement ? 
                item.errorInput.elem : 
                document.querySelector(item.errorInput.elem);

            if ("cls" in item) {

                cls = item.cls;

            } else if (_conf.errorInputClass !== "") {

                cls = _conf.errorInputClass;

            }

            if (cls) {

                elem.classList.remove(cls)

            } else {

                elem.style = "";

            }

        }

    };

    function clearErrorDiv(){
        
        let divs = document.querySelectorAll(".errormsg-div");

        if (divs) {
            divs.forEach(div => {

                div.parentNode.removeChild(div);

            })
        }
        
    }

}

let valuedator = new Valuedator;

export default valuedator;