import { NativeModules, Platform } from 'react-native';

const { ApplePay: RNApplePay } = NativeModules;

if (!RNApplePay && Platform.OS === 'ios') {
  console.info('RNApplePay is not defined');
}

export default class ApplePay {
  constructor(method, details, shippingDetails) {
    if (Platform.OS === 'ios') {
      RNApplePay.invokeApplePay(method, details, shippingDetails);
      this.initApplePay = this._RNinitApplePay;
      this.canMakePayments = this._RNcanMakePayments;
    } else {
      console.info('Not supported os (IOS ONLY)');
    }
  }

  _RNinitApplePay = () => {
    return RNApplePay.initApplePay();
  };

  _RNcanMakePayments = () => {
    return RNApplePay.canMakePayments();
  };
}
