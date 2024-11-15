import { CepInvalido } from "@/use-cases/@errors/erro-cep-invalido";

export function validarEFormatarCEP(cep: string): string {
    // Remove qualquer caractere que não seja número
    cep = cep.replace(/\D/g, '');

    // Verifica se o CEP tem exatamente 8 dígitos
    if (cep.length !== 8) {
        throw new CepInvalido();
    }

    // Formata o CEP no padrão #####-###
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}
