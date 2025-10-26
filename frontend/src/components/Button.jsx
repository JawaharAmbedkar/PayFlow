export function Button({ label, onClick, loading }) {
  return (
    <div className="m-2">
      <button
        onClick={onClick}
        type="button"
        disabled={loading}
        className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center focus:outline-none focus:ring-4 ${
          loading
            ? "bg-gray-500 cursor-not-allowed focus:ring-gray-400"
            : "bg-[#050708] hover:bg-[#050708]/90 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50"
        }`}
      >
        {loading ? "Please wait..." : label}
      </button>
    </div>
  );
}
