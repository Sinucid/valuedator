import chk from "./chks.js";
import testData from "./testData";
import style_default from "./data/stylesDefault.js";
import func from "./func.js";
import patterns from "./data/patterns.js";
import message_default from "./data/errorMsgDefault.js";

function Valuedator(){

    this.config = {

        errorInputClass : "",
        errorDivClass : "",
        message : message_default,

    }

    this.item_index = 0;

    let this_valuedator = this;
    let _conf = this.config;

    this.validate = function(valarr){

        let noError = true,
            hasStyles = false;
            
        if (chk.valArr(valarr)) {
            
            clearErrorDiv();

            for (let i = 0; i < valarr.length; i++){

                let errorMsg = "",
                    item = valarr[i];
                    
    
                if (chk.arrItem(item, i)) {
                    
                    if (func.isObject(item)) {

                        clearErrorInput(item);
                    
                        if (!chk.value(item.value, i)) {

                            errorMsg = _conf.message.required;
            
                        } else {

                            if ("pattern" in item) {

                                if (!chk.pattern(item.value, item.pattern, i)) {

                                    if (typeof item.pattern === "string" && item.pattern in patterns) {

                                        errorMsg = _conf.message[item.pattern];

                                    } else {

                                    errorMsg = _conf.message.pattern; 

                                    }

                                }    

                            } else if ("number" in item) {

                                if (!chk.number(item.value, item.number, i)) {

                                    errorMsg = _conf.message.number;

                                }    

                            } else if ("chars" in item) {

                                if (!chk.chars(item.value, item.chars, i)) {

                                    errorMsg = _conf.message.chars;

                                }    
                            }

                        }

                        if (errorMsg !== ""){

                            if ("message" in item && chk.message(item.message, i)) {

                                errorMsg = item.message;

                            }

                            noError = false;

                            if ("errorInput" in item) {

                                if (chgStylesInput(item.errorInput, i)) {
                                    hasStyles = true;
                                }
                                    
                            }

                            if ("errorDiv" in item) {

                                if (chgStylesDiv(item.errorDiv, errorMsg, i)) {
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

                this_valuedator.item_index = i;

            }

            if (!hasStyles && !noError) {

                alert(_conf.message.alert);

            }

        } 

        function chgStylesInput(obj, i){

            if (!testData(obj, "errorStyle", i)) {
    
                return false;
    
            }
    
            let elem = obj.elem instanceof HTMLElement ? obj.elem : document.querySelector(obj.elem);
    
            if ("cls" in obj) {
    
                elem.classList.add(obj.cls);
    
            } else {
    
                func.mergeObj(false, elem.style, style_default.input);
    
                // Object.assign(elem.style, style_default.input);
    
            }
    
            return true;
    
        };

        function chgStylesDiv(obj, msg, i){
    
            if (!testData(obj, "errorStyle", i)) {
    
                return false;
    
            }
    
            let elem, div;
    
            if ("elem" in obj) {
    
                elem = obj.elem;
    
            } else if ("before" in obj) {
    
                elem = obj.before;
                
            } else if ("container" in obj) {
    
                elem = obj.container;
    
            }
    
            elem = elem instanceof HTMLElement ? elem : document.querySelector(elem);
    
            div = document.createElement("div");
            div.className = "errormsg-div"
            div.innerText = msg;
    
            if ("cls" in obj) {
    
                div.classList.add(obj.cls);
    
            } else {
    
                func.mergeObj(false, div.style, style_default.div);
    
                // Object.assign(div.style, style_default.div);
    
            }
    
            elem.parentNode.insertBefore(div, elem.nextSibling);
    
            return true;
    
        }

        function clearErrorInput(item){
            
            if ("errorInput" in item && "elem" in item.errorInput) {
                
                let elem = item.errorInput.elem instanceof HTMLElement ? 
                    item.errorInput.elem : 
                    document.querySelector(item.errorInput.elem);

                if ("cls" in item.errorInput) {

                    elem.classList.remove(item.errorInput.cls)

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

        return noError;
    }
}

let valuedator = new Valuedator;

export default valuedator;