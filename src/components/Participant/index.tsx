import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";

type ParticipantProps = {
  name: string;
  onRemove: (name: string) => void;
};

export function Participant({ name, onRemove }: ParticipantProps) {
  return (
    <View style={style.container}>
      <Text style={style.name}>{name}</Text>
      <TouchableOpacity
        style={style.btn}
        onPress={() => onRemove(name) }
      >
        <Text style={style.btnText}>-</Text>
      </TouchableOpacity>
    </View>
  )
}