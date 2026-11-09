import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getBatteryLevel } from '../native/DeviceModules';

export const BatteryScreen: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBattery = useCallback(async () => {
    try {
      const level = await getBatteryLevel();
      setBatteryLevel(level);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBattery();
    // Tự động cập nhật mỗi 5 giây
    const interval = setInterval(fetchBattery, 5000);
    return () => clearInterval(interval);
  }, [fetchBattery]);

  const level = batteryLevel ?? 0;
  const fillPercentage = Math.max(0, Math.min(100, level));

  return (
    <View style={styles.container}>
      {/* Thẻ Card trung tâm hiển thị Pin theo thiết kế Screen 1 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Battery</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#00E5A3" style={{ marginVertical: 60 }} />
        ) : (
          <View style={styles.batteryWrapper}>
            {/* Cực dương của viên pin (núm pin) */}
            <View style={styles.batteryCap} />

            {/* Thân pin */}
            <View style={styles.batteryBody}>
              {/* Phần nước pin (màu xanh lá ngọc) */}
              <View
                style={[
                  styles.batteryFill,
                  {
                    height: `${fillPercentage}%`,
                  },
                ]}
              />

              {/* Số % hiển thị nổi bật ở giữa */}
              <View style={styles.textOverlay}>
                <Text style={styles.batteryPercentText}>{level}</Text>
                <Text style={styles.batteryUnitText}>%</Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.refreshButton}
          activeOpacity={0.7}
          onPress={fetchBattery}
        >
          <Text style={styles.refreshButtonText}>Cập nhật % pin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#262A30',
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D1D5DB',
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  batteryWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  batteryCap: {
    width: 32,
    height: 10,
    backgroundColor: '#374151',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 2,
  },
  batteryBody: {
    width: 140,
    height: 220,
    borderRadius: 22,
    backgroundColor: '#1E2227',
    borderWidth: 3,
    borderColor: '#3E4651',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  batteryFill: {
    width: '100%',
    backgroundColor: '#00E5A3',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  textOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryPercentText: {
    fontSize: 52,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  batteryUnitText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    marginTop: -4,
  },
  refreshButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#343A42',
    borderRadius: 14,
  },
  refreshButtonText: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '600',
  },
});
