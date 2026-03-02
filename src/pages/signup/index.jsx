import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import { mockSignupApi } from "../../api/signup";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [isTermsOpen, setIsTermsOpen] = useState(false); 
    const [isAgreed, setIsAgreed] = useState(false);  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const next = {
                ...prev,
                [name]: value
            };
            return next;
        });
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };
    //입력창 변경 시 상태 업데이트

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextErrors = {
            email: "",
            password: "",
        };

        if (!form.email) {
            nextErrors.email = "필수 정보입니다.";
        } else if (!form.email.includes("@") || !form.email.includes(".")) {
            nextErrors.email = "올바른 이메일 형식이 아닙니다.";
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
        if (!form.password) {
            nextErrors.password = "필수 정보입니다.";
        } else if (form.password.length < 10 || form.password.length > 15) {
            nextErrors.password = "비밀번호는 10~15자 이내여야 합니다.";
        } else if (form.password.includes(" ") || !passwordRegex.test(form.password)) {
            nextErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
        }

        setErrors(nextErrors);
        if (nextErrors.email || nextErrors.password) return;

        try {
            // ⭐ 여기만 나중에 axios로 교체됨
            const response = await mockSignupApi(form);

            console.log(response);
            navigate("/profile-setup");
        } catch (err) {
            if (err.code === "DUPLICATE_EMAIL") {
                setErrors((prev) => ({
                    ...prev,
                    email: "이미 가입된 이메일입니다.",
                }));
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px] shadow-[4px_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-[23px]">
                <div className="flex flex-col text-center">
                    <span className="text-[50px] text-[#002455] font-noto font-black">PolishMe</span>
                    <span className="text-[16px] font-pretendad font-semibold">회원가입</span>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <InputBox type="email" label="이메일" placeholder="이메일을 입력하세요" name="email" value={form.email} onChange={handleChange} error={errors.email} />
                    <InputBox type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" name="password" value={form.password} onChange={handleChange} error={errors.password} />
                    <InputBtn label="회원가입" onClick={handleSubmit}/>
                </div>
                
                <div className="relative flex flex-col">
                    <label className="flex gap-[6px] text-[12px] font-pretendad">
                        <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}/>
                        약관을 모두 확인하였으며, 동의합니다
                        <button type="button" onClick={() => setIsTermsOpen(prev => !prev)}
                            className="text-left text-[12px] text-[#002455]">
                            ▶ 약관확인
                        </button>
                    </label>


                    {/* 약관 내용 */}
                    {isTermsOpen && (
                        <div className="absolute w-full h-[450px] font-pretendad text-[12px] text-[#555] p-[12px]
                        rounded-[10px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] bottom-[20px] overflow-y-auto z-50">
                        <p className="font-semibold mb-[6px]">사이트 이용 약관</p>
                        <p className="mb-[10px]">
                            <ul className="flex flex-col gap-[5px]">
                                <li>
                                본 서비스는 인공지능 기술을 활용하여 사용자가 입력한 텍스트에 대해 
                                참고용 피드백을 제공하는 것을 목적으로 합니다.
                                </li>

                                <li>
                                본 서비스는 회원의 개인정보를 소중히 보호하며,
                                수집된 정보는 서비스 제공 목적 외에는 사용되지 않습니다.
                                개인정보 수집 및 이용에 관한 자세한 사항은 개인정보처리방침에 따릅니다.
                                </li>

                                <li>
                                본 서비스는 본 약관을 사전 고지 없이 변경할 수 있으며,
                                변경된 약관은 서비스 내 공지를 통해 안내합니다.
                                이용자가 변경된 약관에 동의하지 않는 경우 회원 탈퇴를 요청할 수 있으며,
                                변경 이후에도 서비스를 계속 이용하는 경우에는 변경된 약관에 동의한 것으로 간주합니다.
                                </li>

                                <li>
                                본 서비스는 서버 점검, 시스템 오류 등의 사유로
                                사전 공지 후 일시적으로 중단될 수 있습니다.
                                </li>

                                <li>
                                이용자는 정상적인 방법으로만 서비스를 이용해야 하며,
                                서비스 오남용, 과도한 요청, 악의적인 사용,
                                시스템에 부하를 주는 행위를 금지합니다.
                                </li>

                                <li>
                                사용자가 입력한 모든 콘텐츠의 저작권은 사용자에게 있으며,
                                본 서비스는 피드백 제공을 위한 범위 내에서만 해당 콘텐츠를 활용합니다.
                                인공지능이 제공하는 피드백은 참고용이며,
                                이를 활용한 결과에 대해 본 서비스는 책임을 지지 않습니다.
                                </li>
                            </ul>
                        </p>

                        <p className="font-semibold mb-[6px]">개인정보 수집 및 이용 동의</p>
                        <p>
                            <ul className="flex flex-col gap-[5px]">
                                <li>
                                    이메일 및 비밀번호는 회원 식별 및 서비스 제공을 위해
                                    사용되며, 관련 법령에 따라 안전하게 보관됩니다.                                    
                                </li>
                                <li>
                                    본 서비스는 회원가입 및 서비스 제공을 위해
                                    최소한의 개인정보를 수집합니다.
                                </li>
                                <li>
                                    수집하는 개인정보 항목은 다음과 같습니다.
                                    <br />
                                    - 이름
                                    <br />
                                    - 이메일
                                    <br />
                                    - 전공 또는 관심 분야
                                </li>
                                <li>
                                    개인정보는 다음의 목적을 위해 이용됩니다.
                                    <br />
                                    - 회원 식별 및 서비스 이용 관리
                                    <br />
                                    - AI 피드백 서비스 제공
                                    <br />
                                    - 서비스 품질 개선 및 오류 대응
                                </li>
                                <li>
                                    수집된 개인정보는 서비스 이용 기간 동안 보관되며,
                                    회원 탈퇴 시 또는 수집 목적이 달성된 경우
                                    지체 없이 안전하게 파기됩니다.
                                </li>
                                <li>
                                    이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으나,
                                    이 경우 본 서비스의 이용이 제한될 수 있습니다.
                                </li>
                                <li>
                                    본 서비스는 관련 법령을 준수하며,
                                    이용자의 개인정보를 제3자에게 제공하지 않습니다.
                                </li>
                            </ul>
                        </p>
                    </div>
                )}

                    
                </div>
                
                <footer className="font-pretendad font-regular text-[12px] text-[#919191]">
                    이미 회원가입을 하셨나요? <a href="/login" className="text-[#002455]">로그인으로 이동</a>
                </footer>
            </div>
        </div>
    )
}