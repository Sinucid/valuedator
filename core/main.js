import chk from "./chks.js";
import dataErrorChk from "./dataError.js";
import func from "./func.js";
import style_default from "./../data/stylesDefault.js";
import message_default from "./../data/errorMsgDefault.js";
import warn_message from "./../data/innerWarn.js";

function Valuedator(){

    this.config = {

        errorInputClass : "",
        errorMessageClass : "",
        messages : message_default,
        style_default,

    }

    var _conf = this.config;

    function chkData(callback, opt_arr, i) {

        var result = callback.apply(null, opt_arr);

        if (typeof result === "boolean") {

            return result;

        }

        var warn_msg = "";

        for (var j = 0; j < result.length; j++) {

            warn_msg += (j + 1) + ":" + warn_message[result[j]] + "\r\n";

        }

        var index = i !== undefined ? " in an array element [" + i + "]," : "";
        console.warn("DATA ERROR:" + index + "\r\n" + warn_msg)

        return false;

    }

    this.validate = function(valarr){

        if (!chkData(dataErrorChk, [valarr, "valarr"])) {

            return true;

        }

        var noError = true,
            hasStyles = false;
                 
        clearErrorDiv();

        for (var i = 0; i < valarr.length; i++){

            var errorMsg = "",
                    item = valarr[i];

            if (!chkData(dataErrorChk, [item, "item"], i)) {

                continue;

            }

            if (func.isObject(item)) {

                if (!chkData(dataErrorChk, [item], i)) {

                    continue;
    
                }

                for (var param in item) {

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

                    if ("messageText" in item) {

                        errorMsg = item.messageText;

                    }

                    noError = false;

                    if (addErrorStyles(item, errorMsg, _conf)){

                        hasStyles = true;

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

    function addErrorStyles(item, message, config){

        var hasStyles = false;

        if ("errorInput" in item) {

            var obj = item.errorInput,
                cls_i,
                elem_i = obj.elem instanceof HTMLElement ? obj.elem : document.querySelector(obj.elem);
    
            if ("cls" in obj) {
    
                cls_i = obj.cls;
    
            } else if (config.errorInputClass !== "") {
    
                cls_i = config.errorInputClass;
    
            }
    
            if (cls_i) {
    
                elem_i.classList.add(cls_i);
    
            } else {
    
                func.mergeObj(false, elem_i.style, config.style_default.input);
    
            }

            (function(){
                
                elem_i.addEventListener("focusin", clearStyles);

                function clearStyles($event){

                    if (cls_i) {

                        elem_i.classList.remove(cls_i)
        
                    } else {
        
                        elem_i.style = "";
        
                    }

                    elem_i.removeEventListener("focusin", clearStyles);

                }

            })();

            hasStyles = true;

        }

        if ("errorMessage" in item) {

            var obj = item.errorMessage,
                elem_m, div_m, cls_m;
    
            if ("before" in obj) {
    
                elem_m = obj.before;
                
            } else if ("container" in obj) {
    
                elem_m = obj.container;
    
            }
    
            elem_m = elem_m instanceof HTMLElement ? elem_m : document.querySelector(elem_m);
    
            div_m = document.createElement("div");
            div_m.className = "errormsg-div"
            div_m.innerText = message;
    
            
            if ("cls" in obj) {
    
                cls_m = obj.cls;
    
            } else if (config.errorMessageClass !== "") {
    
                cls_m = config.errorMessageClass;
    
            }
    
            if (cls_m) {
    
                div_m.classList.add(cls);
    
            } else {
    
                func.mergeObj(false, div_m.style, config.style_default.message);
    
            }
    
            if ("before" in obj) {
    
                elem_m.parentNode.insertBefore(div_m, elem_m.nextSibling);
    
            } else if ("container" in obj){
    
                elem_m.appendChild(div);
    
            }
    
            hasStyles = true;

        }

        return hasStyles;

    }

    function clearErrorDiv(){
        
        var divs = document.querySelectorAll(".errormsg-div");

        if (divs) {
            divs.forEach(div => {

                div.parentNode.removeChild(div);

            })
        }
        
    }

}

var valuedator = new Valuedator;

export default valuedator;