// Ilha única de rolagem: alimenta "A Coluna" (pontos acesos + aria-current) e o
// PortraitTravel (pose ativa). Um IntersectionObserver, sem listeners de scroll.
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-coluna] a[data-alvo]')];
const retrato = document.querySelector<HTMLElement>('[data-retrato]');
const poses = retrato ? [...retrato.querySelectorAll<HTMLElement>('[data-pose]')] : [];
const ids = links.map((a) => a.dataset['alvo'] ?? '');
const alvos = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);

function ativar(id: string): void {
  const idx = ids.indexOf(id);
  links.forEach((a, i) => {
    a.toggleAttribute('data-aceso', i <= idx);
    if (i === idx) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  if (retrato) {
    const pose = poses.find((p) => p.dataset['pose'] === id);
    // Sem pose para a seção: mantém a anterior. No hero, o retrato flutuante some.
    if (pose) poses.forEach((p) => p.toggleAttribute('data-ativa', p === pose));
    retrato.toggleAttribute('data-visivel', id !== 'inicio' && poses.some((p) => p.hasAttribute('data-ativa')));
  }
}

if (alvos.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) if (e.isIntersecting) ativar(e.target.id);
    },
    // A seção "ativa" é a que cruza a faixa central da tela.
    { rootMargin: '-45% 0px -50% 0px' },
  );
  alvos.forEach((el) => io.observe(el));
}
