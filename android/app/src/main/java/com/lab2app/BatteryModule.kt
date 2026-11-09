package com.lab2app

import android.content.Context
import android.os.BatteryManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BatteryModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BatteryModule"
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val batteryManager =
                reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
            val batteryLevel =
                batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)

            if (batteryLevel >= 0) {
                promise.resolve(batteryLevel)
            } else {
                promise.reject("BATTERY_ERROR", "Unable to read battery level")
            }
        } catch (e: Exception) {
            promise.reject("BATTERY_EXCEPTION", e.message, e)
        }
    }
}
