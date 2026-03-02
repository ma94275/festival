import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import search from "../../assets/icons/search.svg";
import { mockGetArchiveListApi, mockDeleteFeedbackApi } from "../../api/archive";

function FeedbackBox({ data, onDelete, onClick }) {
    const formatDate = (dateString) => {
        if (!dateString) return "날짜 없음";
        const date = new Date(dateString);
        if (isNaN(date)) return "날짜 없음";
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onDelete(data.feedbackId);
        }
    };

    const keywords = Array.isArray(data?.user?.keyword) ? data.user.keyword : [];

    return (
        <div
            className="w-[800px] h-[200px] bg-[#F4F4F4] rounded-[20px]
            shadow-[4px_4px_20px_rgba(0,0,0,0.25)]
            hover:bg-[#C7C7C7] transition cursor-pointer"
            onClick={onClick}
        >
            <div className="px-[47px] py-[36px] flex flex-col gap-[15px]">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-[8px]">
                        <span className="font-pretendad font-semibold text-[24px]">
                            {data?.user?.company || "회사명 없음"} | {data?.user?.job || "직무 없음"}
                        </span>
                        <span className="font-pretendad text-[16px] text-[#696969]">
                            {formatDate(data.createdAt || data.savedAt)}
                        </span>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="text-[#FF6B6B] hover:text-[#FF5252]
                        font-pretendad text-[14px] px-[10px] py-[5px]"
                    >
                        삭제
                    </button>
                </div>

                <div className="flex gap-[10px] flex-wrap">
                    {keywords.slice(0, 5).map((keyword, index) => (
                        <span
                            key={index}
                            className="px-[12px] py-[6px] bg-[#E8F4F8]
                            text-[#002455] rounded-[20px]
                            font-pretendad text-[14px]"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-[10px]">
                    <span className="font-pretendad text-[16px] text-[#696969]">총점</span>
                    <span className="font-pretendad font-bold text-[28px] text-[#002455]">
                        {data?.score?.total ?? "-"}점
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Archive() {
    const navigate = useNavigate();
    const [archiveList, setArchiveList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArchiveList();
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredList(archiveList);
            return;
        }

        const term = searchTerm.toLowerCase();

        const filtered = archiveList.filter((item) => {
            const company = item?.user?.company?.toLowerCase() || "";
            const job = item?.user?.job?.toLowerCase() || "";
            const keywords = Array.isArray(item?.user?.keyword) ? item.user.keyword : [];

            return (
                company.includes(term) ||
                job.includes(term) ||
                keywords.some((k) => k.toLowerCase().includes(term))
            );
        });

        setFilteredList(filtered);
    }, [searchTerm, archiveList]);

    const fetchArchiveList = async () => {
        setIsLoading(true);
        try {
            const response = await mockGetArchiveListApi();
            const list = Array.isArray(response?.data) ? response.data : [];
            setArchiveList(list);
            setFilteredList(list);
        } catch (err) {
            console.error("보관함 조회 실패:", err);
            alert("보관함을 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (feedbackId) => {
        try {
            await mockDeleteFeedbackApi(feedbackId);
            setArchiveList((prev) => prev.filter((item) => item.feedbackId !== feedbackId));
            alert("삭제되었습니다.");
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        }
    };

    const handleCardClick = (data) => {
        navigate("/feedback", { state: data });
    };

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar />

            <div className="flex flex-col justify-center items-center">
                <div className="relative w-[700px] h-[70px] rounded-[15px]
                bg-[#F4F4F4] shadow-[4px_4px_20px_rgba(0,0,0,0.25)]
                flex items-center my-[70px]">
                    <img src={search} alt="검색" className="absolute left-[22px]" />
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-full bg-transparent pl-[66px]
                        pr-[20px] font-pretendad text-[20px] focus:outline-none"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-[400px]">
                        <p className="text-[20px] font-pretendad text-[#696969]">로딩 중...</p>
                    </div>
                ) : filteredList.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-[400px] gap-[20px]">
                        <p className="text-[24px] font-pretendad text-[#696969]">
                            {searchTerm ? "검색 결과가 없습니다" : "저장된 피드백이 없습니다"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => navigate("/write-chapter1")}
                                className="px-[30px] py-[15px] bg-[#002455]
                                text-white rounded-[10px]
                                font-pretendad font-semibold
                                hover:bg-[#003670] transition-colors"
                            >
                                자소서 작성하러 가기
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-[30px] pb-[50px]">
                        {filteredList.map((item) => (
                            <FeedbackBox
                                key={item.feedbackId}
                                data={item}
                                onDelete={handleDelete}
                                onClick={() => handleCardClick(item)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
