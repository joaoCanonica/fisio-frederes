export type Escolha = 'aceito' | 'recusado';
const CHAVE = 'consentimento-terceiros-v1';
const EVENTO = 'consentimento';

export function lerConsentimento(): Escolha | null {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'aceito' || v === 'recusado' ? v : null;
  } catch {
    return null;
  }
}

export function gravarConsentimento(e: Escolha): void {
  try {
    localStorage.setItem(CHAVE, e);
  } catch {
    /* navegação privada: vale só para esta página */
  }
  dispatchEvent(new CustomEvent<Escolha>(EVENTO, { detail: e }));
}

export function aoMudar(fn: (e: Escolha) => void): void {
  addEventListener(EVENTO, (ev) => fn((ev as CustomEvent<Escolha>).detail));
}
