import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  bio,
  container,
  eachHead,
  editBtn,
  followers,
  head1,
  head2,
  headCont,
  imageCardCont,
  lowerCard,
  name,
  nameCard,
  subHead,
  topHead,
  username,
} from "./profilecss";
import { Ionicons } from "@expo/vector-icons";
import defaultImg from "../../assets/profileicondefault.png";
import { Divider } from "react-native-elements";
import Posts from "../../components/home/Posts";
import SubHeader from "../../components/home/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getmyProfile } from "../../redux/slices/appConfigSlice";
import { getMyposts } from "../../redux/slices/userSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreenLoading from "../LoadingScreens/HomeScreenLoading";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const dispatch = useDispatch();
  const data = useSelector((s) => s.appConfigReducer.myProfile);

  // useEffect(() => {
  //   dispatch(getmyProfile());
  // }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getmyProfile());
    }, [])
  );

  function displayCard() {
    switch (activeTab) {
      case "Posts":
        return <PostsCard />;
      case "People":
        return <PeopleCard />;
      default:
        return;
    }
  }

  return (
    <SafeAreaView style={container}>
      {/* <Head data={data} /> */}
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 15,
          paddingBottom: 5,

          backgroundColor: "rgba(0,0,0,1)",
        }}
      >
        <ProfileCard data={data} />
        <AboutCard data={data} />
        <FollowerCard data={data} />
        <OptionsBar data={data} setActiveTab={setActiveTab} />
      </View>

      <Divider width={.5} color="rgba(250,250,250,.2)" />
      <View style={lowerCard}>
        <ScrollView>{displayCard()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Head = ({ data }) => {
  const navigation = useNavigation();
  async function handleLogout() {
    AsyncStorage.removeItem("accessstoken").then(async () => {
      console.log("log",await AsyncStorage.getItem("accessstoken"));
      navigation.navigate("AuthStack", { screen: "Login"});
    });
  }
  return (
    <View style={headCont}>
      <View>
        <Ionicons name="caret-back" size={30} color="white" />
      </View>
      <View style={subHead}>
        <Text style={head1}>{data?.name}</Text>
        <Text style={head2}>{data?.posts?.length} posts</Text>
      </View>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

const ProfileCard = ({ data }) => {
  const navigation = useNavigation();
  // console.log(data.avatar);
  return (
    <View style={imageCardCont}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: data?.avatar }}
          style={{
            width: 75,
            aspectRatio: 1,
            resizeMode: "cover",
            borderRadius: 100,
            borderColor: "rgba(255,255,255,.3)",
            borderWidth: 2,
          }}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditProfile", {
              name: data.name,
              username: data.username,
              bio: data.bio,
              avatar: data.avatar,
            })
          }
        >
          <Text style={editBtn}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={nameCard}>
        <Text style={name}>{data?.name}</Text>
        <Text style={username}>{data?.username}</Text>
      </View>
    </View>
  );
};

const AboutCard = ({ data }) => (
  <View>
    <Text style={bio}>{data?.bio}</Text>

    {/* <View style={linksCont}>
      <Text style={links}>instagram</Text>
      <Text style={links}>instagram</Text>
      <Text style={links}>instagram</Text>
    </View> */}
  </View>
);
const FollowerCard = ({ data }) => (
  <View style={{ flexDirection: "row", gap: 30, paddingVertical: 10 }}>
    <Text style={followers}>{data?.followers?.length} followers</Text>

    <Text style={followers}>{data?.followings?.length} followings</Text>
    <Text style={followers}>{data?.posts?.length} posts</Text>
  </View>
);

const OptionsBar = ({ setActiveTab, data }) => (
  <View style={topHead}>
    <Pressable onPress={() => setActiveTab("Posts")}>
      <Text style={eachHead}>Posts</Text>
    </Pressable>
    <Divider width={1} color="rgba(255,255,255,.2)" orientation="vertical" />

    <Pressable onPress={() => setActiveTab("People")}>
      <Text style={eachHead}>People</Text>
    </Pressable>
  </View>
);
const PostsCard = () => {
  const data = useSelector((s) => s.userReducer.myPosts);
  const dispatch = useDispatch();
  const isLoading = useSelector((s) => s.userReducer.isLoading);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyposts());
    }, [])
  );
  if (isLoading) {
    return <HomeScreenLoading />;
  }

  return (
    <ScrollView>
      {data?.map((item, i) => (
        <Posts post={item} key={i} />
      ))}
    </ScrollView>
  );
};

const PeopleCard = () => (
  <ScrollView>
    <Text>Coming soon</Text>
  </ScrollView>
);

export default ProfileScreen;
