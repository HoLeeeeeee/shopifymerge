if (!customElements.get("top-pick-item")) {
  customElements.define(
    "top-pick-item",
    class TopPickItem extends HTMLElement {
      constructor() {
        super();
        this.cartButton = this.querySelector("[data-atc]");

        this.variant = this.getAttribute("data-variant");
        if (this.variant) {
          this.cartButton.addEventListener("click", (e) => {
            this.handleSubmit.bind(this)(e);
          });
          console.log("初始化完成，我的表单");
        }
      }
      handleSubmit(e) {
        e.preventDefault();
        console.log("我的提交");

        const formData = {
          items: [
            {
              id: this.variant,
              quantity: 1,
            },
          ],
        };
        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then(async (response) => {
            const result = await response.json();
            console.log("结果",result);
            document.dispatchEvent(new CustomEvent('cart:build'));
            return result;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  );
}
