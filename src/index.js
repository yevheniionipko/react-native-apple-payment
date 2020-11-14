import { NativeModules } from 'react-native';

const { ApplePay: RNApplePay } = NativeModules;

export default class ApplePay {
  constructor(method, details) {
    RNApplePay.invokeApplePay(method, details);
  }

  initApplePay = () => {
    return RNApplePay.initApplePay();
  };

  canMakePayments = () => {
    return RNApplePay.canMakePayments();
  };
}
