import { useEffect, useState } from 'react';
import { Share } from 'react-native'
import { VStack, useToast, HStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native"
import { Loading } from '../components/Loading';
import { api } from '../services/api'
import { PoolProps } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader';
import { Guesses } from '../components/Guesses';
import { Option } from '../components/Option';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

interface RouteParam {
    id: string;
}

export function Details(){
    const [selected, setSelected] = useState<'Seus Palpites' | 'Ranking Grupo'>('Seus Palpites')
    const route = useRoute();
    const toast = useToast();
    const { id } = route.params as RouteParam;
    const [isLoading, setIsLoading] = useState(true)
    const [poolDetails, setPoolDetails] = useState<PoolProps>({} as PoolProps)

    async function fetchPoolDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'não foi possivel carregar os dados desse bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPoolDetails()
    }, [id])
    
    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900" p={7} >
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare}/>
            {
                poolDetails._count?.participants > 0 ? 
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails}/>
                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5} >
                        <Option title="Seus Palpites" isSelected={selected === 'Seus Palpites'} onPress={() => setSelected('Seus Palpites')}/>
                        <Option title="Ranking Grupo" isSelected={selected === 'Ranking Grupo'} onPress={() => setSelected('Ranking Grupo')}/>
                    </HStack>

                    <Guesses poolId={poolDetails.id}/>
                </VStack>
                :
                <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    )
}