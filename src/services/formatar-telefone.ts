import { DddInvalido } from "@/use-cases/@errors/erro-ddd-invalido";
import { TelefoneDeveConterOzeDigitos } from "@/use-cases/@errors/erro-telefone-deve-ter-11-digitos";

export function validarEFormatarTelefone(telefone: string): string {
    // Remove qualquer caractere que não seja número
    telefone = telefone.replace(/\D/g, '');

    // Verifica se o telefone tem 10 ou 11 dígitos (com ou sem DDD)
    if (telefone.length !== 10 && telefone.length !== 11) {
        throw new TelefoneDeveConterOzeDigitos();
    }

    // Verifica se o número começa com um DDD válido (considerando os DDDs comuns no Brasil)
    const dddValido = validarDDD(telefone.substring(0, 2));
    if (!dddValido) {
        throw new DddInvalido();
    }

    // Formata o telefone no padrão (##) #####-####
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    // Formata o telefone no padrão (##) ####-####
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
}

function validarDDD(ddd: string): boolean {
    // Lista de DDDs válidos no Brasil
    const dddValidos = [
        '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
        '21', '22', '24', // RJ
        '27', '28', // ES
        '31', '32', '33', '34', '35', '37', '38', // MG
        '41', '42', '43', '44', '45', '46', // PR
        '47', '48', '49', // SC
        '51', '53', '54', '55', // RS
        '61', '62', '64', '63', '65', '66', '67', // Centro-Oeste
        '71', '73', '74', '75', '77', // BA
        '79', // SE
        '81', '87', // PE
        '82', // AL
        '83', // PB
        '84', // RN
        '85', '88', // CE
        '86', '89', // PI
        '91', '93', '94', // PA
        '92', '97', // AM
        '95', // RR
        '96', // AP
        '98', '99' // MA
    ];

    return dddValidos.includes(ddd);
}
