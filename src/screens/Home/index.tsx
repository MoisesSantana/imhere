import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { style } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(inputValue))
      return Alert.alert(
        "Participante já existe",
        "Já existe um participante na lista com esse nome"
      );

    setParticipants((state) => [...state, inputValue]);
    setInputValue('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert(
      "Remover",
      `Deseja remover o participante ${name}?`,
      [{
        text: "Não",
        style: "cancel"
      }, {
        text: "Sim",
        onPress: () => {
          const newParticipants = participants.filter((participant) => participant !== name);
          setParticipants(newParticipants);
          Alert.alert('Removido', `Participante ${name} removido(a) com sucesso!`)
        }
      }]
    );
  }

  return (
    <View style={style.container}>
      <Text style={style.eventName}>Nome do evento</Text>
      <Text style={style.eventDate}>Sexta, 4 de Novembro de 2022</Text>
      <View style={style.form}>
        <TextInput
          style={style.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setInputValue}
          value={inputValue}
        />
        <TouchableOpacity
          style={style.btn}
          onPress={handleParticipantAdd}
        >
          <Text style={style.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* RENDERIZAÇÃO DE LISTAS */}

      {/* RENDERIZA APENAS O QUE ESTÁ VISÍVEL NA TELA */}
      <FlatList
        data={participants}
        keyExtractor={(participant) => participant}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={handleParticipantRemove}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={style.listEmptyText}>
            Nenhum participante adicionado.
          </Text>
        )}
      />

      {/* RENDERIZA TODOS OS ITENS DA LISTA */}
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map((participant) => (
            <Participant
              key={participant}
              name={participant}
              onRemove={handleParticipantRemove}
            />
          ))
        }
      </ScrollView> */}
    </View>
  );
}