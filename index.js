import valuedator from "./main.js";
import func from "./func.js";

export default {
    install(Vue, options = {}) {

        if ("errorInputClass" in options && typeof options.errorInputClass === "string") {
            valuedator.config.errorInputClass = options.errorInputClass;
        }

        if ("errorMessageClass" in options && typeof options.errorMessageClass === "string") {
            valuedator.config.errorMessageClass = options.errorMessageClass;
        }

        if ("message" in options && func.isObject(options.message)) {

            func.mergeObj(true, valuedator.config.message, options.message)

            // Object.assign(valuedator.config.message, options.message);

        }
        
        Vue.prototype.$valuedator = valuedator.validate;
    }
}