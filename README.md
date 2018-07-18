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
``` 
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
The value to be checked : String or Number.
<b>Required property</b>

#### number
Special check for number or range : Array.
An array that takes up to two numeric parameters to set the minimum and maximum values. If you transfer only one value,               a lower limit check will be performed. If you pass an empty array, it checks for a number. 

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
CSS selector or HTMLElement, related to input. <b>Required property</b>

##### cls
String. Your own class that will be added to decorate the Input element with an error.
If not set, the built-in set of styles will be applied.

#### errorMessage
An object with parameters to change the CSS styles of the input field associated with the value.
Accepts 2 properties:

##### before
CSS selector or HTMLElement, related to DOM element after that, a DIV will be added with an error message.<b>Required property</b>

##### or

##### container
CSS selector or HTMLElement, related to an existing DOM element, inside which will be added a DIV with an error message. You can use to collect all error messages by specifying in each validation object a reference to the same DOM element. (the "appendChild" method is used)<b>Required property</b>

##### CLS
String. Your own class that will be added to decorate the errorMessage element with an error.
If not set, the built-in set of styles will be applied.

#### messageText
A string with the text describing the error. If not specified, the built-in messages for this type of error will be used.

Built-in error messages:
```

    alert : "Data input error. Check the correctness of the information entered and fill the required fields.",
    required : "Required.",
    number : "Enter the number.",
    chars : "The number of characters does not match the set limits.",
    email : "Invalid email.",
    url : "Invalid url.",
    ipv4 : "Invalid ipv4 format.",
    pattern : "Does not match the pattern.",

```
