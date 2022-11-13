import { useNavigation } from '@react-navigation/native'
import React, { Component, useState } from 'react'
import { TextInput, Text, View, Button, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';

import Header from './Header'

export default class Login extends Component {

    constructor(){
        super();
        this.state={
            email: "",
            senha: "",
            isLoading: false
        }
    }

    updateInputValor = (valor, props)=>{
        const state = this.state;
        state[props] = valor;
        this.setState(state);
    }

    // const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    //navigation = useNavigation();

    Logar = () => {
        //setIsLoading(true);
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then(()=>{
                Alert.alert("Logado");
            })
            .catch(error=>console.error(error))
    }

    EsqueciSenha = () => {
        if (this.state.email === ''){
            Alert.alert("Digite seu E-mail")
        } else {
            auth()
            .sendPasswordResetEmail(this.state.email)
            .then(()=>{
                Alert.alert("Enviamos um Link para seu E-mail!")
            })
            .catch(error=>console.error(error))
        }
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={estilos.preloader}>
                    <ActivityIndicator size="large" color="#8C0B11"/>
                </View>
            )
        }
        return (
            <SafeAreaView style={estilos.container} >
                <Header/>
                <View style={estilos.form}>
                    <Text style={estilos.label}>E-mail: </Text>
                    <TextInput
                    style={estilos.inputext}
                    placeholder='E-mail'
                    value={this.state.email}
                    onChangeText={(val)=>this.updateInputValor(val, "email")}
                    />
                </View>

                <View style={estilos.form} >
                    <Text style={estilos.label} >Senha: </Text>
                    <TextInput
                    style={estilos.inputext}
                    placeholder='Senha'
                    value={this.state.senha}
                    onChangeText={(val)=>this.updateInputValor(val, "senha")}
                    maxLength={15}
                    secureTextEntry={true}
                    />
                </View>

                <View style={estilos.botao}>
                    <Button
                    title={"Entrar"}
                    color="#39414C"
                    onPress={()=>this.Logar()}
                    />
                </View>

                <Text>Não tem conta? <Text
                style={estilos.logintext}
                onPress={() => this.props.navigation.navigate('Cadastro')}
                >Clique aqui</Text></Text>

                <Text
                style={estilos.logintext}
                onPress={()=>this.EsqueciSenha()}
                >Esqueci minha senha</Text>

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