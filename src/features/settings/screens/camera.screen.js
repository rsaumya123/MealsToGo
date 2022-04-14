import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Avatar } from "react-native-paper";
import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 92%;
`;
const CameraView = styled(View)`
  align-items: center;
`;
export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <CameraView>
        <ProfileCamera
          ref={(camera) => (cameraRef.current = camera)}
          type={Camera.Constants.Type.front}
          ratio={"16:9"}
        />
        <TouchableOpacity onPress={snap}>
          <Avatar.Icon size={57} icon="camera-iris" backgroundColor="#808080" />
        </TouchableOpacity>
      </CameraView>
    </>
  );
};
