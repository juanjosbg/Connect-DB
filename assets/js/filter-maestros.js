document.querySelectorAll('.card-body[data-subject]').forEach(item => {
    item.addEventListener('click', () => {
        const subject = item.getAttribute('data-subject');
        document.querySelectorAll('#subject-content [data-subject]').forEach(contentItem => {
            if (contentItem.getAttribute('data-subject') === subject || !subject) {
                contentItem.style.display = 'block';
            } else {
                contentItem.style.display = 'none';
            }
        });
    });
});