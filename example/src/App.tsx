import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ApplePay, { DetailsData, MethodData } from 'react-native-apple-pay';

export default function App() {
  const Method: MethodData = {
    countryCode: 'US',
    currencyCode: 'USD',
    merchantIdentifier: 'merchant.com.onipko',
    supportedNetworks: ['Visa', 'MasterCard', 'AmEx'],
  };

  const Options: DetailsData = {
    total: {
      label: 'Shoe-shop',
      amount: 200.35,
    },
  };

  const payment = new ApplePay(Method, Options);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          payment.canMakePayments().then((can: any) => {
            console.warn(can);
            if (can) {
              payment.initApplePay().then(console.warn);
            }
          });
        }}
      >
        <Text>Apple Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
