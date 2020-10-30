import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
export default class MainScreen extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          coins: []
        };
      }
     async componentDidMount(){
        await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=false").then( gelen => gelen.json())
        .then(olay => {
            this.setState({coins: olay});
        });
      }
  render() {
    return (

      <Container>
      <Content>
        <List>
        {this.state.coins.map((prop, key) => {
         return (
          <ListItem key={key} thumbnail>
          <Left>
            <Thumbnail square source={{ uri: prop["image"] }} />
          </Left>
          <Body>
            <Text>{prop["name"]}</Text>
            <Text note numberOfLines={1}>
              {prop["current_price"] + "₺ " }
            <Text style={{color:(prop["price_change_percentage_24h"] >= 0)?"green":"red"}}>
              {("%" + prop["price_change_percentage_24h"])}
            </Text>
            </Text>
       
          </Body>
          <Right>
          <Button transparent
        title="Detay"
        onPress={() => { console.log(this.props); this.props.navigation.navigate('Details',{coin:prop, name:prop["name"], hright: (props) => (<Thumbnail square source={{ uri: prop["image"] }} />)})}}
      ><Text>Detay</Text>
      </Button>
          </Right>
        </ListItem>
         );
      })}
        </List>
      </Content>
    </Container>

    );
  }
}