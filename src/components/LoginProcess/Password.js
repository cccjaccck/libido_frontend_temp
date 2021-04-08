import React, { useState } from 'react';

const Password = ({ label, password, setPassword, isCorrect, showText }, ...props) => {
    const [ visible, setVisibility ] = React.useState(false);
    const [ isFocus, setIsFocus ] = React.useState('#707070');

    const icon = !visible ? 'eye-off' : 'eye'

    function chkPass(password) {
        const regExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/i;

        if (!(regExp.test(password))) {
            return false;
        }

        return true;
    }

    const errorText = () => {
        if ( label === 'Password' ) {
            return chkPass(password) === true ? '모든 조건이 충족되었습니다.' : '8~16자 영문 대 소 문자, 숫자, 특수문자를 사용하세요.'
        } else if ( label === 'Confirm Password' ) {
            if ( !isCorrect ) {
                return '위와 동일한 비밀번호를 입력해주세요.'
            } else if ( isCorrect) {
                return chkPass(password) === true ? '비밀번호가 일치합니다!' : '비밀번호는 일치하지만, 조건이 맞지 않아요.'
            }
        }
    }

    const primaryColorSelector = (primaryColor) => {
        return { colors: { primary: primaryColor } }
    }

    const textColorSelector = (textColor) => {
        return { color: textColor }
    }

    return (
        <View style={DefaultStyles.inputContainer}>
        <TextInput
            value={password}
            theme={
                {colors: {text: 'rgba(0, 0, 0, .87)', surface: 'rgba(0, 0, 0, .12)'}},
                password === "" ? 
                    primaryColorSelector('#707070') :
                        chkPass(password) === true ? (
                            isCorrect ? primaryColorSelector('#4fb948') : (
                                label === 'Password' ? primaryColorSelector('#4fb948') : primaryColorSelector(isFocus)
                            )
                        ) : primaryColorSelector(isFocus)
            }
            secureTextEntry={!visible}
            onChangeText={password => setPassword(password)}
            label={label}
            style={DefaultStyles.textInput}
            dense={true}
            numberOfLines={1}
            selectionColor={'#4FB948'}
            right={
                <TextInput.Icon
                    name={icon}
                    color="#707070"
                    forceTextInputFocus={false}
                    onPress={() => {setVisibility(!visible)}}
                />
            }
            onFocus={
                () => setIsFocus('#707070')
            }
            onBlur={
                () => setIsFocus('#b00020')
            }
        />
        <HelperText 
            type="error" 
            visible={showText}
            style={
                password === "" ? 
                    textColorSelector('#707070') :
                        chkPass(password) === true ? (
                            isCorrect ? textColorSelector('#4fb948') : (
                                    label === 'Password' ? textColorSelector('#4fb948') : textColorSelector(isFocus)
                                )
                            ) : textColorSelector(isFocus)  
            }
        >
            {errorText()}
        </HelperText>
        </View>
    )
}

Password.defaultProps = {
    label: '',
}

export default Password;