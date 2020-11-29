import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import {
    ActivityIndicator,
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
  } from 'react-native';
  import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'
  import * as Linking from 'expo-linking';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
export default class DetailScreen extends Component {
    static navigationOptions = {
        title: 'Ekran 4',
      };
    constructor(props) {
        super(props);
        this.state = {
            chartTime: [],
            chartValue: []
        };
      }
      async componentDidMount(){
        await fetch("https://api.coingecko.com/api/v3/coins/"+this.props.coin["id"]+"/market_chart?vs_currency=try&days=3").then( gelen => gelen.json())
        .then(olay => {
            timec = [];
            valc = [];
            for(var k in olay.prices) {
                console.log(olay.prices[k][0]);
                timec.push(olay.prices[k][0]);
                valc.push(olay.prices[k][1]);
             }
            this.setState({chartTime: timec, chartValue: valc});
            fetch("https://onurgule.com.tr/finansal/addLookup.php?cid="+this.props.coin["id"]);
        });
      }
  render() {
      var lastupdate = Date(this.props.coin["last_updated"]).toLocaleString();
      
      console.log(this.props)
    return (
<ScrollView contentContainerStyle={styles.stage}>
        <TableView>
        <Section header="Genel Bilgiler" footer={this.props.coin["name"]+" hakkında genel bilgiler"}>
          <Cell cellStyle="RightDetail" title="Coin Adı" detail={this.props.coin["name"]} />
          <Cell cellStyle="RightDetail" title="Sembol" detail={this.props.coin["symbol"]} />
          <Cell cellStyle="RightDetail" title="Mevcut Değer" detail={this.props.coin["current_price"] + " ₺"} />
          <Cell cellStyle="RightDetail" title="Toplam Hacim" detail={this.props.coin["total_volume"]} />
          </Section>
          <Section header="Detaylı Bilgiler" footer={this.props.coin["name"]+" hakkında detaylı bilgiler"}>
          <Cell cellStyle="RightDetail" title="Market Sıralaması" detail={this.props.coin["market_cap_rank"]} />
          <Cell cellStyle="RightDetail" title="Son 24 Saat Max. Değer" detail={this.props.coin["high_24h"] + " ₺"} />
          <Cell cellStyle="RightDetail" title="Son 24 Saat Min. Değer" detail={this.props.coin["low_24h"] + " ₺"} />
          <Cell cellStyle="RightDetail" title="24 Saatteki Değişim" detail={this.props.coin["price_change_24h"] + " ₺"} />
          <Cell cellStyle="RightDetail" title="24 Saatteki Yüzdelik Değişim" detail={"%"+this.props.coin["price_change_percentage_24h"]} />
          <Cell cellStyle="RightDetail" title="Dolaşımdaki Miktar" detail={this.props.coin["circulating_supply"]} />
          <Cell cellStyle="RightDetail" title="Toplam Miktar" detail={this.props.coin["total_supply"]} />
          </Section>
        </TableView>
        {
      this.state.chartTime.length > 0 &&
      <View>
  <LineChart
    bezier
    segments={6}
    withVerticalLabels={false}
    
    data={{
      labels: this.state.chartTime,
      datasets: [{
        data: this.state.chartValue
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: '#0abeff',
      backgroundGradientFrom: '#00f3fb',
      backgroundGradientTo: '#1aa6c9',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <Text style={{textAlign:'center'}}>
    Son 3 Günün İstatistikleri
  </Text>
</View>
  }
        
          <TableView>
            <Section footer={"Veriler CoinGecko tarafından sağlanmıştır." + "\nSon Güncellenme Tarihi: " + lastupdate}>
              <Cell
                title="Daha Fazla Detay"
                titleTextColor="#007AFF"
                onPress={() => Linking.canOpenURL("https://wikipedia.org/wiki/"+this.props.coin["name"]).then(supported => {
                    if (!supported) {
                      console.log('Url Acilmiyor.');
                    } else {
                      return Linking.openURL("https://wikipedia.org/wiki/"+this.props.coin["name"]);
                    }
                  }).catch(err => console.log('An error occurred', err))
                  }
              />
            </Section>
          </TableView>
        
        
      </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
    stage: {
      backgroundColor: '#EFEFF4',
      paddingTop: 20,
      paddingBottom: 20,
    },
  });