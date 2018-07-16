function Func(){
    this.isObject = function(obj) {
        return (typeof obj === "object" && !Array.isArray(obj) && obj !== null); 
    }

     this.arrsort = function(a, b) {
        return a - b;
    }

    this.c = function(text){
        
        if (text !== undefined) {
            console.log(text)
        } else {
            console.log("th");
        }
        
    }
}

let func = new Func;

export default func;