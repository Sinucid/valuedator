import testData from "./testData";
import func from "./func.js";
import patterns from "./data/patterns.js";

function Chk(){

    this.valArr = function(arr){

        return testData(arr, "valarr");

    };

    this.arrItem = function(item, i){

        return testData(item, "item", i);

    };

    this.value = function(value) {

        return value !== "";

    };

    this.pattern = function(value, pattern, i){

        if (!testData(pattern, "pattern", i)) {

            return false;

        }

        if (typeof pattern == "string") {

            if (pattern in patterns) {
                return patterns[pattern](value);
            }

        } else if(pattern instanceof RegExp) {

            return pattern.test(value);

        } 

    };

    this.number = function(value, range, i) {



        if (!testData(range, "number", i)) {

            return false;
            
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

    this.chars = function(value, chars, i) {

        if (!testData(chars, "chars", i)) {

            return false;
            
        }

        if (chars.length == 1) {

            return value.length >= chars[0];

        }

        let chars_sort = chars.sort(func.arrsort);

        return chars_sort[0] <= value.length && value.length <= chars_sort[1];


    };

    this.message = function(msg, i){

        return testData(msg, "message", i);

    };
}

let chk = new Chk();

export default chk;