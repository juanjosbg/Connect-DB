document.querySelectorAll('.card-body[data-subject]').forEach(item => {
    item.addEventListener('click', () => {
        const subjects = item.getAttribute('data-subject').split(' ');
        const isAllSelected = subjects.includes('all'); 

        document.querySelectorAll('#subject-content [data-subject]').forEach(contentItem => {
            const contentSubjects = contentItem.getAttribute('data-subject').split(' ');
            if (isAllSelected || contentSubjects.some(subject => subjects.includes(subject))) {
                contentItem.style.display = 'block';
            } else {
                contentItem.style.display = 'none';
            }
        });
    });
});
