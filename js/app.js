// Luồng mở đầu được giữ nguyên theo file 2; phần từ trang 6 dùng nội dung file 1.
const screens=[...document.querySelectorAll(".screen")];
const music=document.getElementById("bgMusic");
let galaxyIndex=0, letterIndex=0, typingTimer=null, hasStartedMusic=false, typingToken=0;
const galaxyMessages=["Chào chàng trai của em","Ngày Quốc tế Đàn ông","Luôn đẹp trai, vui vẻ","Mãi mạnh khỏe và luôn yêu em ♥"];
const letters=[
 {title:"Gửi anh,",text:"Hôm nay là một ngày đặc biệt, nên em muốn dành một món quà nhỏ để nói với anh vài điều mà đôi khi em chưa nói thành lời. Chúc chàng trai của em có một ngày 19/11 thật nhiều niềm vui, ngày càng đẹp trai và yêu em nhiều hơn nhé!"},
 {title:"Cảm ơn anh,",text:"Cảm ơn anh vì những quan tâm giản dị, những lúc ở bên an ủi em khi em buồn và cả những điều nhỏ bé khiến ngày bình thường của em trở nên vui hơn và cũng cảm ơn anh vì đã xuất hiện trong thế giới của em. Mong anh luôn tự tin và gặp thật nhiều điều tốt đẹp."},
 {title:"Điều cuối cùng,",text:"Chúc anh ngày 19/11 thật vui. Mong những dự định của anh đều thuận lợi, luôn có thật nhiều tiếng cười và luôn nhớ rằng có một người đang âm thầm cổ vũ cho anh. Thật may mắn khi anh bước vào thế giới của em ngay lúc em quyết định không dám yêu thêm một ai, anh kiên nhẫn bên cạnh em, yêu em và thương em. Thương anh thật nhiều! ♥"}
];
const memoryNotes=[
 {title:"Ấn tượng đầu tiên",text:"Lúc mới biết anh, em cảm thấy anh có chút lạnh lùng và khó gần. Nhưng chính sự đặc biệt ấy lại khiến em muốn làm quen với anh. Mong anh luôn giữ nét cuốn hút rất riêng của mình nhé!"},
 {title:"Một anh chàng đáng ghét",text:"Có những lúc anh thật đáng ghét, hay làm em dỗi và chẳng biết phải nói gì. Nhưng cũng chính anh khiến những ngày bình thường của em trở nên vui hơn. Chúc anh luôn vui vẻ và nhớ dịu dàng với em một chút nhé!"},
 {title:"Từ ghét thành thương",text:"Từ những điều nhỏ bé ban đầu, em nhận ra mình đã dành cho anh nhiều tình cảm hơn lúc nào không hay. Mong anh luôn bình an, gặp nhiều may mắn và chúng mình sẽ còn tạo thêm thật nhiều kỷ niệm đẹp. Thương anh nhiều! ♥"}
];

// Trang Ấn tượng: mỗi lần chạm vào vùng trống sẽ hiện thêm một phần,
// đặc biệt ba tấm ảnh lần lượt xuất hiện giống hiệu ứng ở file 1.
const impressionScreen=document.getElementById("impression");
const impressionRevealItems=[
 ...impressionScreen.querySelectorAll(".impression-card"),
 impressionScreen.querySelector(".impression-hint"),
 impressionScreen.querySelector(".impression-actions")
].filter(Boolean);
let impressionRevealIndex=0;
function resetImpressionReveal(){
 impressionRevealIndex=0;
 impressionRevealItems.forEach(item=>item.classList.remove("is-revealed"));
}
function revealImpressionNext(){
 if(impressionRevealIndex>=impressionRevealItems.length)return false;
 impressionRevealItems[impressionRevealIndex++].classList.add("is-revealed");
 return true;
}
// Tiêu đề luôn hiển thị; mỗi lần chạm nền sẽ lần lượt hiện một ảnh.
impressionScreen.addEventListener("click",e=>{
 if(e.target.closest("button, a, .impression-card, .memory-modal"))return;
 revealImpressionNext();
});
function showScreen(id){clearTimeout(typingTimer);screens.forEach(s=>s.classList.toggle("active",s.id===id));if(id==="impression")resetImpressionReveal();}
function startMusic(){if(hasStartedMusic)return;music.volume=.55;music.play().then(()=>{hasStartedMusic=true;}).catch(()=>{});}
function showGalaxyMessage(){const el=document.getElementById("galaxyMessage");el.textContent=galaxyMessages[galaxyIndex];el.style.animation="none";void el.offsetWidth;el.style.animation="textIn .8s ease both";document.getElementById("galaxyHint").textContent=galaxyIndex===galaxyMessages.length-1?"Chạm mũi tên để xem ấn tượng của em":"Chạm màn hình hoặc mũi tên để đọc tiếp";}
function nextGalaxy(){if(galaxyIndex<galaxyMessages.length-1){galaxyIndex++;showGalaxyMessage();}else showScreen("impression");}
function renderLetter(){const item=letters[letterIndex];document.getElementById("letterCount").textContent=`${String(letterIndex+1).padStart(2,"0")} / ${String(letters.length).padStart(2,"0")}`;document.getElementById("letterTitle").textContent=item.title;document.getElementById("letterText").textContent="Chạm nút bên dưới để mở thư...";document.getElementById("revealLetter").hidden=false;document.getElementById("nextLetter").hidden=true;}
function revealLetter() {
    const button = document.getElementById("revealLetter"), next = document.getElementById("nextLetter"), output = document.getElementById("letterText"), full = letters[letterIndex].text; button.hidden = true; output.textContent = ""; let i = 0, token = ++typingToken; function type() {
        if (token !== typingToken) return; if (i < full.length) { output.textContent += full.charAt(i++); typingTimer = setTimeout(type, 24); } else {
            next.hidden = false; next.textContent = letterIndex === letters.length - 1
                ? "Kết thúc món quà ♥"
                : "Điều tiếp theo em muốn nói ♥";}}type();}
document.getElementById("openGift").addEventListener("click",()=>{startMusic();galaxyIndex=0;showGalaxyMessage();showScreen("galaxy");});
document.getElementById("nextGalaxy").addEventListener("click",nextGalaxy);
document.getElementById("galaxy").addEventListener("click",e=>{if(!e.target.closest("button"))nextGalaxy();});
document.getElementById("toLetters").addEventListener("click",()=>{letterIndex=0;renderLetter();showScreen("letters");});
document.getElementById("revealLetter").addEventListener("click",revealLetter);
document.getElementById("nextLetter").addEventListener("click",()=>{
 if(letterIndex<letters.length-1){letterIndex++;renderLetter();}
 else{music.pause();music.currentTime=0;hasStartedMusic=false;showScreen("ending");}
});
document.getElementById("restart").addEventListener("click",()=>{music.pause();music.currentTime=0;hasStartedMusic=false;galaxyIndex=0;letterIndex=0;showScreen("welcome");});
document.querySelectorAll("[data-back]").forEach(button=>button.addEventListener("click",()=>showScreen(button.dataset.back)));
const modal=document.getElementById("memoryModal");
function openMemory(index){const note=memoryNotes[index];if(!note)return;document.getElementById("memoryTitle").textContent=note.title;document.getElementById("memoryText").textContent=note.text;modal.classList.add("show");modal.setAttribute("aria-hidden","false");}
function closeMemory(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");}
document.querySelectorAll("[data-memory]").forEach(card=>card.addEventListener("click",()=>openMemory(Number(card.dataset.memory))));
document.getElementById("closeMemory").addEventListener("click",closeMemory);document.getElementById("memoryOkay").addEventListener("click",closeMemory);modal.addEventListener("click",e=>{if(e.target===modal)closeMemory();});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMemory();});
