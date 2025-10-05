export function Button({ label, onClick }) {
        return <div className="m-2"><button onClick={onClick} type="button" className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30">{label}</button>
        </div>
}