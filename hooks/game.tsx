
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dimensions } from "react-native";
import {
  SharedValue,
  useSharedValue,
} from "react-native-reanimated";

interface GameContextProps {
  birdY: SharedValue<number>;
  velocity: SharedValue<number>;

  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;

  highscore: number;

  reset: () => void;
  gameOver: () => void;

  skin: number;
  setSkin: (id: number) => void;

  coins: number;
  addCoin: () => void;

  ownedSkins: number[];
  buySkin: (skinId: number, price: number) => boolean;
}

const GameContext = createContext(
  {} as GameContextProps
);

export function GameProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { height } = Dimensions.get("window");

  const birdY = useSharedValue(height / 2);
  const velocity = useSharedValue(0);

  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const [skin, setSkinState] = useState(1);

  const [coins, setCoins] = useState(0);

  const [ownedSkins, setOwnedSkins] =
    useState<number[]>([1]);

  const hitAudio = useAudioPlayer(
    require("@/assets/audios/h.mp3")
  );

  useEffect(() => {
    async function loadData() {
      try {
        const savedHighscore =
          await AsyncStorage.getItem("highscore");

        const savedCoins =
          await AsyncStorage.getItem("coins");

        const savedSkins =
          await AsyncStorage.getItem("ownedSkins");

        const savedSkin =
          await AsyncStorage.getItem("skin");

        if (savedHighscore !== null) {
          setHighscore(
            Number(savedHighscore)
          );
        }

        if (savedCoins !== null) {
          setCoins(
            Number(savedCoins)
          );
        }

        if (savedSkins !== null) {
          setOwnedSkins(
            JSON.parse(savedSkins)
          );
        }

        if (savedSkin !== null) {
          setSkinState(
            Number(savedSkin)
          );
        }
      } catch (error) {
        console.log(
          "Erro ao carregar dados:",
          error
        );
      }
    }

    loadData();
  }, []);

  function reset() {
    setScore(0);

    birdY.value = height / 2;
    velocity.value = 0;
  }

  function addCoin() {
    setCoins((oldValue) => {
      const newValue = oldValue + 1;

      AsyncStorage.setItem(
        "coins",
        newValue.toString()
      );

      return newValue;
    });
  }

  function selectSkin(id: number) {
    if (!ownedSkins.includes(id)) {
      return;
    }

    setSkinState(id);

    AsyncStorage.setItem(
      "skin",
      id.toString()
    );
  }

  function buySkin(
    skinId: number,
    price: number
  ) {
    if (ownedSkins.includes(skinId)) {
      selectSkin(skinId);

      return true;
    }

    if (coins < price) {
      return false;
    }

    const newCoins =
      coins - price;

    const newOwnedSkins = [
      ...ownedSkins,
      skinId,
    ];

    setCoins(newCoins);

    setOwnedSkins(
      newOwnedSkins
    );

    setSkinState(skinId);

    AsyncStorage.setItem(
      "coins",
      newCoins.toString()
    );

    AsyncStorage.setItem(
      "ownedSkins",
      JSON.stringify(
        newOwnedSkins
      )
    );

    AsyncStorage.setItem(
      "skin",
      skinId.toString()
    );

    return true;
  }

  async function gameOver() {
    try {
      hitAudio.seekTo(0);
      hitAudio.play();
    } catch (error) {}

    if (score > highscore) {
      setHighscore(score);

      try {
        await AsyncStorage.setItem(
          "highscore",
          score.toString()
        );
      } catch (error) {
        console.log(
          "Erro ao salvar highscore:",
          error
        );
      }
    }

    router.replace(
      "/game-over"
    );
  }

  return (
    <GameContext.Provider
      value={{
        birdY,
        velocity,

        score,
        setScore,

        highscore,

        reset,
        gameOver,

        skin,
        setSkin: selectSkin,

        coins,
        addCoin,

        ownedSkins,
        buySkin,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () =>
  useContext(GameContext);

export default GameContext;
