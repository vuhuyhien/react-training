import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import Input from './Input';
import Submit from './Submit';

const Wrapper = styled.div`
    width: 500px;
    border: 1px solid;
`
/**
 * 
 * @param {object} email {value, isDirty, valid, onChange, onValidate} 
 */
const FromRuleTpl = ({
    email,
    pwd,
    onChangePwd,
    onSubmit,
    pwd_confirm,
    onChangePwdConfirm,
}) => (
    <Wrapper>
        <Title title="Form rule" />
        <Input 
            label="email"
            isDirty={email.isDirty} 
            value={email.value} 
            onChange={email.onChange} 
            validate={{
                required: true,
                email: true
            }}
            placeholder={"Input your email"}
            />
        <Input 
            label="pwd" 
            value={pwd} 
            onChange={onChangePwd} 
            validate={{
                required: true,
                email: false
            }}
            placeholder={"Input your pwd"} 
            />
        <Input 
            label="pwd confirm" 
            value={pwd_confirm} 
            onChange={onChangePwdConfirm} 
            validate={{
                required: true,
                email: false,
                value_confirm: pwd
            }}
            placeholder={"Input your pwd"} 
            />
        <Submit name="Submit Button" onClick={onSubmit} />
    </Wrapper>    
)


class FromRule extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            email: {
                value: "",
                isDirty: false,
                valid: false
            },
            pwd: {
                value: "",
                isDirty: false
            },
            pwd_confirm: {
                value: "",
                isDirty: false
            }
        }
    }

    onChange = (event, valid, name) => {
        this.setState({
            [name]: {
                ...this.state[name],
                value: event.target.value,
                isDirty: true,
                valid: valid
            }
        })
    }

    onFocus = (name) => {
        if(!this.state[name].isDirty) {
            this.setState({
                [name]: {
                    ...this.state[name],
                    isDirty: true
                }
            })
        }
    }

    onSubmit = () => {
        console.log("submit")
    }

    render () {
        return (
            <FromRuleTpl
                email={{
                   ...this.state.email,
                   onChange: (e, valid) => this.onChange(e, valid, 'email'),
                }}
                onChangeEmail={e => this.onChange(e, 'email')}
                pwd={this.state.pwd}
                onChangePwd={e => this.onChange(e, 'pwd')}
                pwd_confirm={this.state.pwd_confirm}
                onSubmit={this.onSubmit}
                onChangePwdConfirm={e => this.onChange(e, 'pwd_confirm')}
            />
        )
    }
}

export default FromRule;