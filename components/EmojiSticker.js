import { View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
// import { TapGestureHandler, State } from "react-native-gesture-handler";

export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize);

  const doubleTapHandler = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = withSpring(imageSize * 2);
      }
    }
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: scaleImage.value,
      height: scaleImage.value,
    };
  });

  return (
    <View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}>
      <Animated.Image
        source={stickerSource}
        resizeMode="contain"
        style={[imageStyle, { width: imageSize, height: imageSize }]}
      />
      </GestureDetector>
    </View>
  );
}
