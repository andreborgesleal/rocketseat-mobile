import React, { Component } from 'react';

// TouchableOpacity (botão estilizado/customizado)
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import logo from '../../assets/logo-small.png';

export default class Main extends Component {
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
          />
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity> 
          <Text>Olá mundo !</Text>
      </View>);
  }
}
