import dataError from "./dataError";
import func from "./func.js";
import patterns from "./data/patterns.js";

function Chk(){

    this.valArr = function(arr){

        let innerError = dataError(arr, "valarr");

        return innerError ? innerError : true;

    };

    this.arrItem = function(item){

        let innerError = dataError(item, "item");

        return innerError ? innerError : true;

    };

    this.value = function(value) {

        let innerError = dataError(value, "value");

        return innerError ? innerError : !!String(value) ? true : { msg : "required"}

    };

    this.pattern = function(value, pattern){

        if (innerError = dataError(pattern, "pattern")) {
            return {error : innerError};
        }

        if (typeof pattern == "string") {

            if (pattern in patterns) {
                return patterns[pattern](value);
            }

        } else if(pattern instanceof RegExp) {

            return pattern.test(value);

        } 

    };

    this.number = function(value, range) {

        if (innerError = dataError(range, "number")) {
            return {error : innerError};
        }
  
        if (range.length == 0) {

            if (isNaN(+value)) {

                return false;

            }

            return true;

        } 
    
        if (range.length == 1) {

            return +value >= range[0];

        }

        let range_sort = range.sort(func.arrsort);
        
        return range_sort[0] <= +value && +value <= range_sort[1];


    };

    this.chars = function(value, chars) {

        if (innerError = dataError(chars, "chars")) {
            return {error : innerError};
        }

        if (chars.length == 1) {

            return value.length >= chars[0];

        }

        let chars_sort = chars.sort(func.arrsort);

        return chars_sort[0] <= value.length && value.length <= chars_sort[1];


    };

    this.message = function(msg){

        return dataError(msg, "message");

    };
}

let chk = new Chk();

export default chk;