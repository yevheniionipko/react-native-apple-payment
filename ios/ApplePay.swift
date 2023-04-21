import PassKit

@objc(ApplePay)
class ApplePay: UIViewController {
    private var rootViewController: UIViewController = UIApplication.shared.keyWindow!.rootViewController!
    private var request: PKPaymentRequest = PKPaymentRequest()
    private var resolve: RCTPromiseResolveBlock?
    private var paymentNetworks: [PKPaymentNetwork]?


    @objc(invokeApplePay:details:shippingDetails:)
    private func invokeApplePay(method: NSDictionary, details: NSDictionary, shippingDetails: NSDictionary) -> Void {
        self.paymentNetworks = method["supportedNetworks"] as? [PKPaymentNetwork]
        guard PKPaymentAuthorizationViewController.canMakePayments(usingNetworks: paymentNetworks!) else {
            print("Can not make payment")
            return
        }
        let total = details["total"] as! NSDictionary
        let tax = details["tax"] as! NSDictionary
        let subtotal = details["subTotal"] as! NSDictionary;
        let paymentTotal = PKPaymentSummaryItem.init(label: total["label"] as! String, amount: NSDecimalNumber(value: total["amount"] as! Double))
        let paymentTax = PKPaymentSummaryItem.init(label: tax["label"] as! String, amount: NSDecimalNumber(value: tax["amount"] as! Double))
        let paymentSubtotal = PKPaymentSummaryItem.init(label: subtotal["label"] as! String, amount: NSDecimalNumber(value: subtotal["amount"] as! Double))
        request.currencyCode = method["currencyCode"] as! String
        request.countryCode = method["countryCode"] as! String
        request.merchantIdentifier = method["merchantIdentifier"] as! String
        request.merchantCapabilities = PKMerchantCapability.capability3DS
        request.supportedNetworks = self.paymentNetworks!
        request.paymentSummaryItems = [paymentSubtotal, paymentTax, paymentTotal]
        if let type = shippingDetails["type"] as? String {
            switch type {
            case "delivery":
                request.shippingType = .delivery
                break
            case "servicePickup":
                request.shippingType = .servicePickup
                break
            case "shipping":
                request.shippingType = .shipping
                break
            case "storePickup":
                request.shippingType = .storePickup
                break
            default:
                break
            }
            if let contact = shippingDetails["contact"] as? PKContact {
                request.shippingContact = contact
            }
            if let methods = shippingDetails["methods"] as? [PKShippingMethod] {
                request.shippingMethods = methods
            }
            request.requiredShippingContactFields = [.emailAddress, .name, .phoneNumber, .postalAddress]
        }
    }

    @objc(initApplePay:withRejecter:)
    func initApplePay(resolve: @escaping RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        guard PKPaymentAuthorizationViewController.canMakePayments(usingNetworks: paymentNetworks!) else {
            print("Can not make payment")
            return
        }
        self.resolve = resolve
        if let controller = PKPaymentAuthorizationViewController(paymentRequest: request) {
            controller.delegate = self
            DispatchQueue.main.async {
                self.rootViewController.present(controller, animated: true, completion: nil)
            }
        }
    }

    @objc(canMakePayments:withRejecter:)
    func canMakePayments(resolve: RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if PKPaymentAuthorizationViewController.canMakePayments(usingNetworks: paymentNetworks!) {
            resolve(true)
        } else {
            resolve(false)
        }
    }
}

extension ApplePay: PKPaymentAuthorizationViewControllerDelegate {
    func paymentAuthorizationViewControllerDidFinish(_ controller: PKPaymentAuthorizationViewController) {
        controller.dismiss(animated: true, completion: nil)
        if (self.resolve != nil) {
          self.resolve!("PAYMENT_CANCELLED")
        }
    }

    func paymentAuthorizationViewController(_ controller: PKPaymentAuthorizationViewController, didAuthorizePayment payment: PKPayment, completion: @escaping (PKPaymentAuthorizationStatus) -> Void) {
        let token = String(decoding: payment.token.paymentData, as: UTF8.self)
        if token != nil {
            self.resolve!(token)
            completion(.success)
            self.resolve = nil
        } else {
            self.resolve!("COULD_NOT_FIND_TOKEN")
            completion(.failure)
            self.resolve = nil
        }
    }
}
