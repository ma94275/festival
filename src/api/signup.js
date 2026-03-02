// ⭐ 회원가입 mock API
export const mockSignupApi = async (form) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 이미 가입된 이메일 예시
            if (form.email === "test@example.com") {
                reject({
                    code: "DUPLICATE_EMAIL",
                });
                return;
            }

            resolve({
                message: "회원가입 성공",
                userId: 1,
            });
        }, 500);
    });
};

// ⭐ 실제 API로 교체할 때
// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// 
// export const signupApi = async (form) => {
//     const response = await axios.post(`${API_URL}/auth/signup`, form);
//     return response.data;
// };
