import { useState } from 'react';
import { Heading, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from '../services/api'
import { useNavigation } from '@react-navigation/native';

export function Find() {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const toast = useToast()
    const { navigate } = useNavigation();

    async function handleJoinPool(){
        try {
            setIsLoading(true);

            if(!code.trim()){
                return toast.show({
                    title: 'Informe um codigo para buscar o seu bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/pools/join', {code})

            toast.show({
                title: 'Voce entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

            navigate('pools')

        } catch (error) {
            console.log(error);
            setIsLoading(false);

            if(error.response?.data?.message == 'poll not found'){
                return toast.show({
                    title: 'não foi possivel encontrar o bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            if(error.response?.data?.message == 'you already joined this poll'){
                return toast.show({
                    title: 'voce ja esta nesse bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }
           
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900" p={7}>
            <Header title="Encontrar bolão" showBackButton/>
            <VStack mt={8} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontrar bolão por código. 
                </Heading>

                <Input mb={2} placeholder="Código do bolão" value={code} onChangeText={setCode} autoCapitalize="characters" />
                <Button title="Buscar bolão" onPress={handleJoinPool} isLoading={isLoading} />
            </VStack>
        </VStack>
    )
}