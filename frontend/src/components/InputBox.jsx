export function InputBox ({label, placeholder , onChange}){
    return <div className="m-2">
        <div className="text-sm font-bold m-1">
            {label}
        </div>
            <input onChange={onChange} className="text-sm w-full p-1 rounded shadow-md " placeholder={placeholder} />
           </div>
}