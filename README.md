# valuedator

## Description 

A simple validator by value.
Sometimes there are cases that simple validation on the Input field is not convenient: input fields in different forms or components, you must first process the input value, before validating, for example, calculate the exchange rate, or collect together the credit card number from the fields. It may not even be your code, and you do not want to change its structure.
Using this library, you can validate already end values.

## Setup
``` 
npm install valuedator --save
``` 

## Install in Vuejs
``` javascript
import Vue from 'Vue';
import valuedator from 'valuedator';
Vue.use(valuedator, options = {});
```

## Usage
``` javascript
export default {
  methods:{
    sendData()
    {
        if (this.$valuedator(dataArray)) {
            alert("success!!!!");
        }
    }
  }
}
``` 
You get a function that needs to pass an array with values ​​for validation.
The elements of the array must be the values ​​for validation.
```
var dataArray = [value, value, value ...values]
```
Or an objects with extended parameters for validating each value.

```
var dataArray = [{}, {}, {} ...objs]
```

As a result, the function returns true or false, depending on the results of the test.

If you pass the values ​​to the array, a simple check is performed to fill the fields, that is (value! == ""). If any of the required values ​​fail the test, an "alert" will be received with an error.

If you need a more detailed test, you must pass an object to the array with the parameters to validate each value.

```
{

    value : string || number,
    number : [], // array
    chars : [], // array
    pattern : RegExp || string,
    errorInput : {
        elem : Css selector || HTMLElement,
        cls : string
    },
    errorMessage : {
        before || container : Css selector || HTMLElement,
        cls : string
    },
    messageText : string

}
```

#### value
The value to be checked : String or Number. The presence of this property makes the value required to fill.
<b>Required property</b>

### Validation templates

> Theoretically, you can specify all 3 checks (number, chars, pattern), but it is necessary to hinder the logic of this decision. In most cases, one or two types are sufficient.

#### number
Special check for number or range : Array.
An array that takes up to two numeric parameters to set the minimum and maximum values. If you transfer only one value, a lower limit check will be performed. 
> If you pass an empty array, it checks for a number. 

#### chars
Special check for characters length : Array.
An array that takes 1 or 2 numeric parameters to set the minimum and maximum characters length. If you transfer only 1 value, a lower limit check will be performed.

#### pattern
Special check for pattern matching : RegExp or string.
Uses a regular expression to test or a string. If a string is passed, one of the built-in checks is started.

Built-in patterns for testing:
```

    "email" - /^.+@.+\..+$/
    "url" - /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    "ipv4" - /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/

```

#### errorInput
An object with parameters to change the CSS styles of the input field associated with the value.
Accepts 2 properties:

##### elem
CSS selector or HTMLElement, related to input.  
**Required property**

##### cls
String. Your own class that will be added to decorate the Input element with an error.
If not set, the built-in set of styles will be applied.

#### errorMessage
An object with parameters to change the CSS styles of the input field associated with the value.
Accepts 2 properties:
> The first property can be passed one of two: "before" or "container". One of them will be selected, the priority of "before".

##### before
CSS selector or HTMLElement, related to DOM element after that, a DIV will be added with an error message.  
**Required property**

##### container
CSS selector or HTMLElement, related to an existing DOM element, inside which will be added a DIV with an error message.
**Required property**
> You can use to collect all error messages by specifying in each validation object a reference to the same DOM element. (the "appendChild" method is used).

##### cls
String. Your own class that will be added to decorate the errorMessage element with an error.
If not set, the built-in set of styles will be applied.

#### messageText
A string with the text describing the error. If not specified, the built-in messages for this type of error will be used.

Built-in error messages:
``` javascript

    alert : "Data input error. Check the correctness of the information entered and fill the required fields.",
    required : "Required.",
    number : "Enter the number.",
    chars : "The number of characters does not match the set limits.",
    email : "Invalid email.",
    url : "Invalid url.",
    ipv4 : "Invalid ipv4 format.",
    pattern : "Does not match the pattern.",

```
## Сustom Options
When the plugin is initialized via "Vue.use", the second parameter can be passed an object with user-defined options.

Available options:
``` javascript

    Vue.use(valuedator,{
        errorInputClass : "", //string
        errorMessageClass : "", //string
        messages : {} // object
    })
    
```

#### errorInputClass
String. Class name, which will be applied by default to Input elements with errors.

#### errorMessageClass
String. Class name, which will be applied by default to errorMessage.

#### messages
An object describing the errors. You can send your error texts or your own localization. The name of the standard error properties for overwriting is listed in subsection **messageText**.  

## Priority of options
The options that you pass directly to the function for validation have the highest priority.
> Build-in options < installation options < value object options

## Error handling when passing validation parameters

The type of parameters to be transferred to objects for validation are strongly typed. This is followed by the internal plugin mechanism.
In development mode: "process.env.NODE_ENV === 'development'", when you send a wrong type of parameter, console.warn will be generated and this value will not be validated. The console will describe in detail the type of error and with which valid value it is associated.
>In production, all errors in the data types for validation will be ignored, and the value for validation will always pass through it so as not to break the overall operation of the program. Carefully adjust each valid value.

## Examples

#### Simple example

The simplest example of validation. If at least one field is not filled, "alert" will be displayed with an error.

``` javascript

    import Vue from 'Vue';
    import valuedator from 'valuedator';
    Vue.use(valuedator);

```

``` javascript

    <template>
      <div>
        <div id="d1">
            <label for="i1">input 1:</label>
            <input type="text" v-model="v1" id="i1"> 
        </div>
        <div id="d2">
            <label for="i3">input 2:</label>
            <input type="text" v-model="v2" id="i2"> 
        </div>
        <div id="d3">
            <label for="i3">input 3:</label>
            <input type="text" v-model="v3" id="i3"> 
        </div>
        
        <button @click.prevent="testData">check</button>
      </div>
    </template>
    <script>
      new Vue({
        data () {
          return {
            v1 : "",
            v2 : "",
            v3 : "",
          }
        },
        methods: {
          testData() {
            if (this.$valuedator([this.v1, this.v2, this.v3])) {
                    alert("success!!!!");
            }
          }
        }
      })
    </script>
    
```

#### Advanced example

``` javascript

    import Vue from 'Vue';
    import valuedator from 'valuedator';
    Vue.use(valuedator{
    
        errorMessageClass : "someclass",
        messages : {
            number : "some new error text",
            email : "email bla-bla-bla"
        }
        
    });

```

``` javascript

    <template>
      <div>
        <div id="d1">
            <label for="i1">number:</label>
            <input type="text" v-model="v1" id="i1"> 
        </div>
        <div id="d2">
            <label for="i3">email:</label>
            <input type="text" v-model="v2" id="i2" ref="input2"> 
        </div>
        <div id="d3">
            <label for="i3">number:</label>
            <input type="text" v-model="v3" id="i3"> 
        </div>
        <div class="container_error_3"></div>
        
        <button @click.prevent="testData">check</button>
      </div>
    </template>
    <script>
      new Vue({
        data () {
          return {
            v1 : "",
            v2 : "",
            v3 : "",
            valarr : [
                {
                    value : this.v1,
                    number : [1, 7],
                    errorInput : {
                        elem : "#i1",
                        cls : "someclass2"
                    },
                },
                {
                    value : this.v2,
                    pattern : "3mail",
                    errorInput : {
                        elem : this.$refs.input3,                        
                    },
                    errorMessage : {
                        before : "#d2",
                    },
                    messageText : "error error ERROR!!!"
                },
                {
                    value : this.v3,
                    chars : [10],
                    errorInput : {
                        elem : "#i3",
                        class : "someclass3"
                    },
                    errorMessage : {
                        container : ".container_error_3",
                        class : "container_class"
                    },
                },
            ]
          }
        },
        methods: {
          testData() {
            if (this.$valuedator(this.valarr)) {
                    alert("success!!!!");
            }
          }
        }
      })
    </script>
    
```

## Compatibility

The plugin does not use any ES6 capabilities and should theoretically work in IE11-. But it was not tested.

## Remarks, suggestions and bugs

I'm a beginner developer, and your feedback is important to me. Also, your bug reports will not be superfluous. I tried to catch all errors as much as possible, but they are possible. I will be happy with your feedback and criticism:

**sin_x@bk.ru**  
**sinucid@gmail.com**

## License

MIT
