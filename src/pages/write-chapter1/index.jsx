import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar';
import { mockGenerateFormatApi } from '../../api/coverletter';

function InputBox({name, title, placeholder, onChange, value, error}) {
    return (
        <div className="w-[600px] flex flex-col">
            <span className="font-pretendad text-[20px] ml-[15px]">{title}</span>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`w-[600px] h-[60px] text-[20px] pl-[15px]
                border ${error ? "border-[#FF9898]" : "border-[#D9D9D9]"}
                rounded-[10px] focus:outline-none`}
            />
            <span className="min-h-[18px] text-[#FF9898] text-[12px] ml-[15px]">
                {error}
            </span>
        </div>
    );
}

function StyleKeywordBox({ keyword, onChange, checked }) {
    return (
        <label className="cursor-pointer">
            <input
                type="checkbox"
                value={keyword}
                checked={checked}
                onChange={onChange}
                className="peer hidden"
            />
            <span className="inline-block px-[12px] py-[5px]
            border border-[#6F6F6F] rounded-[30px] text-[20px]
            peer-checked:bg-[#919191] hover:bg-[#E0E0E0] transition">
                {keyword}
            </span>
        </label>
    );
}

export default function WriteChapter1() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        company: "",
        job: "",
        style: [],
    });

    const [errors, setErrors] = useState({
        company: "",
        job: "",
        style: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const MAX_STYLE = 5;

    const handleKeywordChange = (e) => {
        const value = e.target.value;

        setForm(prev => {
            if (prev.style.includes(value)) {
                return { ...prev, style: prev.style.filter(v => v !== value) };
            }

            if (prev.style.length >= MAX_STYLE) {
                setErrors(prev => ({
                    ...prev,
                    style: "스타일 키워드는 최대 5개까지 선택할 수 있습니다.",
                }));
                return prev;
            }

            setErrors(prev => ({ ...prev, style: "" }));
            return { ...prev, style: [...prev.style, value] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({ company: "", job: "", style: "" });

        if (!form.company) {
            setErrors(prev => ({ ...prev, company: "필수 작성 칸입니다" }));
            return;
        }
        if (!form.job) {
            setErrors(prev => ({ ...prev, job: "필수 작성 칸입니다" }));
            return;
        }
        if (form.style.length === 0) {
            setErrors(prev => ({ ...prev, style: "필수 선택 항목입니다" }));
            return;
        }

        setIsLoading(true);

        try {
            const response = await mockGenerateFormatApi(form);

            sessionStorage.setItem(
                "chapter1Data",
                JSON.stringify({ form, result: response.result })
            );

            navigate("/write-chapter2", {
                state: { form, result: response.result },
            });
        } catch (err) {
            console.error(err);
            setErrors(prev => ({
                ...prev,
                style: "양식 생성에 실패했습니다. 다시 시도해주세요.",
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const STYLE_KEYWORDS = [
        "열정적","논리적","유연성","팀워크 중시","창의적","비판적 사고",
        "학습력","적응력","성장 지향","문제 해결 능력","분석적","전략적",
        "책임감","협업 중시","성실성","소통 중시","주도적","도전적",
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 justify-center items-center bg-[#EBEBEB]">
                <div className="w-[700px] h-[680px] rounded-[20px] bg-white shadow-lg flex justify-center items-center">
                    <div className="flex flex-col">
                        <div className="mb-[20px]">
                            <span className="text-[36px]">어떤 스타일을 원하세요?</span>
                            <p className="text-[20px] text-[#696969]">
                                AI가 최적화된 양식을 생성합니다.
                            </p>
                        </div>

                        <InputBox
                            name="company"
                            title="지원기업"
                            placeholder="예: 삼성전자"
                            value={form.company}
                            onChange={handleTextChange}
                            error={errors.company}
                        />

                        <InputBox
                            name="job"
                            title="직무"
                            placeholder="예: 소프트웨어 엔지니어"
                            value={form.job}
                            onChange={handleTextChange}
                            error={errors.job}
                        />

                        <span className="text-[20px] mb-[10px]">
                            원하는 스타일 키워드
                        </span>

                        <div className="flex flex-wrap gap-[10px] w-[600px]">
                            {STYLE_KEYWORDS.map(keyword => (
                                <StyleKeywordBox
                                    key={keyword}
                                    keyword={keyword}
                                    onChange={handleKeywordChange}
                                    checked={form.style.includes(keyword)}
                                />
                            ))}
                        </div>

                        <span className="text-[#FF9898] text-[12px] mt-[8px]">
                            {errors.style}
                        </span>

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-[600px] h-[60px] mt-[10px]
                            bg-[#002455] text-white rounded-[10px]
                            text-[24px] disabled:bg-gray-400"
                        >
                            {isLoading ? "생성 중..." : "양식 생성하기"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
