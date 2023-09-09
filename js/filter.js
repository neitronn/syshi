document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.filter_block').addEventListener('click', (e) => {
        e.target.closest('.filter').classList.toggle('open-filter');
        e.target.closest('.page').classList.toggle('shadow');
    })
})