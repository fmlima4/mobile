import { Heading, VStack, Text } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Logo from "../assets/logo.svg"
import { Button } from "../components/Button";

export function New() {
    return (
        <VStack flex={1} bgColor="gray.900" p={7}>
            <Header title="Criar novo bolão" />
            <VStack mt={8} alignItems="center">
                <Logo />
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe com os amigos. 
                </Heading>

                <Input mb={2} placeholder="Qual o nome do seu bolão" />
                <Button title="Criar meu bolão"/>
                <Text color="gray.200" fontSize='sm' textAlign="center" px={10} mt={4}>
                    Após criar seu bolão voce recebera um código unico para compartilhar com outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}