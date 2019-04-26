import React, { Component } from 'react';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import cookie from 'react-cookie'
import zhCN from './iuap_zh_CN';
import enUS from './iuap_en_US';
import zhTW from './iuap_zh_TW';

let local = cookie.load('u_locale');

function chooseLocale(local){

    switch(local){
        case 'en_US':
            return enUS;
            break;
        case 'zh_CN':
            return zhCN;
            break;
        case 'zh_TW':
            return zhTW;
            break;
        default:
            return zhCN;
            break;
    }
}
export const getlocals = (option={})=>{
    let obj = chooseLocale(local);
    if(obj[option.id]){
        return obj[option.id]
    }else{
        return option.defaultMessage||""
    }
}
export class FormattedMessage extends Component {
    render(){
        let {id,defaultMessage} = this.props;
        return(
            <span>
            {chooseLocale(local)[id]||defaultMessage}
            </span>
        )

    }
}
