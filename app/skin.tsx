
import { useGame } from "@/hooks/game";
import { router } from "expo-router";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const skins = [
  {
    id: 1,
    nome: "Batman Clássico",
    cor: "Preto",
    preco: 0,
    imagem: require("@/assets/images/batman.png"),
  },
  {
    id: 2,
    nome: "Batman Vermelho",
    cor: "Vermelho",
    preco: 5,
    imagem: require("@/assets/images/batman2.png"),
  },
  {
    id: 3,
    nome: "Batman Azul",
    cor: "Azul",
    preco: 7,
    imagem: require("@/assets/images/batman3.png"),
  },
  {
    id: 4,
    nome: "Batman Dourado",
    cor: "Dourado",
    preco: 10,
    imagem: require("@/assets/images/batman4.png"),
  },
];

export default function Skin() {
  const {
    skin,
    setSkin,
    highscore,
    coins,
    ownedSkins,
    buySkin,
  } = useGame();

  function selecionarSkin(
    id: number,
    preco: number
  ) {
    const comprada = ownedSkins.includes(id);

    if (comprada) {
      setSkin(id);
      router.replace("/");
      return;
    }

    if (coins < preco) {
      const faltam = preco - coins;

      Alert.alert(
        "Moedas insuficientes",
        `Você precisa de mais ${faltam} moeda${
          faltam !== 1 ? "s" : ""
        } para desbloquear esta skin.`
      );

      return;
    }

    const comprou = buySkin(id, preco);

    if (comprou) {
      router.replace("/");
    }
  }

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.screen}>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              SKINS
            </Text>

            <Text style={styles.subtitle}>
              Escolha seu personagem
            </Text>
          </View>

          <View style={styles.coinBox}>
            <Text style={styles.coinIcon}>
              🪙
            </Text>

            <View>
              <Text style={styles.coinLabel}>
                MOEDAS
              </Text>

              <Text style={styles.coinValue}>
                {coins}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.stats}>
          <Text style={styles.highscore}>
            🏆 Melhor: {highscore}
          </Text>

          <Text style={styles.selected}>
            ⭐{" "}
            {
              skins.find(
                (item) => item.id === skin
              )?.nome
            }
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {skins.map((item) => {
            const comprada =
              ownedSkins.includes(item.id);

            const selecionada =
              skin === item.id;

            const faltam =
              item.preco - coins;

            const podeComprar =
              coins >= item.preco;

            return (
              <Pressable
                key={item.id}
                onPress={() =>
                  selecionarSkin(
                    item.id,
                    item.preco
                  )
                }
                style={({ pressed }) => [
                  styles.card,
                  selecionada &&
                    styles.cardSelected,
                  pressed &&
                    styles.cardPressed,
                ]}
              >
                {selecionada && (
                  <View style={styles.selectedBadge}>
                    <Text
                      style={styles.selectedBadgeText}
                    >
                      EQUIPADA
                    </Text>
                  </View>
                )}

                {!comprada &&
                  item.preco > 0 && (
                    <View style={styles.lockBadge}>
                      <Text style={styles.lock}>
                        🔒
                      </Text>
                    </View>
                  )}

                <View style={styles.imageContainer}>
                  <Image
                    source={item.imagem}
                    style={styles.skinImage}
                  />
                </View>

                <Text style={styles.skinName}>
                  {item.nome}
                </Text>

                <Text style={styles.skinColor}>
                  {item.cor}
                </Text>

                <View style={styles.priceContainer}>
                  {item.preco === 0 ? (
                    <Text style={styles.free}>
                      GRÁTIS
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.priceIcon}>
                        🪙
                      </Text>

                      <Text style={styles.price}>
                        {item.preco}
                      </Text>
                    </>
                  )}
                </View>

                {!comprada &&
                  item.preco > 0 && (
                    <Text
                      style={[
                        styles.requirement,
                        podeComprar
                          ? styles.canBuy
                          : styles.cannotBuy,
                      ]}
                    >
                      {podeComprar
                        ? "Toque para comprar"
                        : `Faltam ${faltam} moedas`}
                    </Text>
                  )}

                {comprada &&
                  !selecionada && (
                    <View style={styles.useButton}>
                      <Text
                        style={styles.useButtonText}
                      >
                        USAR SKIN
                      </Text>
                    </View>
                  )}

                {selecionada && (
                  <View
                    style={styles.equippedButton}
                  >
                    <Text
                      style={styles.equippedText}
                    >
                      ✓ EM USO
                    </Text>
                  </View>
                )}

                {!comprada &&
                  item.preco > 0 && (
                    <View
                      style={[
                        styles.buyButton,
                        !podeComprar &&
                          styles.buyButtonDisabled,
                      ]}
                    >
                      <Text
                        style={
                          styles.buyButtonText
                        }
                      >
                        {podeComprar
                          ? "COMPRAR"
                          : "BLOQUEADA"}
                      </Text>
                    </View>
                  )}
              </Pressable>
            );
          })}
        </View>

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
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 42,
    fontFamily: "LuckiestGuy",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowRadius: 3,
  },

  subtitle: {
    color: "white",
    fontSize: 14,
    fontFamily: "LilitaOne",
    opacity: 0.9,
    marginTop: -3,
  },

  coinBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: "#FFD600",
  },

  coinIcon: {
    fontSize: 27,
    marginRight: 7,
  },

  coinLabel: {
    color: "#FFD600",
    fontSize: 10,
    fontFamily: "LilitaOne",
  },

  coinValue: {
    color: "white",
    fontSize: 19,
    fontFamily: "LilitaOne",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 12,
    paddingHorizontal: 5,
  },

  highscore: {
    color: "white",
    fontSize: 15,
    fontFamily: "LilitaOne",
  },

  selected: {
    color: "#FFD600",
    fontSize: 15,
    fontFamily: "LilitaOne",
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  card: {
    width: "48%",
    minHeight: 225,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },

  cardSelected: {
    borderWidth: 3,
    borderColor: "#FFD600",
  },

  cardPressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  imageContainer: {
    width: "100%",
    height: 90,
    backgroundColor: "#E8F3F7",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },

  skinImage: {
    width: 105,
    height: 80,
    resizeMode: "contain",
  },

  skinName: {
    color: "#222",
    fontSize: 16,
    fontFamily: "LilitaOne",
    textAlign: "center",
  },

  skinColor: {
    color: "#777",
    fontSize: 13,
    fontFamily: "LilitaOne",
    marginTop: 1,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  priceIcon: {
    fontSize: 16,
    marginRight: 3,
  },

  price: {
    color: "#D99400",
    fontSize: 17,
    fontFamily: "LilitaOne",
  },

  free: {
    color: "#20A05A",
    fontSize: 17,
    fontFamily: "LilitaOne",
  },

  requirement: {
    fontSize: 11,
    fontFamily: "LilitaOne",
    marginTop: 3,
    textAlign: "center",
  },

  canBuy: {
    color: "#20A05A",
  },

  cannotBuy: {
    color: "#D94A4A",
  },

  buyButton: {
    width: "90%",
    backgroundColor: "#FFAA00",
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: "center",
    marginTop: 6,
  },

  buyButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },

  buyButtonText: {
    color: "white",
    fontSize: 13,
    fontFamily: "LilitaOne",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
  },

  useButton: {
    width: "90%",
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: "center",
    marginTop: 6,
  },

  useButtonText: {
    color: "white",
    fontSize: 13,
    fontFamily: "LilitaOne",
  },

  equippedButton: {
    width: "90%",
    backgroundColor: "#20A05A",
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: "center",
    marginTop: 6,
  },

  equippedText: {
    color: "white",
    fontSize: 13,
    fontFamily: "LilitaOne",
  },

  selectedBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#20A05A",
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 2,
  },

  selectedBadgeText: {
    color: "white",
    fontSize: 9,
    fontFamily: "LilitaOne",
  },

  lockBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  lock: {
    fontSize: 14,
  },
});
