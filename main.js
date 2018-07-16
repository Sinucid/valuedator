import chk from "./chks.js";
import chgStyles from "./chgStyles.js";
import func from "./func.js";
import patterns from "./data/patterns.js";
import message_default from "./data/errorMsgDefault.js";

function Valuedator(){

    this.config = {

        errorInputClass : "",
        errorDivClass : "",

    }

    let _conf = this.config;

    this.validate = function(valarr){

        let noError = true,
            hasStyles = false;
            

        // let valarr = [
        //     value,
        //     {

        //         value : *, //variable
        //         number : [] //array
        //         chars : [], //array
        //         pattern : "", //regexp || string || (int types - email...)
        //         errorInput : {
        //             elem : "", //sel || obj
        //             cls : "" //string
        //         },
        //         errorDiv : {
        //             before : "", //sel || obj
        //             container : "", //sel || obj
        //             cls : "" //string
        //         },
        //         message : "", //string

        //     },
        // ];



        // let message_default_ru = {
        //     alert : "Ошибка ввода данных. Проверьте правильность введенной информации и заполнение обязательных полей.",
        //     required : "Обязательно к заполнению.",
        //     number : "Введите число.",
        //     number_1 : "Значение не входит в указанный диапазон.", 
        //     number_2 : "Значение не входит в указанный диапазон.", 
        //     chars_1 : "Количество символыаыва",
        //     chars_2 : "Количество символыаыва",
        //     email : "Ошибка формата электронной почты",
        //     pattern : "Содержимое ввода не соответсвует шаблону.",
        // }

        if (chk.valArr(valarr)) {
            
            clearErrorDiv();

            for (let i = 0; i < valarr.length; i++){

                let errorMsg = "",
                    item = valarr[i];
                    
    
                if (chk.arrItem(item, i)) {
                    
                    if (func.isObject(item)) {

                        clearErrorInput(item);
                    
                        if (!chk.value(item.value, i)) {

                            errorMsg = message_default.required;
            
                        } else {

                            if ("pattern" in item) {

                                if (!chk.pattern(item.value, item.pattern, i)) {

                                    if (typeof item.pattern === "string" && item.pattern in patterns) {

                                        errorMsg = message_default[item.pattern];

                                    } else {

                                    errorMsg = message_default.pattern; 

                                    }

                                }    

                            } else if ("number" in item) {

                                if (!chk.number(item.value, item.number, i)) {

                                    errorMsg = message_default.number;

                                }    

                            } else if ("chars" in item) {

                                if (!chk.chars(item.value, item.chars, i)) {

                                    errorMsg = message_default.chars;

                                }    
                            }

                        }

                        if (errorMsg !== ""){

                            if ("message" in item && chk.message(item.message, i)) {

                                errorMsg = item.message;

                            }

                            noError = false;

                            if ("errorInput" in item) {

                                if (chgStyles.input(item.errorInput, i)) {
                                    hasStyles = true;
                                }
                                    
                            }

                            if ("errorDiv" in item) {

                                if (chgStyles.div(item.errorDiv, errorMsg, i)) {
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

            }

            if (!hasStyles && !noError) {

                alert(message_default.alert);

            }

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