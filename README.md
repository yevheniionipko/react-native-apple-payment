# react-native-apple-pay

Apple Pay implementation for React Native (Only IOS)

## Installation

```sh
yarn add react-native-apple-pay

cd ios && pod install
```

## Usage

###Types

```ts

type Network = 'Visa' | 'MasterCard' | 'AmEx';

export type SupportedNetworks = Network[];

export interface MethodData {
    countyCode: string;
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

```

### Code
```ts

import ApplePay, { MethodData, DetailsData } from "react-native-apple-pay";

const payment = ApplePay(method as MethodData, details as DetailsData);

const canMakePayment: boolean = await payment.canMakePayments()

const paymentResponse: PaymentResponse = await payment.initApplePay()

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
