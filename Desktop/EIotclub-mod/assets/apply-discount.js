if (!customElements.get("apply-discount")) {
  customElements.define(
    "apply-discount",
    class ApplyDiscount extends HTMLElement {
      constructor() {
        super();
        this.input = this.querySelector("[data-input]");
        this.button = this.querySelector("[data-apply]");
        this.error = this.querySelector("[data-error]");
        this.button.addEventListener("click", (e) =>
          this.handleApply.bind(this)(e)
        );
      }
      handleApply(e) {
        e.preventDefault();
        console.log("应用折扣");
        this.button.setAttribute("disabled","");
        // this.error.classList.add("hide");
        this.style.opacity = 0.5;
        fetch(window.Shopify.routes.root + "discount/" + this.input.value)
        .then((res) => {
          // this.error.classList.add("hide");
          const result = res.json();
          document.dispatchEvent(new CustomEvent("cart:build"));
          this.style.opacity = 1;
          this.input.value = "";
          this.button.removeAttribute("disabled");
          console.log("结果",result);
          return result;
        })
      }
    }
  );
}
