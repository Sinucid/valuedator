import valuedator from "./core/main.js";
import func from "./core/func.js";

export default {
    install(Vue, options = {}) {

        if ("errorInputClass" in options && typeof options.errorInputClass === "string") {
            valuedator.config.errorInputClass = options.errorInputClass;
        }

        if ("errorMessageClass" in options && typeof options.errorMessageClass === "string") {
            valuedator.config.errorMessageClass = options.errorMessageClass;
        }

        if ("messages" in options && func.isObject(options.messages)) {

            func.mergeObj(true, valuedator.config.messages, options.messages)

        }
        
        Vue.prototype.$valuedator = valuedator.validate;
    }
}