import func from "./../func.js";
import patterns from "./patterns.js";

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
    errorStyle : {
        no_elem : function(chk){return !("elem" in chk)},
        elem_type : function(chk){return !chk.elem instanceof HTMLElement || typeof chk.elem !== "string"},
        cls_type : function(chk){return "cls" in chk && typeof chk.cls !== "string"},
    },
    message : {
        msg_type : function(chk){return !(typeof chk === "string")}
    }
}