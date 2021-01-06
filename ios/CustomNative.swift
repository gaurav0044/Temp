//
//  Temp.swift
//  Demo
//
//  Created by differenz94 on 05/01/21.
//

import Foundation

@objc(CustomNative)
class CustomNative: NSObject {
  private var count = 0;
  // This method used to check the bridge between Native and React Native
  @objc
    func constantsToExport() -> [AnyHashable : Any]! {
      return [
            "number": 123.9,
            "string": "foo",
            "boolean": true,
            "array": [1, 22.2, "33"],
            "object": ["a": 1, "b": 2]
          ]
    }
  // Setting up the queue
  @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }

// Inserting Emplopyee Data
  @objc
  func insertData(_ name: String,email: String,path: String)  {
    let defaults = UserDefaults.standard
    var value = defaults.value(forKey: "value") as? [[String:Any]] ?? []
    let  temp : [String:Any] = ["name": name,"email":email,"path":path]
    value.append(temp)
    defaults.set(value, forKey:  "value")
    defaults.synchronize();
  }
  func isKeyPresentInUserDefaults(key: String) -> Bool {
      return UserDefaults.standard.object(forKey: key) != nil
  }
// Getting Data of Employees
  @objc
  func ViewData(_ callback: RCTResponseSenderBlock)  {
    let defaults = UserDefaults.standard
    if isKeyPresentInUserDefaults(key: "value"){
      let value = defaults.value(forKey: "value") as? [[String:Any]] ?? []
      callback([value])
    }else{
      callback(["nill"])
    }
  }


}
