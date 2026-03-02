import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import arrow from "../../assets/icons/arrow-down.svg";
import { mockProfileSetupApi } from "../../api/profile";

export default function ProfileSetup() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        major: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        major: "",
    });

    const majors = [
        "프론트엔드",
        "백엔드",
        "디자인", 
        "데브옵스",
        "앱개발",
        "게임개발",
        "기타",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleStart = async () => {
        const nextErrors = {
            name: "",
            major: "",
        };

        let hasError = false;

        if (!form.name) {
            nextErrors.name = "필수 정보입니다.";
            hasError = true;
        }

        if (!form.major) {
            nextErrors.major = "필수 정보입니다.";
            hasError = true;
        }

        setErrors(nextErrors);
        if (hasError) return;

        try {
            setLoading(true);

            // 🔹 백엔드 연동 전: mock API
            const response = await mockProfileSetupApi(form);
            console.log("프로필 설정 성공:", response);

            // 🔹 지금은 전역 상태 업데이트 안 함
            // 🔹 그냥 홈으로 이동만 처리
            navigate("/home");

        } catch (error) {
            if (error.code === "INVALID_PROFILE") {
                alert("프로필 정보를 다시 확인해주세요.");
            } else {
                alert("서버 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">
                        PolishMe
                    </span>
                    <span className="text-[16px] font-pretendad font-semibold">
                        선택 및 작성
                    </span>
                </div>

                <div className="flex flex-col gap-[12px]">
                    <InputBox 
                        type="text"
                        label="이름"
                        placeholder="이름을 입력하세요"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <div className="flex flex-col relative">
                        <label className="font-pretendad font-medium text-[16px] mx-[8px]">
                            전공
                        </label>

                        <button 
                            type="button"
                            className={`flex justify-between w-[360px] h-[45px] border rounded-[10px] font-noto text-[#6F6F6F] text-[14px] text-left pl-[12px] pr-[12px] py-[12px]
                                ${errors.major ? "border-[#FF9898]" : "border-[#D9D9D9]"}`}
                            onClick={() => setOpen(!open)}
                        >
                            {form.major || "전공을 선택하세요"}
                            <img src={arrow} alt="화살표" />
                        </button>

                        <ul
                            className={`
                                absolute top-full mt-[-15px] w-[360px] h-[116px]
                                overflow-y-auto rounded-[5px] bg-[#F4F4F4]
                                shadow-[4px_4px_20px_rgba(0,0,0,0.1)]
                                transition-all duration-200 ease-out
                                ${open
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-2 pointer-events-none"}
                            `}
                        >
                            {majors.map((major) => (
                                <li
                                    key={major}
                                    className="w-full h-[30px] font-pretendad text-[14px] flex items-center pl-[10px] hover:bg-[#D9D9D9] cursor-pointer"
                                    onClick={() => {
                                        setForm({ ...form, major });
                                        setOpen(false);
                                        setErrors({ ...errors, major: "" });
                                    }}
                                >
                                    {major}
                                </li>
                            ))}
                        </ul>

                        <span className="text-[#FF9898] font-pretendad text-[10px] ml-[8px] min-h-[10px]">
                            {errors.major}
                        </span>
                    </div>

                    <InputBtn
                        label={loading ? "처리 중..." : "시작하기"}
                        onClick={handleStart}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
}
