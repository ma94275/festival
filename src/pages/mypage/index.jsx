import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import profile from "../../assets/icons/profile.svg";

export default function Mypage() {
    const navigate = useNavigate();

    // 🔥 임시 사용자 데이터 (백엔드 연동 전)
    const user = {
        name: "사용자",
        email: "test@example.com",
        job: "프론트엔드",
    };

    const maskedPassword = "●".repeat(10);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <div className="w-[450px] h-[450px] bg-[#F4F4F4] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] py-[48px] px-[63px]">
                    
                    <div className="flex gap-[26px] mb-[20px]">
                        <img src={profile} alt="프로필 이미지" />
                        <div className="flex flex-col">
                            <span className="font-pretendad text-[32px]">
                                {user.name} 님
                            </span>
                            <span className="font-pretendad text-[24px]">
                                전공: {user.job || "미설정"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[15px]">
                        <button
                            onClick={() => alert("정보 수정 기능은 백엔드 연동 후 구현됩니다.")}
                            className="text-[24px] text-[#0F7BFF] w-fit hover:underline"
                        >
                            수정하기
                        </button>

                        <div className="flex flex-col gap-[4px]">
                            <span className="font-medium text-[24px]">이메일</span>
                            <span className="text-[20px]">{user.email}</span>
                        </div>

                        <div className="flex flex-col gap-[4px]">
                            <span className="font-medium text-[24px]">비밀번호</span>
                            <span className="text-[20px]">{maskedPassword}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
