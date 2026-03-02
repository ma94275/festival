export const mockProfileSetupApi = async (form) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!form.name || !form.major) {
                reject({
                    code: "INVALID_PROFILE",
                });
                return;
            }

            resolve({
                message: "프로필 설정 완료",
                user: {
                    name: form.name,
                    major: form.major,
                },
            });
        }, 500);
    });
};

// ⭐ 실제 API로 교체할 때
// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// 
// export const profileSetupApi = async (form) => {
//     const token = localStorage.getItem('accessToken');
//     const response = await axios.post(
//         `${API_URL}/profile/setup`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
// };
