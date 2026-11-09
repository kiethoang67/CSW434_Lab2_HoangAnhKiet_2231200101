import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { BatteryScreen } from './src/screens/BatteryScreen';
import { BrightnessScreen } from './src/screens/BrightnessScreen';

type TabType = 'brightness' | 'battery';

export default function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('battery');

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={activeTab === 'battery' ? 'light-content' : 'dark-content'} />

      {/* Nội dung màn hình theo Tab */}
      <View style={styles.content}>
        {activeTab === 'battery' ? <BatteryScreen /> : <BrightnessScreen />}
      </View>

      {/* Thanh Bottom Navigation chuẩn như hình ảnh trong đề */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => setActiveTab('brightness')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'brightness' && styles.tabTextActive,
            ]}
          >
            Brightness
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => setActiveTab('battery')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'battery' && styles.tabTextActive,
            ]}
          >
            Battery
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
});
