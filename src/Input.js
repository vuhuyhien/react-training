import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``
const Label = styled.label`
    padding: 4px 8px;
`
const Value = styled.input.attrs({
    value: props => props.value,
    onChange: props =>  props.onChange,
    onFocus: props =>  props.onFocus,
    placeholder: props =>  props.placeholder
})`

`
const required = (value) => {
    if(!value || value.length === 0 ) return false;

    return true;
}

const email = (value) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

const value_confirm = (value, confirm) => {
    if(value === confirm) return true;
    
    return false;
}

const onChangeInput = (event, fn, validate) => {
    let value = event.target.value;
    let valid = true;
    if(validate.required && !required(value)) {
        valid = false;
    }

    if(validate.email && !email(value)) {
        valid = false;
    }

    fn(event, valid);
}

/**
 * 
 * @param {object} validate {required: true/false, email: true/false, value_confirm: <value>/undefined} 
 */
const Input = ({
    label,
    onChange,
    placeholder,
    value,
    validate,
    isDirty,
    onFocus,
    onValidate
}) => {
    console.log(label, validate, required(value), isDirty);
    return (
        <Wrapper>
            <Label>
                {label}{"  "}
                <Value  
                    placeholder={placeholder} 
                    value={value} 
                    onChange={e => onChangeInput(e, onChange, validate)} 
                    onFocus={onFocus}/>
            </Label>
            {validate.required && !required(value) && isDirty  ?
            <span>Required!</span>
            : null}
            {validate.email && !email(value) && isDirty  ?
            <span>Must be email!</span>
            : null}
            
        </Wrapper>

    )
}

export default Input;