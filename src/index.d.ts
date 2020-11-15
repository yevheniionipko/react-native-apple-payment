declare module 'react-native-apple-pay' {
  type Network = 'Visa' | 'MasterCard' | 'AmEx';

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

  export interface PaymentResponse {
    transactionIdentifier: string;
    paymentData: any;
  }

  export default class ApplePay {
    constructor(method: MethodData, details: DetailsData);
    initApplePay(): Promise<PaymentResponse>;
    canMakePayments(): Promise<boolean>;
  }
}
