import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon, DatePicker,Text,Label, Input, Left, Button, Card, CardItem, Body,} from 'native-base';
export default class CalculateString extends Component {
    constructor(props) {
    super(props);
    this.state = {
      coin: undefined,
      chosenDate: new Date(),
      coins:[],
      kactl:1,
      kar:0,
      error:null
    };
    this.setDate = this.setDate.bind(this);
  }
  async componentDidMount(){
    await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=false").then( gelen => gelen.json())
    .then(olay => {
        this.setState({coins: olay});
    });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate, kar:0 });
  }
  kacTL(val){
    if(isNaN(val)){
      this.setState({kar:0, error:'Yalnızca sayı giriniz.', kactl:"null"})
    }
    else this.setState({kactl:val, kar:0, error:null})
  }
  onValueChange2(value) {
    this.setState({
      coin: value,
      kar: 0
    });
  }
  async calculate(){
    console.log(this.state.kactl, isNaN(this.state.kactl))
      if(!isNaN(this.state.kactl)){
      var tarih = this.state.chosenDate.getDate()+"-"+(parseInt(this.state.chosenDate.getMonth())+1)+"-"+this.state.chosenDate.getFullYear();
      console.log("http://finansal.onurgule.com.tr/calculate?coin="+this.state.coin+"&tarih="+tarih+"&kactl="+this.state.kactl);
      fetch("http://finansal.onurgule.com.tr/calculate?coin="+this.state.coin+"&tarih="+tarih+"&kactl="+this.state.kactl)
      .then(txt => txt.text()).then((gelen) => {
          this.setState({kar : parseInt(gelen), error:null})
      } );
    }
    else{
      this.setState({kar:0, error:'Yalnızca sayı giriniz..'})
    }
  }
  render() {
    return (
      <Container>
        <Content style={{margin:20}}>
          <Form>
              <Label>Alacağınız Tarihi Seçin</Label>
          <DatePicker
            defaultDate={new Date(2017, 8, 18)}
            minimumDate={new Date(2010, 1, 1)}
            maximumDate={new Date()}
            locale={"tr"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Tarih Seçiniz"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Label style={{marginTop:20}}>Hangi Coin'den Alacaksınız?</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.coin}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {this.state.coins.map((value, idx) => { //loop the second dropdown
                                return(
                                    <Picker.Item key={idx} label={value["name"]} value={value["id"]} />
                                )
                            })}
              </Picker>
            </Item>
            <Label style={{marginTop:20}}>Kaç TL'lik alım gerçekleştireceksiniz?</Label>
            <Item>
            <Icon active name='cash' />
            <Input keyboardType="phone-pad" onChangeText={(val) => this.kacTL(val)} placeholder="TL Cinsinden Giriniz..."/>
          </Item>
          <Button onPress={ () => this.calculate()} style={{marginTop:25, alignSelf:'center'}} iconLeft>
            <Icon name='calculator' />
            <Text>Hesapla</Text>
          </Button>
          </Form>
          {
            isNaN(this.state.kactl)&&
            <Card style={{marginTop:20}}>
            <CardItem>
              <Body>
              <Text style={{textAlign:'center'}}>{this.state.error}</Text>
              </Body>
            </CardItem>
          </Card>
          }
          {
              isNaN(this.state.kar) &&
              <Card style={{marginTop:20}}>
            <CardItem>
              <Body>
              <Text style={{textAlign:'center'}}>Bu tarihte alamazdınız.</Text>
              </Body>
            </CardItem>
          </Card>
          }
          {
              this.state.kar != 0 && this.state.kar != 1 && !isNaN(this.state.kar) &&
          <Card style={{marginTop:20}}>
            <CardItem>
              <Body>
                <Text style={{textAlign:'center'}}>
                    {this.state.chosenDate.getDate() +"/" + (parseInt(this.state.chosenDate.getMonth())+1) + "/" + this.state.chosenDate.getFullYear()} tarihinde {this.state.kactl}TL'lik {this.state.coin} alsaydınız {"\n"}
                   { this.state.kar> 0 ? this.state.kar : this.state.kar*(-1)} TL <Text style={{color:this.state.kar > 0 ? "green" : "red"}}>{this.state.kar > 0 ? "kar" : "zarar"}</Text> edecektiniz.
                </Text>
              </Body>
            </CardItem>
          </Card>
          }
        </Content>
      </Container>
    );
  }
}