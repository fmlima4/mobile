import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
    return (
        <VStack flex={1} bgColor="gray.900" p={7}>
            <Header title="Encontrar bolão" showBackButton/>
            <VStack mt={8} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontrar bolão por código. 
                </Heading>

                <Input mb={2} placeholder="Código do bolão" />
                <Button title="Buscar bolão"/>
            </VStack>
        </VStack>
    )
}