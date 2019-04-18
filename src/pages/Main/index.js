import React, { Component } from 'react';

// TouchableOpacity (botão estilizado/customizado)
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import styles from './styles';
import logo from '../../assets/logo-small.png';

export default class Main extends Component {
  state = {
    newBox: '',
  };

  handleSignIn = async() => {
    const response = await api.post("boxes", {
      title: this.state.newBox
    });
    this.props.navigation.navigate("Box");

    //this.props.history.push(`/box/${response.data._id}`); // redireciona para a página "box" passando o id do box criado
    //console.log(response.data); // retorna o json com os dados da box criada (o mesmo mostrado no insognia)
  }
  render() {
    return (
      // View equivalente à div no html
      <View style={styles.container}>
          <Image source={logo} />
          <TextInput
            style={styles.input}
            placeholder="Crie um box"
            placeholderTextColor="#999"
            autoCapitalize="none" // não usa o capslock
            autoCorrect={false} // não usa o corretor ortográfico do celular
            underlineColorAndroid="transparent"
            value={this.state.newBox}
            onChangeText={text => this.setState({ newBox: text })} // text = texto digitado pelo usuário
          />
          <TouchableOpacity onPress={this.handleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity> 
          <Text>Olá mundo !</Text>
      </View>);
  }
}
