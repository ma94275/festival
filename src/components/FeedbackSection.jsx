function FeedbackBox({ title, content, type }) {
    const styles = {
        improve: "bg-[#FFCFCF]",
        good: "bg-[#C9F7CC]",
    };

    return (
        <div className={`rounded-[15px] px-[20px] py-[16px] gap-[16px] ${styles[type]}`}>
            <span className="block font-pretendad text-[16px]">
                {title}
            </span>
            <p className="font-pretendad text-[15px]">
                {content}
            </p>
        </div>
    );
}

export default function FeedbackSection({ title, userAnswer, improve, good }) {
    return (
        <div className="flex flex-col gap-[15px]">
            <span className="font-pretendad text-[20px]"> {title} </span>
            <p className="font-pretendad text-[16px]"> {userAnswer} </p>
            <FeedbackBox title="개선제안" content={improve} type="improve"/>
            {good && (<FeedbackBox title="좋은점" content={good} type="good"/>)}
            <hr className="border-[#696969] my-[20px]" />
        </div>
    );
}