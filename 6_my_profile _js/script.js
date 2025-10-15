document.addEventListener('DOMContentLoaded', () => {
    const showInterestsBtn = document.getElementById('show-interests-btn');
    const hideInterestsBtn = document.getElementById('hide-interests-btn');
    const profileNameElement = document.getElementById('profile-name');
    const welcomeMessageElement = document.getElementById('welcome-message');
    const interestsSectionElement = document.getElementById('interests-section');

    if (showInterestsBtn && hideInterestsBtn && profileNameElement && welcomeMessageElement && interestsSectionElement) {
        showInterestsBtn.addEventListener('click', () => {
            const name = profileNameElement.textContent;
            welcomeMessageElement.textContent = `안녕하세요, ${name}님! 반갑습니다.`;
            welcomeMessageElement.style.color = 'blue';
            interestsSectionElement.style.display = 'block'; // Show the interests section
        });

        hideInterestsBtn.addEventListener('click', () => {
            interestsSectionElement.style.display = 'none'; // Hide the interests section
            welcomeMessageElement.textContent = '관심사 목록이 숨겨졌습니다.';
            welcomeMessageElement.style.color = 'red';
        });
    }
});
