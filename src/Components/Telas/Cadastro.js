import { useNavigation } from '@react-navigation/native'
import React, { Component, useState } from 'react'
import { TextInput, Text, View, Button, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';

import Header from './Header'

export default class Cadastro extends Component {

    constructor(){
        super();
        this.state={
            displayName: '',
            email: '',
            senha: '',
            isLoading: false,
        };
    }

    updateInputVal = (val, props) =>{
        const state = this.state;
        state[props] = val;
        this.setState(state);
    }

    //navigation = useNavigation();

    // const [displayName, setDisplayName] = useState('');
    // const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    Cadastrar = () => {
        if(this.state.email === '' || this.state.senha === '' || this.state.displayName === ''){
            Alert.alert("Campos Vazios!");
        }else{
            this.setState({setIsLoading: true,})
            auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
            .then((res)=>{
                res.user.updateProfile({
                    displayName: this.state.displayName,
                });
                Alert.alert('Criado com Sucesso!');
                this.setState({isLoading: false, displayName: '', email: '', senha: '',})
                this.props.navigation.navigate('Login');
            })
            .catch(error => console.error(error))

        }
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={estilos.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            );
        }

        return (
            <SafeAreaView style={estilos.container} >
                <Header/>
                <View style={estilos.form}>
                    <Text style={estilos.label}>Nome: </Text>
                    <TextInput
                    style={estilos.inputext}
                    placeholder='Nome'
                    value={this.state.displayName}
                    onChangeText={(val)=>this.updateInputVal(val, "displayName")}
                    />
                </View>
                
                <View style={estilos.form}>
                    <Text style={estilos.label}>E-mail: </Text>
                    <TextInput
                    style={estilos.inputext}
                    placeholder='E-mail'
                    value={this.state.email}
                    onChangeText={(val)=>this.updateInputVal(val, "email")}
                    />
                </View>
    
                <View style={estilos.form} >
                    <Text style={estilos.label} >Senha: </Text>
                    <TextInput
                    style={estilos.inputext}
                    placeholder='Senha'
                    value={this.state.senha}
                    onChangeText={(val)=>this.updateInputVal(val, "senha")}
                    secureTextEntry={true}
                    maxLength={15}
                    />
                </View>
    
                <View style={estilos.botao}>
                    <Button
                    title="Cadastrar"
                    color="#39414C"
                    onPress={() => this.Cadastrar()}
                    />
                </View>
    
                <Text>Já tem conta? <Text
                style={estilos.logintext}
                onPress={() => this.props.navigation.navigate('Login')}
                >Faça Login</Text></Text>
    
            </SafeAreaView>
        )
    }

}

const estilos = StyleSheet.create({
    container: {
        marginTop: 100,
        alignContent: 'center',
        alignItems: 'center',
    },

    apresentacao: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },

    label: {
        fontSize: 16,
        color: "#FFFF",
        margin: 5,
        fontWeight: 'bold',
      },

    logintext: {
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        margin: 10
    },

    botao: {
        margin: 15,
        padding: 35,
    },
    
    form: {
        display: 'flex',
        backgroundColor: "#39414C",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    inputext: {
        backgroundColor: '#ffff',
        width: '70%',
        margin: 5,
        padding: 5,
        borderRadius: 10
    }
})