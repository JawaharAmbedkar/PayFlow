export function Balance({ value }) {
  return (
    <div className="font-medium text-lg">
      Your Balance ₹ {Math.floor(value).toLocaleString("en-IN")}
    </div>
  );
}
