import GoogleTextInput from "@/components/GoogleTextInput";
import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <FlatList
        data={recentRides}
        ListHeaderComponent={() => (
          <Text className="text-3xl font-plus-b">All Rides</Text>
        )}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
          flexGrow: 1,
          gap: 20,
        }}
        renderItem={({ item }) => <RideCard ride={item} />}
      />
    </SafeAreaView>
  );
};

export default Rides;
