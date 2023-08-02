class Shard {
  element:HTMLDivElement

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("shard");
  }

  getElement() {
    return this.element
  }
  
}

export default Shard;