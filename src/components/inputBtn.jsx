export default function InputBtn({label, onClick}){
    return(
        <div>
            <button 
                className="w-[360px] h-[45px] bg-[#002455] text-white text-[20px] rounded-[10px] font-pretendad font-semibold"
                onClick={onClick}>{label}
            </button>
        </div>
    )
}