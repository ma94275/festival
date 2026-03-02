export default function InputBox({type = "text", label, placeholder, name, value, onChange, error}) {
    return(
        <div className="flex flex-col">
            <label className="font-pretendad font-medium text-[16px] mx-[8px]" htmlFor={name}>{label}</label>
            <input
                className={`w-[360px] h-[45px] border rounded-[10px] font-noto text-[14px] px-[12px] py-[12px] 
                focus:outline-none ${error ? "border-[#FF9898] focus:border-[#FF9898]" : "border-[#D9D9D9] focus:border-[#5E5E5E]"}`}
                type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} id={name}/>
            <span className="text-[#FF9898] font-pretendad text-[10px] ml-[8px] min-h-[10px]">{error}</span>
        </div>
    )
}