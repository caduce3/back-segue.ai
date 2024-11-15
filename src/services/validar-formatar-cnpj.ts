import { CnpjInvalido } from "@/use-cases/@errors/erro-cnpj-invalido";

export function validarEFormatarCNPJ(cnpj: string): string {
    // Remove qualquer caractere que não seja número
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ tem exatamente 14 dígitos
    if (cnpj.length !== 14) {
        throw new CnpjInvalido();
    }

    // Verifica se o CNPJ é válido
    if (!validarCNPJ(cnpj)) {
        throw new CnpjInvalido();
    }

    // Formata o CNPJ no padrão ##.###.###/####-##
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function validarCNPJ(cnpj: string): boolean {
    // Rejeita CNPJs com todos os dígitos iguais (como 11111111111111, 00000000000000, etc.)
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != parseInt(digitos.charAt(1))) return false;

    return true;
}
