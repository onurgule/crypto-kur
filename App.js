import React from 'react';
import { AppLoading, View } from 'expo';
import { Container, Text, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MyNavigation from './components/nav.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      onboarding: true,
    };
  }

  async onBoardingFinish(){
    try {
      await AsyncStorage.setItem('onboarding', "false")
    } catch (e) {
      console.error("onboarding save error")
      // saving error
    }
    this.setState({onboarding:false});
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    try {
      const value = await AsyncStorage.getItem('onboarding')
      if(value !== null) {
        console.log(value,"onboarding");
        this.setState({onboarding:false});
      }
      else{
        this.setState({onboarding:true});
      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if(this.state.onboarding == true){
      return (<Onboarding
    onDone={() => this.onBoardingFinish()}
    pages={[
      {
        backgroundColor: '#fff',
        image: ( <Icon name="logo-bitcoin" style={{fontSize:100}} />),
        title: 'Güncel Veriler',
        subtitle: 'CryptoCoinler hakkında güncel verilere ulaşın.',
      },
      {
        backgroundColor: '#fff',
        image: (<Icon name="calculator" style={{fontSize:100}} />),
        title: 'Hesaplama',
        subtitle: 'Daha önce alım yapsaydınız ne kadar kara geçebilirdiniz görün.',
      },
      {
        backgroundColor: '#fff',
        image: ( <Icon name="log-in" style={{fontSize:100}} />),
        title: 'Kayıt Gerektirmez',
        subtitle: "Kaydolmadan hemen başlayın!",
      },
    ]}
    />);
    }

    return (
      <MyNavigation />
    );
  }
}