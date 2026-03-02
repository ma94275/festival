import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import FeedbackSection from "../../components/FeedbackSection";
import ScoreItem from "../../components/scoreItem";
import { mockSaveFeedbackApi } from "../../api/archive";

export default function Feedback() {
    const navigate = useNavigate();
    const location = useLocation();
    const [aifeedback, setAifeedback] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (location.state) {
            setAifeedback(location.state);
        } else {
            navigate("/home");
        }
    }, [location.state, navigate]);

    const handleSave = async () => {
        if (!aifeedback) return;

        setIsSaving(true);
        try {
            await mockSaveFeedbackApi(aifeedback);
            alert("피드백이 보관함에 저장되었습니다!");
            navigate("/archive");
        } catch (err) {
            console.error("저장 실패:", err);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRetry = () => {
        if (
            window.confirm(
                "작성한 내용이 모두 초기화됩니다. 처음부터 다시 작성하시겠습니까?"
            )
        ) {
            sessionStorage.removeItem("chapter1Data");
            sessionStorage.removeItem("chapter2Data");
            navigate("/write-chapter1");
        }
    };

    if (!aifeedback) {
        return (
            <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-[20px] font-pretendad text-[#696969]">
                        로딩 중...
                    </p>
                </div>
            </div>
        );
    }

    const user = aifeedback.user || {};
    const keywords = Array.isArray(user.keyword) ? user.keyword : [];
    const formValues = aifeedback.form ? Object.values(aifeedback.form) : [];

    const score = aifeedback.score || {};
    const totalScore = Number(score.total) || 0;

    const scoreItems = [
        score.logic,
        score.persuasive,
        score.concrete,
        score.authenticity,
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar />

            <div className="flex-1 flex justify-center items-center p-[70px]">
                <div className="w-[800px] bg-[#F4F4F4] rounded-[20px]
                shadow-[4px_4px_20px_rgba(0,0,0,0.25)]
                py-[50px] px-[75px]">

                    {/* 상단 정보 */}
                    <div className="flex flex-col gap-[15px]
                    font-pretendad text-[18px] text-[#696969] mb-[50px]">
                        <div className="flex gap-[20px]">
                            <span>지원 회사 {user.company || "-"}</span>
                            <span>지원 직무 {user.job || "-"}</span>
                        </div>
                        <div className="flex gap-[15px]">
                            <span>핵심 키워드</span>
                            <span>{keywords.join(", ") || "-"}</span>
                        </div>
                    </div>

                    {/* 피드백 섹션 */}
                    {formValues.map((item, idx) => (
                        <FeedbackSection
                            key={idx}
                            title={item?.title || ""}
                            userAnswer={item?.content || ""}
                            improve={item?.improve || ""}
                            good={item?.good || ""}
                        />
                    ))}

                    {/* 점수 */}
                    <div>
                        <div className="flex justify-center gap-[87px] my-[40px]">
                            {scoreItems.map((item, idx) => (
                                <ScoreItem
                                    key={idx}
                                    label={item?.[0] || ""}
                                    score={item?.[1] || 0}
                                />
                            ))}
                        </div>

                        {/* 총점 */}
                        <div className="text-center border-y border-[#696969] py-[40px]">
                            <div className="font-pretendad font-semibold text-[32px]">
                                총점
                            </div>
                            <div className="font-pretendad font-semibold text-[48px]
                            text-[#002455] my-[10px]">
                                {totalScore}
                            </div>
                            <div className="w-[600px] h-[20px] bg-[#C7C7C7]
                            rounded-full mx-auto">
                                <div
                                    className="h-[20px] bg-[#36BC11]
                                    rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(totalScore, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* 총평 */}
                        <div className="bg-[#D1E4FD] rounded-[15px]
                        px-[20px] py-[16px] my-[40px]">
                            <span className="block font-pretendad font-semibold
                            text-[16px] mb-[12px]">
                                전체 총평
                            </span>
                            <p className="font-pretendad text-[16px] leading-relaxed">
                                {aifeedback.summary || ""}
                            </p>
                        </div>

                        {/* 버튼 */}
                        <div className="flex gap-[20px]">
                            <button
                                className="w-[400px] h-[50px] bg-[#002455]
                                rounded-[10px] font-pretendad font-semibold
                                text-white text-[24px]
                                hover:bg-[#003670] transition-colors
                                disabled:bg-gray-400"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? "저장 중..." : "보관함가기"}
                            </button>

                            <button
                                className="w-[230px] h-[50px] bg-[#002455]
                                rounded-[10px] font-pretendad font-semibold
                                text-white text-[24px]
                                hover:bg-[#003670] transition-colors"
                                onClick={handleRetry}
                            >
                                다시하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
