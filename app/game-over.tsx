import MovingBackground from "@/components/MovingBackground";
import { useGame } from "@/hooks/game";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
   const { skin } = useGame();

    let imagemSkin = require("@/assets/images/batman.png");

    if (skin === 1) {
        imagemSkin = require("@/assets/images/batman.png");
    }

    if (skin === 2) {
        imagemSkin = require("@/assets/images/batman2.png");
    }

    if (skin === 3) {
        imagemSkin = require("@/assets/images/batman3.png");
    }

    if (skin === 4) {
        imagemSkin = require("@/assets/images/batman4.png");
    }

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.screen}>
        <Text
        style={styles.title}
        >
        game over
        </Text>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={["#FF8A00", "#FFD600"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>voltar ao menu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>

        <Image
          source={imagemSkin}
          style={styles.bird}
        />
      </SafeAreaView>
      <MovingBackground />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    marginTop: 30,
    fontFamily: "LuckiestGuy",
    textShadowColor: "rgb(255, 255, 255)",
    color: "gray",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 1,
    paddingRight: 3,

  },
  button: {
    borderRadius: 100,
    position: "absolute",
    top: "50%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textShadowColor: "black",
    fontFamily: "LilitaOne",
  },
  bird: {
    width: 70,
    height: 48,
    position: "absolute",
    top: "35%",
    left: "35%",
    transform: [{ rotate: "-20deg" }],
  },
});