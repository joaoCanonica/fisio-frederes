import { aviso, confirmado } from './campo.ts';

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
const OMS: Fonte = { texto: 'OMS, WHO Motor Development Study, 2006', url: 'https://www.who.int/tools/child-growth-standards/standards/motor-development-milestones' };
const MS_TEA: Fonte = { texto: 'Ministério da Saúde, Diretrizes de Atenção à Reabilitação da Pessoa com TEA, 2014', url: 'http://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_atencao_reabilitacao_pessoa_autismo.pdf' };
const CADERNETA: Fonte = { texto: 'Ministério da Saúde, Caderneta da Criança, 7ª ed., 2024', url: 'https://www.gov.br/saude/caderneta-digital-da-crianca' };

export const copy = {
  hero: {
    titulo: aviso(
      'Fisioterapia para o desenvolvimento motor de crianças',
      'Título do hero proposto: confirmar com o cliente.',
    ),
    subtitulo: confirmado(
      'Atendimento neuropediátrico com foco no desenvolvimento infantil, em Lages, Santa Catarina.',
    ),
  },

  sobre: {
    eyebrow: 'Quem é',
    titulo: 'Quem é João Pedro Frederes',
    texto:
      'Fisioterapeuta formado pela Uniplac, com pós-graduação em Fisioterapia Neuropediátrica e mestrado em Ambiente e Saúde. Atende bebês e crianças principalmente na NeuroKids, em Lages (SC), e também no Centro de Reabilitação da Uniplac, com foco no desenvolvimento motor e nas condições neurológicas da infância.',
    verifique: 'O registro profissional pode ser conferido no Conselho Regional de Fisioterapia e Terapia Ocupacional (CREFITO).',
  },

  atua: {
    eyebrow: 'Em que atua',
    titulo: 'Em que atua',
    intro: 'O foco é o movimento: como a criança se move, brinca e participa do dia a dia.',
    areas: [
      {
        titulo: 'Desenvolvimento motor',
        texto:
          'Bebês e crianças com atraso ou dificuldade para sentar, engatinhar, ficar em pé, andar, correr ou pular. Os marcos motores acontecem dentro de janelas de idade, e o acompanhamento observa o ritmo de cada criança.',
        fontes: [OMS],
      },
      {
        titulo: 'Neuropediatria',
        texto:
          'Crianças com condições neurológicas que afetam o movimento, como a paralisia cerebral. Nesses casos, as diretrizes atuais recomendam começar a intervenção assim que o risco é identificado.',
        fontes: [NOVAK, MORGAN],
      },
      {
        titulo: 'Fisioterapia no TEA',
        texto:
          'A fisioterapia trabalha coordenação, equilíbrio, aspectos sensório-motores e participação nas atividades. Ela não trata o autismo em si: o objetivo é o movimento, dentro de um cuidado feito em equipe. Dificuldades motoras são frequentes em crianças autistas e, muitas vezes, passam despercebidas.',
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
    eyebrow: 'Como funciona',
    titulo: 'Como é o atendimento',
    intro: 'Cada etapa é combinada com a família.',
    etapas: [
      { titulo: 'Consulta fisioterapêutica', texto: 'Conversa sobre a história e a rotina da criança, e observação do movimento durante o brincar.' },
      { titulo: 'Diagnóstico fisioterapêutico e plano terapêutico', texto: 'Objetivos ligados ao dia a dia da criança, definidos com a família.' },
      { titulo: 'Atendimentos', texto: 'Brincadeiras e atividades com propósito, de acordo com o plano.' },
      { titulo: 'Reavaliação do plano', texto: 'O plano é revisto periodicamente e ajustado conforme a resposta da criança.' },
      { titulo: 'Participação da família', texto: 'Orientações para o dia a dia em casa. As diretrizes recomendam metas definidas com os pais.' },
    ],
    duracaoFrequencia: aviso(
      'Duração de cada atendimento e frequência semanal definidas no plano terapêutico.',
      'Duração e frequência dos atendimentos: confirmar com o cliente.',
    ),
    nota: 'Quando a família autoriza, há troca de informações com os outros profissionais que acompanham a criança.',
    fontes: [MORGAN],
  },

  porque: {
    eyebrow: 'Desenvolvimento infantil',
    titulo: 'Por que o movimento importa',
    texto:
      'É pelo movimento que a criança explora, brinca e se torna mais independente. Os primeiros anos são uma fase de grande plasticidade do sistema nervoso. Por isso, quando há risco ou atraso identificado, as diretrizes recomendam não esperar para começar a intervenção.',
    fontes: [NOVAK, MORGAN],
    ritmo: {
      titulo: 'Cada criança tem seu ritmo',
      texto:
        'A Organização Mundial da Saúde acompanhou crianças saudáveis em cinco países e mostrou que sentar, engatinhar, ficar em pé e andar acontecem em janelas de idade que podem durar vários meses.',
    },
    caderneta: {
      titulo: 'Acompanhe com a Caderneta',
      texto:
        'A Caderneta da Criança, do Ministério da Saúde, tem uma ficha para acompanhar os marcos do desenvolvimento. Leve-a às consultas do pediatra.',
      fonte: CADERNETA,
    },
    honestidade:
      'A fisioterapia é uma parte do cuidado. Ela não substitui o acompanhamento com o pediatra nem promete prazos: cada plano terapêutico é ajustado ao ritmo da criança.',
  },

  onde: {
    eyebrow: 'Onde atende',
    titulo: 'Onde atende',
    regiao: 'Os atendimentos acontecem principalmente na NeuroKids, em Lages (SC). O fisioterapeuta também atua no Centro de Reabilitação da Uniplac.',
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
          'Não necessariamente. Segundo a Organização Mundial da Saúde, crianças saudáveis começam a andar sozinhas dentro de uma janela ampla, entre cerca de 8 e 18 meses. Se a criança passou dessa faixa, ou se há outras dificuldades motoras, o caminho é conversar com o pediatra e, se indicado, procurar uma consulta fisioterapêutica.',
        pesquisa: 'marcos-motores.md#1',
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
          'Os primeiros anos de vida são uma fase de grande plasticidade do sistema nervoso. Para crianças com paralisia cerebral ou alto risco, diretrizes internacionais recomendam começar a intervenção assim que o risco é identificado. Começar cedo não é garantia de resultado; significa aproveitar uma fase importante do desenvolvimento, com um plano terapêutico ajustado a cada criança.',
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
          'A duração do acompanhamento fisioterapêutico varia de criança para criança e depende dos objetivos do plano terapêutico. O plano é revisto periodicamente com a família e ajustado conforme a resposta da criança. Por isso, não é possível prometer prazos; o que se combina são objetivos claros e momentos de revisão.',
      },
      {
        pergunta: 'Onde são os atendimentos?',
        resposta:
          'Os atendimentos de fisioterapia de João Pedro Frederes acontecem principalmente na NeuroKids, na Rua Frei Rogério, 394, Centro, Lages (SC). Ele também atua no Centro de Reabilitação da Uniplac. O endereço completo e o link para o mapa estão na seção "Onde atende". Para combinar horários, use o WhatsApp.',
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
      'O contato é feito pelo WhatsApp. Para proteger a privacidade da criança, evite enviar exames ou relatórios por mensagem antes da consulta fisioterapêutica.',
    instagram: 'Rotina, dicas de desenvolvimento e bastidores no Instagram @fisiofrederes.ped.',
  },
} as const;
