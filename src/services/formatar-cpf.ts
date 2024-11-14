import { CpfDeveConterOzeDigitos } from "@/use-cases/@errors/erro-cpf-deve-ter-11-digitos";
import { CpfInvalido } from "@/use-cases/@errors/erro-cpf-inválido";

export function validarFormatarCPF(cpf: string): string {
    // Remove qualquer caractere que não seja número
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        throw new CpfDeveConterOzeDigitos();
    }

    // Validação dos dígitos verificadores do CPF
    const isCPFValid = validarCPF(cpf);

    if (!isCPFValid) {
        throw new CpfInvalido();
    }

    // Formata o CPF no padrão ###.###.###-##
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function validarCPF(cpf: string): boolean {
    // Verificação de CPF inválido que pode passar na formatação
    const invalidCPFList = [
        '00000000000', '11111111111', '22222222222', '33333333333',
        '44444444444', '55555555555', '66666666666', '77777777777',
        '88888888888', '99999999999'
    ];

    if (invalidCPFList.includes(cpf)) return false;

    // Cálculo do primeiro dígito verificador
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}
