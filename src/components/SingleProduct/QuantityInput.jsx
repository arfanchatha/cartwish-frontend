import "./QuantityInput.css";

function QuantityInput({ qunatity, setQuantity, stock, cartPage, productId }) {
  return (
    <>
      <button
        className="quantity_input_button"
        disabled={qunatity <= 1}
        onClick={() => {
          cartPage
            ? setQuantity("decrease", productId)
            : setQuantity(qunatity - 1);
        }}
      >
        -
      </button>
      <p className="qunatity_input_count">{qunatity}</p>
      <button
        className="quantity_input_button"
        disabled={qunatity >= stock}
        onClick={() => {
          cartPage
            ? setQuantity("increase", productId)
            : setQuantity(qunatity + 1);
        }}
      >
        +
      </button>
    </>
  );
}

export default QuantityInput;
