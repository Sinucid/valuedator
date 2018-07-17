
let valarr = [
    value,
    {

        value : *, //variable
        number : [] //array
        chars : [], //array
        pattern : "", //regexp || string || (int types - email...)
        errorInput : {
            elem : "", //sel || obj
            cls : "" //string
        },
        errorMessage : {
            before || container : "", //sel || obj
            cls : "" //string
        },
        message : "", //string

    },
];



let message_default_ru = {
    alert : "Ошибка ввода данных. Проверьте правильность введенной информации и заполнение обязательных полей.",
    required : "Обязательно к заполнению.",
    number : "Введите число.",
    number_1 : "Значение не входит в указанный диапазон.", 
    number_2 : "Значение не входит в указанный диапазон.", 
    chars_1 : "Количество символыаыва",
    chars_2 : "Количество символыаыва",
    email : "Ошибка формата электронной почты",
    pattern : "Содержимое ввода не соответсвует шаблону.",
}