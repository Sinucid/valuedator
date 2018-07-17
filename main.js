import chk from "./chks.js";
import dataError from "./dataError";
import style_default from "./data/stylesDefault.js";
import func from "./func.js";
import patterns from "./data/patterns.js";
import message_default from "./data/errorMsgDefault.js";

function Valuedator(){

    // let index = i !== undefined ? " in an array element [" + i + "]," : "";
    // console.warn("DATA ERROR:" + index + "\r\n" + )
    this.config = {

        errorInputClass : "",
        errorMessageClass : "",
        message : message_default,

    }

    let _conf = this.config;

    this.validate = function(valarr){

        let noError = true,
            hasStyles = false;
            
        if (chk.valArr(valarr)) {
            
            clearErrorDiv();

            for (let i = 0; i < valarr.length; i++){

    
                // if (chk.arrItem(item)) {
                    
                //     if (func.isObject(item)) {

                //         clearErrorInput(item);
                    
                //         if (!chk.value(item.value)) {

                //             errorMsg = _conf.message.required;
            
                //         } else {

                //             if ("pattern" in item) {

                //                 if (!chk.pattern(item.value, item.pattern)) {

                //                     if (typeof item.pattern === "string" && item.pattern in patterns) {

                //                         errorMsg = _conf.message[item.pattern];

                //                     } else {

                //                     errorMsg = _conf.message.pattern; 

                //                     }

                //                 }    

                //             } else if ("number" in item) {

                //                 if (!chk.number(item.value, item.number)) {

                //                     errorMsg = _conf.message.number;

                //                 }    

                //             } else if ("chars" in item) {

                //                 if (!chk.chars(item.value, item.chars)) {

                //                     errorMsg = _conf.message.chars;

                //                 }    
                //             }

                //         }

                //         if (errorMsg !== ""){

                //             if ("message" in item && chk.message(item.message)) {

                //                 errorMsg = item.message;

                //             }

                //             noError = false;

                //             if ("errorInput" in item) {

                //                 if (chgStylesInput(item.errorInput)) {
                //                     hasStyles = true;
                //                 }
                                    
                //             }

                //             if ("errorDiv" in item) {

                //                 if (chgStylesMessage(item.errorDiv, errorMsg)) {
                //                     hasStyles = true;
                //                 }
                                                            
                //             }

                //         }
                                                                
                //     } else {

                //         if (!chk.value(item)) {
                            
                //             noError = false;
                //             break;

                //         }

                //     } 
                // }

            }

            if (!hasStyles && !noError) {

                alert(_conf.message.alert);

            }

        } 

        function chgStylesInput(obj){

            // if (!dataError(obj, "errorStyleInput")) {
    
            //     return false;
    
            // }
    
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
    
            // if (!dataError(obj, "errorStyleMessage")) {
    
            //     return false;
    
            // }
    
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
            divs.forEach(div => {

                div.parentNode.removeChild(div);

            })

        }

        function createWarning(msg){


        }

        return noError;
    }
}

let valuedator = new Valuedator;

export default valuedator;