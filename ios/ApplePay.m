#import <React/RCTBridgeModule.h>
#import "ApplePay-Bridging-Header.h"

@interface RCT_EXTERN_MODULE(ApplePay, NSObject)

RCT_EXTERN_METHOD(invokeApplePay:(NSDictionary)method details:(NSDictionary)details shippingDetails:(NSDictionary)shippingDetails)

RCT_EXTERN_METHOD(initApplePay:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(canMakePayments:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
