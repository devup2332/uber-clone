import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-primary-100'>
      <Text className='text-center font-plus-b'>Hello world</Text>
    </SafeAreaView>
  );
}

