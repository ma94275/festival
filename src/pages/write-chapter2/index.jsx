import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../../components/navbar';

function Format({title, value}){
    return(
        <div className='flex flex-col font-pretendad gap-[8px]'>
            <span className='text-[14px] text-[#696969] font-semibold'>{title}</span>
            <p className='text-[18px] leading-relaxed'>{value}</p>
        </div>
    );
}

export default function WriteChapter2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (location.state) {
            setData(location.state);
        } else {
            const storedData = sessionStorage.getItem('chapter1Data');
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        }
    }, [location.state]);

    if (!data && !sessionStorage.getItem('chapter1Data')) {
        return <Navigate to="/write-chapter1" replace />;
    }

    if (!data) {
        return (
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                <div className="flex flex-1 justify-center items-center bg-[#EBEBEB]">
                    <div className="text-xl font-pretendad">로딩 중...</div>
                </div>
            </div>
        );
    }

    const { form, result } = data;

    const handleNext = () => {
        sessionStorage.setItem('chapter2Data', JSON.stringify(data));
        navigate("/write-chapter3", {
            state: data
        });
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className="flex flex-1 justify-center items-center bg-[#EBEBEB] py-10">
                <div className="w-[550px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.25)] px-[50px] py-[42px]
                flex flex-col gap-[28px] bg-white">
                    <div className='flex flex-col gap-[32px]'>
                        <div className="flex flex-col gap-[8px]">
                            <span className="font-pretendad font-bold text-[28px]">
                                AI가 생성한 자소서 양식
                            </span>
                            <div className="text-left flex gap-[20px] font-pretendad text-[14px] text-[#696969]">
                                <span>지원 회사 {form.company}</span>
                                <span>지원 직무 {form.job}</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-[24px]">
                            <Format title="지원동기" value={result.reason}/>
                            <Format title="성장 과정 및 경험" value={result.experience}/>
                            <Format title="성격 및 강점" value={result.strength}/>
                            <Format title="입사 후 포부" value={result.goal}/>
                        </div>
                        
                        <div className="bg-blue-50 px-4 py-3 rounded-lg">
                            <span className="font-pretendad font-medium text-[16px] text-[#002455]">
                                💡 위 내용을 참고하여 다음 페이지에서 자소서를 작성해주세요
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        className="w-full h-[50px] bg-[#002455] rounded-[10px] text-white font-pretendad font-semibold text-[24px] hover:bg-[#003670] transition-colors"
                        onClick={handleNext}
                    >
                        다음으로
                    </button>                    
                </div>
            </div>
        </div>
    );
}
