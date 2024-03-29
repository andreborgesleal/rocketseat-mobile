import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { locale } from 'core-js';

export default class Box extends Component {
  state = {
    box: {},
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box'); // retorna o ID do box gravado na chave @RocketBox:box
    console.log(box); 
    const response = await api.get(`boxes/${box}`);
    this.setState({box: response.data});
  }

  handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async upload => {
      if (upload.error) {
        console.log("ImagePicker error");
      } else if (upload.didCancel) {
        console.log("Canceled by user");
      }
      else
      {
        console.log(upload);
      }
    })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
        onPress = {() => {}}
        style = {styles.file}>
        <View style={styles.fileInfo}>
          <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
          <Text style={styles.fileTitle}>{item.title}</Text>
          <Text style={styles.fileDate}>
            há{" "}
            {distanceInWords(item.createdAt, new Date(), { locale: pt})}
          </Text>
        </View>
    </TouchableOpacity>

  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{this.state.box.title}</Text>

        <FlatList 
            style = {styles.list}
            data= {this.state.box.files}
            keyExtractor = {file => file._id} // tal qual o frontend, este garante que é único item da lista
            ItemSeparatorComponent = {() => <View style={styles.separator} />}
            renderItem = {this.renderItem}
        />
        <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
          <Icon name="cloud-upload" size={24} color="#FFF"/>
        </TouchableOpacity>
      </View> 
    );
  }
}
