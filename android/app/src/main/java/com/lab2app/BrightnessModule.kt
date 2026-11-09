package com.lab2app

import android.app.Activity
import android.provider.Settings
import android.view.WindowManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BrightnessModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BrightnessModule"
    }

    @ReactMethod
    fun setBrightness(brightness: Float, promise: Promise) {
        val activity: Activity? = reactContext.currentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Current Activity is null")
            return
        }

        activity.runOnUiThread {
            try {
                val layoutParams: WindowManager.LayoutParams = activity.window.attributes
                // brightness value ranges from 0.01f to 1.0f
                val clamped = brightness.coerceIn(0.01f, 1.0f)
                layoutParams.screenBrightness = clamped
                activity.window.attributes = layoutParams
                promise.resolve(true)
            } catch (e: Exception) {
                promise.reject("BRIGHTNESS_ERROR", e.message, e)
            }
        }
    }

    @ReactMethod
    fun getBrightness(promise: Promise) {
        val activity: Activity? = reactContext.currentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Current Activity is null")
            return
        }

        try {
            val layoutParams = activity.window.attributes
            var currentVal = layoutParams.screenBrightness
            // If window screenBrightness hasn't been set yet (-1.0), query system brightness
            if (currentVal < 0) {
                val sysBrightness = Settings.System.getInt(
                    activity.contentResolver,
                    Settings.System.SCREEN_BRIGHTNESS,
                    128
                )
                currentVal = (sysBrightness / 255.0f).coerceIn(0.0f, 1.0f)
            }
            promise.resolve(currentVal)
        } catch (e: Exception) {
            promise.resolve(0.5f)
        }
    }
}
