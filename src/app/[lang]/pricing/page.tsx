import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

export default function DonatePage(): JSX.Element {
  return (
    <div className="min-h-wrapper flex flex-col items-center justify-center">
      <CheckoutForm uiMode="embedded" />
    </div>
  );
}
