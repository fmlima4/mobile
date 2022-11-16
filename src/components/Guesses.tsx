import { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';
import { api } from '../services/api'
import { useRoute } from "@react-navigation/native"
import { Loading } from '../components/Loading';
import { Game, GameProps } from '../components/Game';
import { EmptyMyPoolList } from './EmptyMyPoolList';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const toast = useToast();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  async function fetchGames(){
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      console.log('asdasd', response.data.games)
      setGames(response.data.games)

      }catch (error) {
        console.log(error);
        toast.show({
            title: 'não foi possivel carregar os jogos',
            placement: 'top',
            bgColor: 'red.500'
        })
    } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames();  
  }, [poolId])
  
  async function handleGuessConfirm(gameId: string){
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        return toast.show({
          title: 'informe o palpite para ambos os times',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/pools/${poolId}/${gameId}/guesses`, {
        firstTeamPoints: firstTeamPoints,
        secondTeamPoints: secondTeamPoints
      });

      toast.show({
        title: 'palpite criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      fetchGames();  
      
    } catch (error) {
      console.log(error);
      toast.show({
          title: 'não foi possivel enviar o palpite',
          placement: 'top',
          bgColor: 'red.500'
      })
    }
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{pb: 10}}
      ListEmptyComponent={() => <EmptyMyPoolList code={'123'}/>}
    />
  );
}
