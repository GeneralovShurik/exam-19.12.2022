const baseURL = 'http://127.0.0.1:8080';

async function loadVideos(){
    const resp = await fetch(`${baseURL}/video`);
    const videos = await resp.json();
    showVideos(videos);

}
function showVideos(videos){
    console.log(videos)
    videos.forEach((v) => {
        const card = document.createElement('div');
        card.addEventListener('click', () => {
            openPlayer(v.id, v.name);

        });
        card.classList.add('card');

        //создаем картинку
        const img = document.createElement('img');
        img.src = v.preview;

        //название видео
        const name = document.createElement('div');
        name.classList.add('name');
        name.innerText = v.name;

        //продолжительность видео
        const dur = document.createElement('div');
        dur.classList.add('duration');
        //TODO: перевести секунды в формат MM:SS
        //dur.innerText = v.duration;
       // TODO: перевести секунды в формат ММ:SS  
       var m = Math.floor(v.duration / 60);
       var s = v.duration % 60;
       dur.innerText = m + ' m: ' + s + ' s';
        //вставим все в card
        card.append(img, name, dur);
        document.body.appendChild(card);   
    });
}
loadVideos();

/* 
<div class="overlay">
        <div class="dialog">
            <video controls src="http://127.0.0.1:8080/stream/1.mp4"></video>
            <div>Video</div>
            <div>696966</div>
            <button>Close</button>
        </div> 
    </div>*/ 

    async function openPlayer(id, name) {
        const resp = await fetch(`${baseURL}/video/${id}`);
        // забираем json из запроса
        const info = await resp.json();

        //переписываем код из html
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const dialog = document.createElement('div');
        dialog.classList.add('dialog');

        const video = document.createElement('video');
        video.src = info.url;
        video.controls = true;

        //TODO: добавить теги для названия и количества просмотров

        const title = document.createElement('name');
        title.innerText = name;
        
        const viewCount = document.createElement('div');
        viewCount.innerText = info.viewCount;

       // два див название из name и комент в innerText

       const closeBtn = document.createElement('button');
       closeBtn.innerText = 'Close';
       closeBtn.addEventListener('click', () => {
       overlay.remove();
       });



       dialog.append(video, title, viewCount, closeBtn);//сюда добавить после создания два дива, перед кнопкой важен порядок добавления
       overlay.append(dialog);
       document.body.appendChild(overlay);
    }
    //https://disk.yandex.ru/d/NbqPShpcGrX8nA