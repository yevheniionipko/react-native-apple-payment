declare module 'react-native-apple-payment' {
  type Network = 'Visa' | 'MasterCard' | 'AmEx';

  export type SupportedNetworks = Network[];

  export type MethodData = {
    countryCode: string;
    currencyCode: string;
    supportedNetworks: SupportedNetworks;
    merchantIdentifier: string;
  }

  export type Detail = {
    label: string;
    amount: number;
  }

  export type DetailsData = {
    total: Detail;
  }

  export  type ShippingType = 'delivery' | 'servicePickup' | 'shipping' | 'storePickup'
  export type ShippingContact = {
    name: string,
    postalAddress: string,
    phoneNumber: string,
    emailAddress: string,
  }
  export type ShippingMethods = {
    identifier: string,
    detail: string,
  }

  export type ShippingDetails = {
    type: ShippingType,
    contact: ShippingContact,
    methods: ShippingMethods,
  }

  export type TransactionIdentifier = string;

  export default class ApplePay {
    constructor(method: MethodData, details: DetailsData, shippingDetails?: ShippingDetails);
    initApplePay(): Promise<TransactionIdentifier>;
    canMakePayments(): Promise<boolean>;
  }
}
