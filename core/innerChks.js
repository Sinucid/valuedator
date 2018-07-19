import func from "./func.js";
import patterns from "./../data/patterns.js";

export default {
    valarr : {
        valarr_type : function(chk){return !Array.isArray(chk)},
        valarr_empty : function(chk){return chk.length === 0},
    },
    item : {
        item_type : function(chk){return !(func.isObject(chk) || typeof chk === "string" || "number")},
        no_value : function(chk){return func.isObject(chk) && !("value" in chk)},
    },
    value : {
        value_type : function(chk){return !(typeof chk === "string" || "number")}
    },
    pattern : {
        pattern_type : function(chk){return !(typeof chk === "string" || chk instanceof RegExp)},
        pattern_wrong : function(chk){return typeof chk === "string" && !(chk in patterns)},
    },
    number : {
        number_type : function(chk){return !Array.isArray(chk) || chk[0] !== undefined && typeof chk[0] !== "number" || chk[1] !== undefined && typeof chk[1] !== "number"},
    },
    chars : {
        chars_type : function(chk){return !Array.isArray(chk) || chk.length === 0 || chk[0] !== undefined && typeof chk[0] !== "number" || chk[1] !== undefined && typeof chk[1] !== "number"},
    },
    errorInput : {
        no_elem : function(chk){return !"elem" in chk},
        elem_type : function(chk){return !(chk.elem instanceof HTMLElement || typeof elem !== "string")},
        elem_exists : function(chk){return !(chk.elem instanceof HTMLElement ? chk.elem : document.querySelector(chk.elem));}, 
        cls_type : function(chk){return "cls" in chk && !(typeof chk.cls === "string" || Array.isArray(chk.cls))},
        cls_arr_type : function(chk){return Array.isArray(chk.cls) && chk.cls.some(function(item){return typeof item !== "string" })},
    },
    errorMessage : {
        no_elem : function(chk){return !("before" || "container" in chk)},
        elem_type : function(chk){let elem = (chk.before || chk.container);
                                  return !elem instanceof HTMLElement || typeof elem !== "string"
        },
        container_exists : function(chk){
            if ("container" in chk) {
                let elem = chk.container instanceof HTMLElement ? chk.container : document.querySelector(chk.container);
                return !elem;
            }
            return false;
        }, 
        cls_type : function(chk){return "cls" in chk && !(typeof chk.cls === "string" || Array.isArray(chk.cls))},
        cls_arr_type : function(chk){return Array.isArray(chk) && chk.some(function(item){return typeof item !== "string" })},
    },
    message : {
        msg_type : function(chk){return !(typeof chk === "string")}
    }
}