export const mockGetArchiveListApi = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedData = localStorage.getItem('savedFeedbacks');
            const feedbacks = storedData ? JSON.parse(storedData) : [];
            
            resolve({
                message: "조회 성공",
                data: feedbacks
            });
        }, 300);
    });
};

export const mockSaveFeedbackApi = async (feedbackData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedData = localStorage.getItem('savedFeedbacks');
            const feedbacks = storedData ? JSON.parse(storedData) : [];
            
            feedbacks.push({
                ...feedbackData,
                savedAt: new Date().toISOString()
            });
            
            localStorage.setItem('savedFeedbacks', JSON.stringify(feedbacks));
            
            resolve({
                message: "저장 성공",
                id: feedbackData.feedbackId
            });
        }, 300);
    });
};

export const mockDeleteFeedbackApi = async (feedbackId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedData = localStorage.getItem('savedFeedbacks');
            const feedbacks = storedData ? JSON.parse(storedData) : [];
            
            const filtered = feedbacks.filter(f => f.feedbackId !== feedbackId);
            localStorage.setItem('savedFeedbacks', JSON.stringify(filtered));
            
            resolve({
                message: "삭제 성공"
            });
        }, 300);
    });
};

// ⭐ 실제 API로 교체할 때
// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// 
// export const getArchiveListApi = async () => {
//     const token = localStorage.getItem('accessToken');
//     const response = await axios.get(
//         `${API_URL}/archive`,
//         { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
// };
// 
// export const saveFeedbackApi = async (feedbackData) => {
//     const token = localStorage.getItem('accessToken');
//     const response = await axios.post(
//         `${API_URL}/archive`,
//         feedbackData,
//         { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
// };
// 
// export const deleteFeedbackApi = async (feedbackId) => {
//     const token = localStorage.getItem('accessToken');
//     const response = await axios.delete(
//         `${API_URL}/archive/${feedbackId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
// };
