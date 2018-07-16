export default {
    email : function(pattern){return /^.+@.+\..+$/i.test(pattern)},
    url : function(pattern){return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(pattern)},
    ipv4 : function(pattern){return /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(pattern)},
};
