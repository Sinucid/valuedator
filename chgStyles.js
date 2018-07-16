import testData from "./testData";
import style_default from "./data/stylesDefault.js";

export default {

    input : function(obj, i){

        if (!testData(obj, "errorStyle", i)) {

            return false;

        }

        let elem = obj.elem instanceof HTMLElement ? obj.elem : document.querySelector(obj.elem);

        if ("cls" in obj) {

            elem.classList.add(obj.cls);

        } else {

            Object.assign(elem.style, style_default.input);

        }

        return true;

    },

    div : function(obj, msg, i){

        if (!testData(obj, "errorStyle", i)) {

            return false;

        }

        let elem, div;

        elem = obj.elem instanceof HTMLElement ? obj.elem : document.querySelector(obj.elem);

        div = document.createElement("div");
        div.className = "errormsg-div"
        div.innerText = msg;

        if ("cls" in obj) {

            div.classList.add(obj.cls);

        } else {

            Object.assign(div.style, style_default.div);

        }

        elem.parentNode.insertBefore(div, elem.nextSibling);

        return true;

    }
    
}