import { NativeModules, Platform } from 'react-native';

const { BatteryModule, BrightnessModule } = NativeModules;

/**
 * Exercise 1: Lấy phần trăm pin từ Native Module (BatteryManager API)
 * Trả về giá trị số từ 0 đến 100
 */
export const getBatteryLevel = async (): Promise<number> => {
  if (Platform.OS === 'android' && BatteryModule) {
    try {
      const level = await BatteryModule.getBatteryLevel();
      return Math.round(Number(level));
    } catch (error) {
      console.warn('Lỗi lấy % pin từ Native Module:', error);
      return 100;
    }
  }
  // Dự phòng khi chạy giả lập không có native module
  return 80;
};

/**
 * Exercise 2: Điều chỉnh độ sáng màn hình qua Native Module (WindowManager.LayoutParams)
 * @param brightness giá trị từ 0.0 đến 1.0
 */
export const setScreenBrightness = async (brightness: number): Promise<boolean> => {
  if (Platform.OS === 'android' && BrightnessModule) {
    try {
      const clamped = Math.max(0.01, Math.min(1.0, brightness));
      return await BrightnessModule.setBrightness(clamped);
    } catch (error) {
      console.warn('Lỗi cài đặt độ sáng:', error);
      return false;
    }
  }
  return true;
};

/**
 * Exercise 2: Lấy độ sáng hiện tại (0.0 đến 1.0)
 */
export const getScreenBrightness = async (): Promise<number> => {
  if (Platform.OS === 'android' && BrightnessModule) {
    try {
      const val = await BrightnessModule.getBrightness();
      return Number(val);
    } catch (error) {
      console.warn('Lỗi lấy độ sáng hiện tại:', error);
      return 0.5;
    }
  }
  return 0.5;
};
