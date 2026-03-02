export const loginApi = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email !== "test@example.com") {
                reject({ code: "INVALID_EMAIL" });
                return;
            }

            if (password !== "abc45678##") {
                reject({ code: "INVALID_PASSWORD" });
                return;
            }

            resolve({
                accessToken: "mock-access-token",
                user: {
                    email,
                    name: "테스트 유저",
                    job: "디자이너",
                },
            });
        }, 500);
    });
};

// ⭐ 실제 API로 교체할 때
// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// 
// export const loginApi = async ({ email, password }) => {
//     const response = await axios.post(`${API_URL}/auth/login`, {
//         email,
//         password
//     });
//     return response.data;
// };
