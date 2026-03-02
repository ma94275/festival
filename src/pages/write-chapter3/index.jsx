import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { mockGenerateFeedbackApi } from '../../api/coverletter';

function TextAreaBox({ name, title, value, onChange }) {
    return (
        <div className="flex flex-col gap-[10px]">
            <span className="font-pretendad font-medium text-[20px]">
                {title}
            </span>
            <textarea
                name={name} 
                placeholder="여기에 답변을 작성하세요" 
                value={value} 
                onChange={onChange}
                className="custom-scrollbar w-[800px] h-[200px] border border-[#D9D9D9] rounded-[20px] p-[25px] font-pretendad text-medium text-[20px]
                focus:outline-none focus:border-[#5E5E5E] resize-none bg-[#F4F4F4]"
            />
        </div>
    );
}

function RightBox({content}){
    return (
        <div className="w-[200px] h-[290px] px-[10px] py-[20px] border border-[#D9D9D9] rounded-[20px] bg-white">
            <p className="font-pretendad text-[14px] text-gray-700 leading-relaxed">
                {content}
            </p>
        </div>
    );
}

export default function WriteChapter3() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state) {
            setData(location.state);
        } else {
            const storedData = sessionStorage.getItem('chapter2Data');
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        }
    }, [location.state]);

    if (!data && !sessionStorage.getItem('chapter2Data')) {
        return <Navigate to="/write-chapter1" replace />;
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
                <Navbar />
                <div className='flex-1 flex justify-center items-center'>
                    <div className="text-xl font-pretendad">로딩 중...</div>
                </div>
            </div>
        );
    }

    const guides = [
        {
            id: "q1",
            right: "왜 이 회사와 직무에 지원했는지 구체적으로 작성",
            question: "지원 동기와 입사 후 포부를 작성해주세요.",
        },
        {
            id: "q2",
            right: "직무와 연관된 핵심 경험과 배운 점",
            question: "직무 관련 경험을 중심으로 작성해주세요.",
        },
        {
            id: "q3",
            right: "직무 수행에 도움이 되는 강점과 사례",
            question: "본인의 강점과 사례를 작성해주세요.",
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ 
            ...prev, 
            [name]: value 
        }));
    };

    const handleSubmit = async () => {
        if (!form.q1 || !form.q2 || !form.q3) {
            alert("모든 항목을 작성해주세요.");
            return;
        }

        setIsLoading(true);

        try {
            // ⭐ 백엔드 API 연동 대기 상태
            const response = await mockGenerateFeedbackApi({
                company: data.form.company,
                job: data.form.job,
                style: data.form.style,
                answers: form
            });

            console.log("피드백 생성 성공:", response);

            navigate("/feedback", {
                state: response
            });

            sessionStorage.removeItem('chapter1Data');
            sessionStorage.removeItem('chapter2Data');
        } catch (err) {
            console.error("피드백 생성 실패:", err);
            alert("피드백 생성에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col">
            <Navbar />
            <div className='flex-1 flex justify-center items-center py-10'>
                <div className='flex justify-center gap-[30px]'>
                    <div className='flex flex-col justify-center px-[25px] w-[250px] h-[1100px] bg-[#F4F4F4] rounded-[20px] gap-[85px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)]'>
                        {guides.map((item) => (
                            <RightBox key={item.id} content={item.right}/>
                        ))}
                    </div>

                    <div className="flex flex-col w-[900px] h-[1100px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] px-[50px] py-[56px] gap-[35px] bg-[#F4F4F4]">
                        <div className="flex flex-col">
                            <span className="font-pretendad font-semibold text-[32px]">
                                자기소개서 작성
                            </span>
                            <div className="flex font-pretendad font-medium text-[20px] text-[#6F6F6F] gap-[15px]">
                                <span>{data.form.company}</span>
                                <span>{data.form.job}</span>
                            </div>
                        </div>
                        
                        {guides.map((item) => (
                            <TextAreaBox 
                                key={item.id} 
                                title={item.question} 
                                name={item.id} 
                                value={form[item.id] || ""} 
                                onChange={handleChange}
                            />
                        ))}
                        
                        <button 
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-[800px] h-[60px] bg-[#002455] rounded-[10px] text-white font-pretendad font-semibold text-[24px] text-center hover:bg-[#003670] transition-colors disabled:bg-gray-400"
                        >
                            {isLoading ? "피드백 생성 중..." : "AI 피드백 생성하기"}
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    );
}