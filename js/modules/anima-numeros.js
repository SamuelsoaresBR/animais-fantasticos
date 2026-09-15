export default class AnimaNumeros {
  constructor(numeros, observerTarget, observeClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observeClass = observeClass;

    // bind o this do objeto ao callback da multacao
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Rececbe um elemento no Dom, com numero em seu texto
  // incrementa a partir de 0 ate o numero final
  static incrementarNumeros(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // ativar incrementa numero para cada
  // numero selecionado no dom
  animaNumeros() {
    this.numeros.forEach(numero => this.constructor.incrementarNumeros(numero));
  }

  // Funcao que ocorre quando a mutacoes ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observeClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // adiciona o mutationObserve para verificar
  // quando a class ativo e add no target
  addMutationObserve() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserve();
    }
    return this;
  }
}
