import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { getScreenBrightness, setScreenBrightness } from '../native/DeviceModules';

export const BrightnessScreen: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(0.5);

  useEffect(() => {
    // Đọc độ sáng ban đầu
    (async () => {
      const current = await getScreenBrightness();
      setBrightness(current);
    })();
  }, []);

  const handleBrightnessChange = useCallback((value: number) => {
    setBrightness(value);
    // Thay đổi độ sáng tức thì theo yêu cầu 4 của Exercise 2
    setScreenBrightness(value);
  }, []);

  const percentage = Math.round(brightness * 100);

  // Tạo 12 vạch chia quanh vòng tròn mặt trời (như thiết kế Screen 2)
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180; // Mỗi vạch cách nhau 30 độ
    const radius = 60;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    return { id: i, x, y, rotation: i * 30 };
  });

  return (
    <View style={styles.container}>
      {/* Vòng tròn mặt trời hiển thị % độ sáng ở phần trên */}
      <View style={styles.dialContainer}>
        {ticks.map((tick) => (
          <View
            key={tick.id}
            style={[
              styles.tickMark,
              {
                transform: [
                  { translateX: tick.x },
                  { translateY: tick.y },
                  { rotate: `${tick.rotation}deg` },
                ],
              },
            ]}
          />
        ))}

        <View style={styles.circleCenter}>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>

      {/* Thẻ điều khiển Brightness ở phần dưới */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Brightness</Text>

        <View style={styles.sliderRow}>
          {/* Biểu tượng mặt trời nhỏ bên trái */}
          <View style={styles.sunIconWrapper}>
            <Text style={styles.sunIcon}>☀️</Text>
          </View>

          {/* Thanh Slider chỉnh độ sáng */}
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={1.0}
            step={0.01}
            value={brightness}
            onValueChange={handleBrightnessChange}
            minimumTrackTintColor="#3B82F6"
            maximumTrackTintColor="#F472B6"
            thumbTintColor="#2563EB"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  dialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    position: 'relative',
  },
  tickMark: {
    position: 'absolute',
    width: 2.5,
    height: 12,
    backgroundColor: '#9CA3AF',
    borderRadius: 2,
  },
  circleCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 16,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sunIconWrapper: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunIcon: {
    fontSize: 20,
  },
  slider: {
    flex: 1,
    height: 40,
  },
});
