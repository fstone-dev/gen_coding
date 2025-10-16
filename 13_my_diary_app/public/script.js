document.addEventListener('DOMContentLoaded', () => {
    const views = {
        list: document.getElementById('list-view'),
        form: document.getElementById('form-view'),
        detail: document.getElementById('detail-view'),
    };

    const diaryList = document.getElementById('diary-list');
    const newDiaryBtn = document.getElementById('new-diary-btn');
    
    const formView = document.getElementById('form-view');
    const formTitle = document.getElementById('form-title');
    const diaryForm = document.getElementById('diary-form');
    const diaryId = document.getElementById('diary-id');
    const diaryTitle = document.getElementById('diary-title');
    const diaryContent = document.getElementById('diary-content');
    const cancelBtn = document.getElementById('cancel-btn');

    const detailView = document.getElementById('detail-view');
    const detailTitle = document.getElementById('detail-title');
    const detailDate = document.getElementById('detail-date');
    const detailContent = document.getElementById('detail-content');
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const backToListBtn = document.getElementById('back-to-list-btn');

    let currentDiaryId = null;

    function showView(viewId) {
        Object.values(views).forEach(view => view.style.display = 'none');
        views[viewId].style.display = 'block';
    }

    async function loadDiaries() {
        try {
            const response = await fetch('/api/diaries');
            if (!response.ok) throw new Error('Failed to fetch diaries');
            const diaries = await response.json();

            diaryList.innerHTML = '';
            diaries.forEach(diary => {
                const li = document.createElement('li');
                li.textContent = diary.title;
                li.dataset.id = diary.id;
                diaryList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    newDiaryBtn.addEventListener('click', () => {
        formTitle.textContent = '새 일기 작성';
        diaryForm.reset();
        diaryId.value = '';
        showView('form');
    });

    cancelBtn.addEventListener('click', () => {
        showView('list');
    });

    diaryList.addEventListener('click', async (e) => {
        if (e.target.tagName === 'LI') {
            const id = e.target.dataset.id;
            currentDiaryId = id;
            try {
                const response = await fetch(`/api/diaries/${id}`);
                if (!response.ok) throw new Error('Failed to fetch diary');
                const diary = await response.json();

                detailTitle.textContent = diary.title;
                detailDate.textContent = new Date(diary.created_at).toLocaleString();
                detailContent.textContent = diary.content;
                showView('detail');
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        }
    });

    backToListBtn.addEventListener('click', () => {
        showView('list');
    });

    diaryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const id = diaryId.value;
        const title = diaryTitle.value;
        const content = diaryContent.value;
        console.log('Diary data:', { id, title, content });

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/diaries/${id}` : '/api/diaries';

        try {
            console.log(`Sending ${method} request to ${url}`);
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            console.log('Received response:', response);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to save diary: ${errorText}`);
            }

            console.log('Diary saved successfully, reloading diaries...');
            await loadDiaries();
            console.log('Diaries reloaded, showing list view...');
            showView('list');
            console.log('List view shown');
        } catch (error) {
            console.error('Error saving diary:', error);
            alert(error.message);
        }
    });

    editBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`/api/diaries/${currentDiaryId}`);
            if (!response.ok) throw new Error('Failed to fetch diary for editing');
            const diary = await response.json();

            formTitle.textContent = '일기 수정';
            diaryId.value = diary.id;
            diaryTitle.value = diary.title;
            diaryContent.value = diary.content;
            showView('form');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });

    deleteBtn.addEventListener('click', async () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`/api/diaries/${currentDiaryId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to delete diary');
                
                await loadDiaries();
                showView('list');
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        }
    });

    loadDiaries();
    showView('list');
});