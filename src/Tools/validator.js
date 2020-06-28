function nameValidator(value){
    const reg =/[A-ZԱ-ՖА-Я][a-zA-Zա-ֆԱ-ՖА-Яа-я][^1234567890#&<>"~;$^%{}?]{0,20}$/g ;
    
    return reg.test(value);
}

function emailValidator(value){
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(value);
}

export {nameValidator, emailValidator};