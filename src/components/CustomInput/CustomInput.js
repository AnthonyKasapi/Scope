import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
// import CustomInput from '.';

const CustomInput = ({value, setValue, placeholder}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            keyboardType='numeric'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '60%',
        height: 40,
        //alignSelf: 'flex-end',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        BorderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
    }
});

export default CustomInput