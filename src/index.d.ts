declare module 'react-native-apple-payment' {
  type Network = 'Visa' | 'MasterCard' | 'AmEx'| 'Mada';

  export type SupportedNetworks = Network[];

  export interface MethodData {
    countryCode: string;
    currencyCode: string;
    supportedNetworks: SupportedNetworks;
    merchantIdentifier: string;
  }

  export interface Detail {
    label: string;
    amount: number;
  }

  export interface DetailsData {
    total: Detail;
  }

  export type TransactionIdentifier = string;

  export default class ApplePay {
    constructor(method: MethodData, details: DetailsData);
    initApplePay(): Promise<TransactionIdentifier>;
    canMakePayments(): Promise<boolean>;
  }
}
