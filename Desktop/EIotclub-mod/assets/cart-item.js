if (!customElements.get("cart-item")) {
  customElements.define(
    "cart-item",
    class CartItem extends HTMLElement {
      constructor() {
        super();
        this.delete = this.querySelector("[data-delete]");
        this.variant = this.getAttribute("data-variant");
        this.delete.addEventListener("click", this.handleDelete.bind(this));
      }
      handleDelete() {
        const formData = new FormData();
        formData.append(`updates[${this.variant}]`, 0);
        this.style.opacity = 0.5;
        
        fetch(window.Shopify.routes.root + "cart/update.js", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            document.dispatchEvent(new CustomEvent("cart:build"));
            return response.json();
          })
          .then((data) => console.log(data));
      }
    }
  );
}
