export const mockGenerateFormatApi = async (form) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "양식 생성 완료",
                result: {
                    reason: `${form.company}의 혁신적인 기술력과 ${form.style.join(", ")} 문화에 깊은 인상을 받아 ${form.job} 직무에 지원하게 되었습니다.`,
                    experience: `대학 시절 ${form.job} 관련 프로젝트를 수행하며 ${form.style[0]} 태도로 팀원들과 협력한 경험이 있습니다.`,
                    strength: `저의 강점은 ${form.style.slice(0, 2).join("과 ")}입니다. 이는 ${form.job} 직무 수행에 큰 도움이 될 것입니다.`,
                    goal: `${form.company}에서 ${form.job}로서 ${form.style[form.style.length - 1]} 자세로 지속 성장하며 회사 발전에 기여하겠습니다.`
                }
            });
        }, 1000);
    });
};

export const mockGenerateFeedbackApi = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "피드백 생성 완료",
                feedbackId: Date.now(),
                user: {
                    company: data.company,
                    job: data.job,
                    keyword: data.style
                },
                form: {
                    a1: {
                        title: "지원동기",
                        content: data.answers.q1 || "작성된 내용이 없습니다.",
                        improve: "구체적인 기술이나 프로젝트를 언급하여 지원 동기를 더 명확히 하세요.",
                        good: ""
                    },
                    a2: {
                        title: "성장과정 및 경험",
                        content: data.answers.q2 || "작성된 내용이 없습니다.",
                        improve: "프로젝트 규모와 성과를 수치화하여 제시하면 더욱 설득력이 높아집니다.",
                        good: "구체적인 경험이 잘 드러나 있습니다."
                    },
                    a3: {
                        title: "성격 및 강점",
                        content: data.answers.q3 || "작성된 내용이 없습니다.",
                        improve: "강점을 뒷받침할 구체적인 사례를 추가하세요.",
                        good: ""
                    }
                },
                score: {
                    logic: ["논리성", "82"],
                    persuasive: ["설득력", "75"],
                    concrete: ["구체성", "68"],
                    authenticity: ["진정성", "88"],
                    total: "78"
                },
                summary: "전반적으로 진정성 있는 내용이지만, 구체적인 수치와 사례를 보강하면 더욱 설득력 있는 자소서가 될 것입니다.",
                createdAt: new Date().toISOString()
            });
        }, 1500);
    });
};