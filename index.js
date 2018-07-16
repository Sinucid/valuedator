import valuedator from "./main.js";

export default {
    install(Vue, options = {}) {

        if ("errorInputClass" in options && typeof options.errorInputClass === "string") {
            valuedator.config.errorInputClass = options.errorInputClass;
        }
        
        Vue.prototype.$valuedator = valuedator.validate;
    }
}