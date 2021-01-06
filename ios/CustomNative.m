//
//  Temp.m
//  Demo
//
//  Created by differenz94 on 05/01/21.
// this file is used to make the bridge betweeen Temp class and react native code

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(CustomNative, NSObject)
RCT_EXTERN_METHOD(increment)
RCT_EXTERN_METHOD(getCount: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(insertData:(NSString *)name email:(NSString *)email path:(NSString *)path)
RCT_EXTERN_METHOD(ViewData: (RCTResponseSenderBlock)callback)
@end
