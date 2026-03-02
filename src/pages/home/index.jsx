import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import letter from "../../assets/icons/letter.svg";

export default function Home() {
    return (
        <div className="bg-[#ECECEC] w-full h-screen">
            <Navbar />

            <div className="flex flex-col justify-center items-center gap-[28px] mt-[120px]">
                <div className="flex flex-col justify-center items-center gap-[20px]">
                    <span className="font-pretendad text-[40px]">
                        좋은 소식이 오는 중입니다
                    </span>
                    <span className="font-pretendad font-light text-[24px] text-[#696969]">
                        AI가 양식에 맞게 피드백 합니다.
                    </span>
                </div>

                <Link
                    to="/write-chapter1"
                    className="flex justify-center items-center w-[400px] h-[150px] rounded-[20px]
                        shadow-[4px_4px_20px_rgba(0,0,0,0.25)] gap-[16px]
                        bg-[#F4F4F4] hover:bg-[#C7C7C7] transition-colors"
                >
                    <img src={letter} alt="문서" />
                    <span className="font-pretendad text-[28px]">
                        작성하러가기
                    </span>
                </Link>
            </div>
        </div>
    );
}
