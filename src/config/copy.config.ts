import { confirmado } from './campo.ts';

/**
 * Todos os textos da landing (copy deck v1, aprovado em 2026-10-01; ver
 * docs/COPY_DECK.md). Afirmações clínicas apontam para docs/pesquisa/.
 * Campos `aviso(...)` aparecem em preview com selo e somem em produção até
 * serem confirmados.
 */
export interface Fonte {
  readonly texto: string;
  readonly url?: string;
}

export interface Faq {
  readonly pergunta: string;
  readonly resposta: string;
  /** Registro em docs/pesquisa (não exibido; rastreabilidade). */
  readonly pesquisa?: string;
}

const LICARI: Fonte = { texto: 'Licari et al., Autism Research, 2020', url: 'https://doi.org/10.1002/aur.2230' };
const MORGAN: Fonte = { texto: 'Morgan et al., JAMA Pediatrics, 2021', url: 'https://doi.org/10.1001/jamapediatrics.2021.0878' };
const NOVAK: Fonte = { texto: 'Novak et al., JAMA Pediatrics, 2017', url: 'https://doi.org/10.1001/jamapediatrics.2017.1689' };
const CDC_AAP: Fonte = { texto: 'CDC e Academia Americana de Pediatria (Zubler et al., Pediatrics, 2022)', url: 'https://doi.org/10.1542/peds.2021-052138' };
const MS_TEA: Fonte = { texto: 'Ministério da Saúde, Diretrizes de Atenção à Reabilitação da Pessoa com TEA, 2014', url: 'http://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_atencao_reabilitacao_pessoa_autismo.pdf' };
const CADERNETA: Fonte = { texto: 'Ministério da Saúde, Caderneta da Criança, 7ª ed., 2024', url: 'https://www.gov.br/saude/caderneta-digital-da-crianca' };

export const copy = {
  hero: {
    titulo: confirmado('Fisioterapia para o desenvolvimento motor de crianças'),
    subtitulo: confirmado(
      'Atendo bebês e crianças em Lages (SC), ajudando cada uma a se movimentar, brincar e participar do dia a dia.',
    ),
  },

  sobre: {
    eyebrow: 'Quem sou',
    titulo: 'Prazer, sou o João Pedro',
    texto:
      'Sou fisioterapeuta, formado pela Uniplac, aqui em Lages. Fiz pós-graduação em Fisioterapia Neuropediátrica e mestrado em Ambiente e Saúde. Hoje atendo bebês e crianças na NeuroKids e no Centro Especializado em Reabilitação III (CER). No dia a dia, observo como cada criança se movimenta e, junto com a família, busco o que a ajuda a brincar, explorar o mundo e ganhar autonomia.',
    verifique: 'Meu registro pode ser conferido no Conselho Regional de Fisioterapia e Terapia Ocupacional (CREFITO).',
  },

  atua: {
    eyebrow: 'Com quem trabalho',
    titulo: 'Para quem é o atendimento',
    intro: 'Bebês e crianças que precisam de ajuda no movimento, em diferentes fases da vida.',
    areas: [
      {
        titulo: 'Desenvolvimento motor',
        texto:
          'Para quem está demorando para sentar, engatinhar, ficar em pé ou andar, ou tem dificuldade para correr e pular. Cada marco tem uma idade de referência, e eu acompanho o ritmo de cada criança.',
        fontes: [CDC_AAP],
      },
      {
        titulo: 'Neuropediatria',
        texto:
          'Para crianças com condições neurológicas que afetam o desenvolvimento. Nesses casos, as diretrizes recomendam começar cedo, assim que o diagnóstico é identificado.',
        fontes: [NOVAK, MORGAN],
      },
      {
        titulo: 'Fisioterapia no TEA',
        texto:
          'Trabalho coordenação, equilíbrio, aspectos sensório-motores e a participação nas brincadeiras e na rotina. A fisioterapia não trata o autismo em si; ela cuida do movimento, junto com a equipe que acompanha a criança. Dificuldades motoras são comuns em crianças autistas e muitas vezes passam despercebidas.',
        fontes: [LICARI, MS_TEA],
      },
    ],
    dado: {
      numero: '35%',
      texto: 'de 2.084 crianças autistas de até 6 anos apresentaram dificuldades motoras em um estudo populacional.',
      fonte: LICARI,
    },
  },

  atendimento: {
    eyebrow: 'Passo a passo',
    titulo: 'Como funciona o atendimento',
    intro: 'Tudo começa com uma boa conversa com a família.',
    etapas: [
      { titulo: 'Consulta fisioterapêutica', texto: 'Converso com vocês sobre a história e a rotina da criança e observo como ela se movimenta brincando.' },
      { titulo: 'Diagnóstico fisioterapêutico e plano terapêutico', texto: 'Juntos, definimos objetivos ligados ao dia a dia, como subir a escada da escola ou brincar no parquinho.' },
      { titulo: 'Atendimentos', texto: 'Para a criança, parece brincadeira. Cada atividade tem um propósito dentro do plano.' },
      { titulo: 'Reavaliação do plano', texto: 'De tempos em tempos revemos o plano e ajustamos o que for preciso.' },
      { titulo: 'A família junto', texto: 'Vocês saem com orientações simples para casa. As diretrizes recomendam definir as metas junto com os pais.' },
    ],
    duracaoFrequencia: confirmado('A duração e a frequência dos atendimentos a gente combina conversando, conforme o plano de cada criança.'),
    nota: 'Se a família autorizar, converso também com os outros profissionais que acompanham a criança.',
    fontes: [MORGAN],
  },

  porque: {
    eyebrow: 'Para os pais',
    titulo: 'Por que o movimento importa',
    texto:
      'A criança conhece o mundo se mexendo: rolando, engatinhando, subindo, caindo e levantando de novo. Nos primeiros anos o sistema nervoso está em plena formação, e por isso, quando há atraso ou risco, as diretrizes recomendam não esperar.',
    fontes: [NOVAK, MORGAN],
    ritmo: {
      texto:
        'Sentar, ficar em pé e andar não têm data marcada. Por isso, as referências mais atuais, revisadas em 2022 pelo CDC e pela Academia Americana de Pediatria, mostram a idade até a qual a maioria das crianças (pelo menos 3 em cada 4) já alcançou cada marco. Passou dessa idade? Vale conversar com o pediatra, sem esperar.',
    },
    caderneta: {
      titulo: 'Use a Caderneta da Criança',
      texto:
        'A Caderneta da Criança, do Ministério da Saúde, tem uma página para acompanhar os marcos do desenvolvimento. Vale levar nas consultas com o pediatra.',
      fonte: CADERNETA,
    },
    honestidade:
      'A fisioterapia é uma parte do cuidado, não o todo. Ela não substitui o pediatra e não tem prazo prometido. O plano acompanha o ritmo de cada criança.',
  },

  onde: {
    eyebrow: 'Endereços',
    titulo: 'Onde atendo',
    regiao: 'Os atendimentos acontecem na NeuroKids, no Centro de Lages.',
    notaMapa: 'O mapa abre no Google Maps, fora deste site.',
  },

  faq: {
    eyebrow: 'Perguntas frequentes',
    titulo: 'Perguntas frequentes',
    itens: [
      {
        pergunta: 'O que é fisioterapia neuropediátrica?',
        resposta:
          'A fisioterapia neuropediátrica é a área da fisioterapia que acompanha bebês e crianças com atraso no desenvolvimento motor ou com condições neurológicas que afetam o movimento. O trabalho envolve consulta fisioterapêutica, diagnóstico fisioterapêutico e um plano terapêutico com atividades e brincadeiras, sempre ligado à rotina da criança e combinado com a família.',
      },
      {
        pergunta: 'Quando procurar uma consulta fisioterapêutica para o meu filho?',
        resposta:
          'Vale procurar quando a família ou o pediatra percebem dificuldade para sentar, engatinhar, ficar em pé, andar ou se equilibrar, ou quando há uma condição neurológica diagnosticada. Os marcos motores acontecem em janelas de idade, mas os guias de acompanhamento recomendam conversar com um profissional assim que surgir a dúvida, sem esperar.',
        pesquisa: 'marcos-motores.md#3',
      },
      {
        pergunta: 'Meu filho ainda não anda. Isso é um problema?',
        resposta:
          'Não necessariamente. Pelas referências revisadas em 2022 pelo CDC e pela Academia Americana de Pediatria, pelo menos 3 em cada 4 crianças dão alguns passos sozinhas até os 15 meses e andam sem apoio até os 18 meses. Se a criança passou dessa idade, ou se há outras dificuldades motoras, o caminho é conversar com o pediatra e, se indicado, procurar uma consulta fisioterapêutica.',
        pesquisa: 'marcos-motores.md#3',
      },
      {
        pergunta: 'A fisioterapia trata o autismo?',
        resposta:
          'Não. A fisioterapia não trata, não cura e não reduz o autismo. Em crianças autistas, ela trabalha aspectos motores, como coordenação, equilíbrio e aspectos sensório-motores, além da participação nas atividades do dia a dia. Estudos mostram melhora de habilidades motoras com programas motores, mas a qualidade dessa evidência ainda é considerada baixa.',
        pesquisa: 'tea-aspectos-motores.md#4',
      },
      {
        pergunta: 'Por que começar cedo?',
        resposta:
          'Os primeiros anos de vida são uma fase de grande plasticidade do sistema nervoso. Para crianças com condições neurológicas, diretrizes internacionais recomendam começar a intervenção assim que o diagnóstico é identificado. Começar cedo não é garantia de resultado; significa aproveitar uma fase importante do desenvolvimento, com um plano terapêutico ajustado a cada criança.',
        pesquisa: 'fisioterapia-neuropediatrica.md#1,#2',
      },
      {
        pergunta: 'Como é a primeira consulta fisioterapêutica?',
        resposta:
          'Na primeira consulta fisioterapêutica, o fisioterapeuta conversa com a família sobre a história, a rotina e as preocupações, e observa como a criança se movimenta enquanto brinca. A partir disso, faz o diagnóstico fisioterapêutico e propõe um plano terapêutico com objetivos combinados com os pais. Levar exames e relatórios anteriores ajuda.',
      },
      {
        pergunta: 'Os pais participam dos atendimentos?',
        resposta:
          'Sim. A família faz parte do plano terapêutico: ajuda a definir os objetivos, recebe orientações para o dia a dia e acompanha a evolução. As diretrizes de intervenção precoce recomendam definir metas com os pais desde o início e fortalecer o papel da família no cuidado da criança.',
        pesquisa: 'familia-plano-terapeutico.md#1',
      },
      {
        pergunta: 'Quanto tempo dura o acompanhamento?',
        resposta:
          'A duração do acompanhamento fisioterapêutico varia de criança para criança e depende dos objetivos do plano terapêutico. O plano é revisto periodicamente com a família e ajustado conforme a resposta da criança. Por isso, não é possível prometer prazos; o que se combina são objetivos claros e momentos de revisão. O tempo e a frequência de cada atendimento também são combinados em conversa com o fisioterapeuta.',
      },
      {
        pergunta: 'Onde são os atendimentos?',
        resposta:
          'Os atendimentos de fisioterapia de João Pedro Frederes acontecem na NeuroKids, na Rua Frei Rogério, 394, Centro, Lages (SC). Ele também atua no Centro Especializado em Reabilitação III (CER). O endereço e o link do mapa estão na seção "Onde atendo" desta página. Para combinar horários, basta chamar no WhatsApp.',
      },
      {
        pergunta: 'Como entrar em contato?',
        resposta:
          'O contato com o fisioterapeuta João Pedro Frederes é feito pelo WhatsApp, pelo botão desta página, ou pelo Instagram @fisiofrederes.ped. Por privacidade, evite enviar exames ou informações de saúde da criança por mensagem antes da consulta fisioterapêutica; esses dados são tratados pessoalmente.',
      },
    ] satisfies readonly Faq[],
  },

  contato: {
    eyebrow: 'Contato',
    titulo: 'Vamos conversar?',
    texto:
      'É só chamar no WhatsApp. Para proteger a privacidade da criança, deixe exames e relatórios para o dia da consulta fisioterapêutica.',
    instagram: 'No Instagram eu compartilho dicas sobre desenvolvimento e um pouco da rotina dos atendimentos.',
  },
} as const;
