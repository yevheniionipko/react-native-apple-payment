import { NativeModules, Platform } from 'react-native';

const { ApplePay: RNApplePay } = NativeModules;

export default class ApplePay {
  constructor(method, details) {
    if (Platform.OS === 'ios') {
      RNApplePay.invokeApplePay(method, details);
    } else {
      console.info('Not supported os (IOS ONLY)');
    }
  }

  initApplePay = () => {
    if (Platform.OS === 'ios') {
      return RNApplePay.initApplePay();
    } else {
      console.info('Not supported os (IOS ONLY)');
    }
  };

  canMakePayments = () => {
    if (Platform.OS === 'ios') {
      return RNApplePay.canMakePayments();
    } else {
      console.info('Not supported os (IOS ONLY)');
    }
  };
}
