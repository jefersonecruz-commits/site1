
import MovingBackground from "@/components/MovingBackground";
import { useGame } from "@/hooks/game";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const {
    reset,
    highscore,
    coins,
    skin,
  } = useGame();

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
      {/* FUNDO */}
      <MovingBackground />

      {/* CONTEÚDO */}
      <SafeAreaView style={styles.screen}>

        {/* STATUS */}
        <View style={styles.topBar}>

          <View style={styles.statBox}>
            <Text style={styles.statIcon}>
              🏆
            </Text>

            <View>
              <Text style={styles.statLabel}>
                MELHOR
              </Text>

              <Text style={styles.statValue}>
                {highscore}
              </Text>
            </View>
          </View>

          <View style={styles.coinBox}>
            <Text style={styles.statIcon}>
              🪙
            </Text>

            <View>
              <Text style={styles.statLabel}>
                MOEDAS
              </Text>

              <Text style={styles.statValue}>
                {coins}
              </Text>
            </View>
          </View>

        </View>

        {/* TÍTULO */}
        <View style={styles.titleContainer}>

          <Text style={styles.title}>
            FLAPPY
          </Text>

          <Text style={styles.titleSecond}>
            BATMAN
          </Text>

          <Text style={styles.subtitle}>
            DESVIE DOS CANOS!
          </Text>

        </View>

        {/* PERSONAGEM */}
        <View style={styles.characterArea}>

          <View style={styles.glow} />

          <Image
            source={imagemSkin}
            style={styles.bird}
          />

          <View style={styles.characterLabel}>
            <Text style={styles.characterLabelText}>
              SKIN ATUAL
            </Text>
          </View>

        </View>

        {/* BOTÕES */}
        <View style={styles.buttons}>

          {/* JOGAR */}
          <Link
            href="/play"
            asChild
            replace
          >
            <Pressable
              onPress={reset}
              style={({ pressed }) => [
                styles.playButton,
                pressed && styles.pressed,
              ]}
            >
              <LinearGradient
                colors={[
                  "#FFD600",
                  "#FF9800",
                ]}
                style={styles.playGradient}
              >

                <Text style={styles.playIcon}>
                  ▶
                </Text>

                <Text style={styles.playText}>
                  JOGAR
                </Text>

              </LinearGradient>
            </Pressable>
          </Link>

          {/* SKINS */}
          <Link
            href="/skin"
            asChild
            replace
          >
            <Pressable
              style={({ pressed }) => [
                styles.skinButton,
                pressed && styles.pressed,
              ]}
            >

              <View style={styles.skinButtonContent}>

                <Text style={styles.skinIcon}>
                  🦇
                </Text>

                <View style={styles.skinTexts}>

                  <Text style={styles.skinButtonTitle}>
                    SKINS
                  </Text>

                  <Text style={styles.skinButtonSubtitle}>
                    Personalize seu Batman
                  </Text>

                </View>

                <Text style={styles.arrow}>
                  ›
                </Text>

              </View>

            </Pressable>
          </Link>

        </View>

        {/* RODAPÉ */}
        <Text style={styles.footer}>
          FAÇA O MAIOR SCORE!
        </Text>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  /* =========================
     STATUS
  ========================= */

  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  statBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.65)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",

    borderRadius: 13,

    paddingHorizontal: 9,
    paddingVertical: 5,

    minWidth: 92,
  },

  coinBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.65)",

    borderWidth: 1.5,
    borderColor: "#FFD600",

    borderRadius: 13,

    paddingHorizontal: 9,
    paddingVertical: 5,

    minWidth: 92,
  },

  statIcon: {
    fontSize: 18,
    marginRight: 5,
  },

  statLabel: {
    color: "#CFCFCF",
    fontSize: 7,
    fontFamily: "LilitaOne",
  },

  statValue: {
    color: "white",
    fontSize: 16,
    fontFamily: "LilitaOne",
  },

  /* =========================
     TÍTULO
  ========================= */

  titleContainer: {
    alignItems: "center",
    marginTop: 8,
  },

  title: {
    fontSize: 38,
    lineHeight: 39,

    fontFamily: "LuckiestGuy",

    color: "#FFD600",

    textShadowColor: "black",
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 2,
  },

  titleSecond: {
    fontSize: 34,
    lineHeight: 35,

    fontFamily: "LuckiestGuy",

    color: "white",

    textShadowColor: "black",
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 2,
  },

  subtitle: {
    marginTop: 2,

    color: "white",

    fontSize: 9,

    letterSpacing: 1.2,

    fontFamily: "LilitaOne",

    opacity: 0.9,
  },

  /* =========================
     PERSONAGEM
  ========================= */

  characterArea: {
    width: 180,
    height: 125,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 1,
  },

  glow: {
    position: "absolute",

    width: 105,
    height: 105,

    borderRadius: 100,

    backgroundColor:
      "rgba(255,214,0,0.16)",

    shadowColor: "#FFD600",
    shadowOpacity: 0.6,
    shadowRadius: 25,

    elevation: 7,
  },

  bird: {
    width: 120,
    height: 85,

    resizeMode: "contain",

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  characterLabel: {
    position: "absolute",

    bottom: 0,

    backgroundColor:
      "rgba(0,0,0,0.7)",

    paddingHorizontal: 10,
    paddingVertical: 3,

    borderRadius: 15,

    borderWidth: 1,
    borderColor:
      "rgba(255,214,0,0.7)",
  },

  characterLabelText: {
    color: "#FFD600",

    fontSize: 8,

    fontFamily: "LilitaOne",

    letterSpacing: 0.8,
  },

  /* =========================
     BOTÕES
  ========================= */

  buttons: {
    width: "100%",
    height: "100%",

    marginTop: 3,
    gap: 8,
  },

  /* JOGAR */

  playButton: {
    width: "100%",
    height: 50,

    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },

  playGradient: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  playIcon: {
    color: "white",

    fontSize: 18,

    marginRight: 7,

    textShadowColor:
      "rgba(0,0,0,0.45)",

    textShadowOffset: {
      width: 1,
      height: 1,
    },

    textShadowRadius: 2,
  },

  playText: {
    color: "white",

    fontSize: 23,

    fontFamily: "LilitaOne",

    letterSpacing: 1,

    textShadowColor:
      "rgba(0,0,0,0.45)",

    textShadowOffset: {
      width: 1,
      height: 2,
    },

    textShadowRadius: 2,
  },

  /* SKINS */

  skinButton: {
    width: "100%",
    height: 50,

    backgroundColor:
      "rgba(10,10,15,0.86)",

    borderRadius: 15,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.2)",

    shadowColor: "black",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.3,

    shadowRadius: 4,

    elevation: 5,
  },

  skinButtonContent: {
    height: "50%",

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,
  },

  skinIcon: {
    fontSize: 23,

    marginRight: 9,
  },

  skinTexts: {
    justifyContent: "center",
  },

  skinButtonTitle: {
    color: "white",

    fontSize: 17,

    fontFamily: "LilitaOne",
  },

  skinButtonSubtitle: {
    color: "#AFAFAF",

    fontSize: 8,

    marginTop: -1,

    fontFamily: "LilitaOne",
  },

  arrow: {
    marginLeft: "auto",

    color: "#FFD600",

    fontSize: 29,

    lineHeight: 30,
  },

  pressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],

    opacity: 0.9,
  },

  /* =========================
     RODAPÉ
  ========================= */

  footer: {
    position: "absolute",

    bottom: 5,

    color:
      "rgba(255,255,255,0.55)",

    fontSize: 7,

    letterSpacing: 0.7,

    fontFamily: "LilitaOne",
  },
});

