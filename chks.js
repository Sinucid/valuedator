import func from "./func.js";
import patterns from "./data/patterns.js";

function Chk(){

    this.value = function(value) {

        return !!String(value).trim() ? true : "required";

    };

    this.pattern = function(value, pattern){

        if (typeof pattern == "string") {

            if (pattern in patterns) {
                return patterns[pattern](value) ? true : pattern;
            }

        } else if(pattern instanceof RegExp) {

            return pattern.test(value) ? true : "pattern";

        } 

    };

    this.number = function(value, range) {

        if (isNaN(+value)) {

            return "number";

        } else {

            if (range.length == 0) {

                return true;

            } 

        }

        if (range.length == 1) {

            return +value >= range[0] ? true : { message : "Minimum value - " + range[0] + "."};

        }

        let range_sort = range.sort(func.arrsort);
        
        return range_sort[0] <= +value && +value <= range_sort[1] ? 
               true : { message : "The value must be in the range from " + range_sort[0] + " to " + range_sort[1] + "."};


    };

    this.chars = function(value, chars) {

        if (chars.length == 1) {

            return value.length >= chars[0] ? true : { message : "Minimum number of characters - " + chars[0] + "."};

        }

        let chars_sort = chars.sort(func.arrsort);

        return chars_sort[0] <= value.length && value.length <= chars_sort[1] ? 
               true : { message : "The number of characters must be between " + chars_sort[0] + " and " + chars_sort[1] + "."};


    };

}

let chk = new Chk();

export default chk;