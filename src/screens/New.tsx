import { useState } from 'react'
import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Logo from "../assets/logo.svg"
import { Button } from "../components/Button";
import { api } from '../services/api'
// import { Alert } from 'react-native';

export function New() {
    const [poolTitle, setPoolTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    async function handlePoolCreate() {
        if(!poolTitle.trim()){
            return toast.show({
                title: 'Informe um nome para o seu bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setIsLoading(true)
            await api.post('/pools', {title: poolTitle})
            toast.show({
                title: 'Bolão criado com Sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })
            setPoolTitle('')
        } catch (error) {
            console.log(error)
            toast.show({
                title: 'não foi possivel criar o seu bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
                
        } finally {
            setIsLoading(false)
        }

    }



    return (
        <VStack flex={1} bgColor="gray.900" p={7}>
            <Header title="Criar novo bolão" />
            <VStack mt={8} alignItems="center">
                <Logo />
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe com os amigos. 
                </Heading>

                <Input mb={2} placeholder="Qual o nome do seu bolão" onChangeText={setPoolTitle} value={poolTitle}/>
                <Button title="Criar meu bolão" onPress={handlePoolCreate} isLoading={isLoading}/>
                <Text color="gray.200" fontSize='sm' textAlign="center" px={10} mt={4}>
                    Após criar seu bolão voce recebera um código unico para compartilhar com outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}