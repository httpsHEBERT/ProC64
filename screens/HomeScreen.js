import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import dictionary from '../database';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Carregando...',
      lexicalCategory: '',
      definition: '',
    };
  }

  getWord = (text) => {
    text = text.toLowerCase();
    try {
      var word = dictionary[text]['word'];

      var lexicalCategory = dictionary[text]['lexicalCategory'];

      var definition = dictionary[text]['definition'];

      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      alert('Desculpe, esta palavra não está disponível no momento');
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, borderWidth: 2 }}>
          <Header
            backgroundColor={'#c22d4d'}
            centerComponent={{
              text: 'Dicionário Virtual',
              style: { color: '#fff', fontSize: 18, fontFamily: 'monospace' },
            }}
          />

          <View style={styles.inputBoxContainer}>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => {
                this.setState({
                  text: text,
                  isSearchPressed: false,
                  word: 'Carregando...',
                  lexicalCategory: '',
                  examples: [],
                  defination: '',
                });
              }}
              value={this.state.text}
            />

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                this.setState({ isSearchPressed: true });
                this.getWord(this.state.text);
              }}>
              <Text style={styles.searchText}>PESQUISAR</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.outputContainer}>
            <Text style={{ fontSize: 20 }}>
              {this.state.isSearchPressed && this.state.word === 'Carregando...'
                ? this.state.word
                : ''}
            </Text>
            {this.state.word !== 'Carregando...' ? (
              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsTitle}> Palavra: </Text>
                  <Text style={{ color: "#d1546f", fontSize: 18 }}>
                    {/*Exibir a palavra aqui*/}
                    {this.state.word}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsTitle}> Tipo: </Text>
                  <Text style={{ color: "#d1546f", fontSize: 18 }}>
                    {/*Exibir a categoria aqui*/}
                    {this.state.lexicalCategory}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={styles.detailsTitle}> Definição: </Text>
                  <Text style={{ color: "#d1546f", fontSize: 17, textAlign: "justify", marginRight: 15, marginLeft: 7 }}>
                    {/*Exibir a definição aqui*/}
                    {this.state.definition}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({

  inputBoxContainer: {
    flex: 0.3,
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: "pink",
    justifyContent: 'center'
  },

  inputBox: {
    height: 40,
    fontSize: 20,
    width: '80%',
    color: "#fff",
    borderWidth: 4,
    marginTop: -40,
    borderRadius: 20,
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: '#c22d4d',
    fontFamily: "monoSpace",
    backgroundColor: "#de5d79"
  },

  searchButton: {
    width: 120,
    height: 30,
    marginTop: 18,
    borderWidth: 2,
    marginBottom: -40,
    alignItems: 'center',
    borderColor: "#c22d4d",
    justifyContent: 'center'
  },

  searchText: {
    fontSize: 20,
    color: "#c22d4d",
    fontWeight: 'bold',
    fontFamily: "monoSpace"
  },

  outputContainer: {
    flex: 0.7,
    alignItems: 'center'
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  detailsTitle: {
    fontSize: 20,
    color: '#c22d4d',
    fontWeight: 'bold'
  }
});
