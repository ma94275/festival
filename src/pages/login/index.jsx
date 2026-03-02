import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputBox from "../../components/inputBox";
import InputBtn from "../../components/inputBtn";
import { loginApi } from "../../api/login";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("이메일과 비밀번호를 입력하세요.");
            return;
        }

        try {
            setLoading(true);

            // ✅ 백엔드 로그인 API 호출
            const data = await loginApi(email, password);

            // ✅ 토큰 저장
            if (data?.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
            }

            // ✅ 로그인 성공 → 홈 이동
            navigate("/home");
        } catch (err) {
            console.error(err);
            setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[460px] h-[480px] rounded-[20px]
            shadow-[4px_4px_20px_rgba(0,0,0,0.1)]
            flex flex-col justify-center items-center gap-[23px]">

                <div className="flex flex-col text-center">
                    <span className="font-noto text-[50px] text-[#002455] font-black">
                        PolishMe
                    </span>
                    <span className="text-[16px] font-semibold">
                        로그인
                    </span>
                </div>

                <form
                    className="flex flex-col gap-[15px]"
                    onSubmit={handleLogin}
                >
                    <InputBox
                        type="email"
                        label="이메일"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputBox
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <InputBtn
                        label={loading ? "로그인 중..." : "로그인"}
                        type="submit"
                        disabled={loading}
                    />
                </form>

                <footer className="text-[12px] text-[#919191]">
                    아직 회원가입 안 하셨나요?{" "}
                    <Link to="/signup" className="text-[#002455]">
                        회원가입으로 이동
                    </Link>
                </footer>
            </div>
        </div>
    );
}
