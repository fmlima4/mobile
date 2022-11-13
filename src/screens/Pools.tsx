import { useCallback, useState } from 'react';
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useNavigation } from '@react-navigation/native'
import { api } from '../services/api'
import { PoolCard, PoolProps } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { Loading } from '../components/Loading';
import { useFocusEffect } from '@react-navigation/native';

export function Pools() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true)
    const [pools, setPools] = useState<PoolProps[]>([])
    const toast = useToast()

    async function fetchPools() {
        try {
            setIsLoading(true);
            const responsePools = await api.get('/pools')
            console.log(responsePools.data.pools);
            setPools(responsePools.data.pools)
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'não foi possivel carregar os boloes',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);

        }
    }

    useFocusEffect(useCallback(() => {
        fetchPools();
    }, []))

    return (
        <VStack flex={1} bgColor="gray.900" p={7}>
            <Header title="Meus Bolões" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button 
                    title="Buscar bolão" 
                    leftIcon={
                    <Icon 
                        as={Octicons} name="search" color="black" size="md"
                    />}
                    onPress={() => navigation.navigate('find')}
                />
            </VStack>
            {
                isLoading ? <Loading /> :
                <FlatList 
                    data={pools}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <PoolCard 
                            data={item}
                            onPress={() => navigation.navigate('details', { id: item.id })} 
                        />
                    )}
                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{pb: 10}}
                    ListEmptyComponent={() => <EmptyPoolList /> }
                />
            }
        </VStack>
    )
}