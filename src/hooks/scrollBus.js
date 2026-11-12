// Barramento minimo: quem quiser reagir a cada frame de rolagem se inscreve aqui. O useSmoothScroll
// dispara dentro do proprio tick do Lenis, ou seja, no MESMO frame em que a pagina rolou. Assim
// qualquer deslocamento aplicado por aqui fica sincronizado com o sticky (sem atraso de 1 frame,
// que e o que faz um elemento "tremer" quando a animacao roda separada do scroll).
const subs = new Set();

export function subscribeScroll(cb) {
  subs.add(cb);
  return () => subs.delete(cb);
}

export function emitScroll(scroll) {
  subs.forEach((cb) => cb(scroll));
}