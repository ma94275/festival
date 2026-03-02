export default function ScoreItem({ label, score }) {
    return (
        <div className="flex flex-col items-center gap-[6px]">
            <span className="font-pretendad text-[16px]">{label}</span>
            <span className="font-pretendad text-[36px] text-[#002455]">{score}</span>
        </div>
    );
}