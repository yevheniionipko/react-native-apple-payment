import { NativeModules, Platform } from 'react-native';

const { ApplePay: RNApplePay } = NativeModules;

if (!RNApplePay && Platform.OS === 'ios') {
  throw new Error('RNApplePay is not defined');
}

export default class ApplePay {
  constructor(method, details) {
    if (Platform.OS === 'ios') {
      RNApplePay.invokeApplePay(method, details);
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
