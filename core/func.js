function Func(){
    this.isObject = function(obj) {
        return (typeof obj === "object" && !Array.isArray(obj) && obj !== null); 
    }

     this.arrsort = function(a, b) {
        return a - b;
    }

    this.mergeObj = function(onlySameProps, obj1) {

        if (arguments.length >= 3) {

            var target_obj = obj1;

            for (var i = 2; i < arguments.length; i++) {

                if (!this.isObject(target_obj)) {

                    break;
                    
                }

                var copy_obj = arguments[i];

                if (!this.isObject(copy_obj)) {

                    continue;
                    
                }

                for (var prop in copy_obj) {

                    if (onlySameProps) {

                        if (prop in target_obj) {

                            target_obj[prop] = copy_obj[prop];

                        }

                    } else {

                        target_obj[prop] = copy_obj[prop];

                    }

                }


            }

            return target_obj;
        }

            
        return {};
    }

        
}

var func = new Func;

export default func;