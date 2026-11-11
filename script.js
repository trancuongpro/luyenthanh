document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const overlay = document.getElementById("poemOverlay");
  const audio = document.getElementById("audioPlayer");
  const poemTitle = document.getElementById("poemTitle");

  // Hàm đóng bảng thơ + reset nhạc về trạng thái ban đầu
  function resetToInitialState() {
    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute("src");
    audio.load();
    overlay.classList.remove("active");
    poemTitle.textContent = "";
  }

  // Xử lý khi bấm nút phát nhạc
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const soundFile = btn.dataset.sound;
      const toneName = btn.textContent.trim(); // Lấy chữ trên button

      // Gán tên nốt vào đầu bảng thơ
      poemTitle.textContent = toneName;

      // Dừng nhạc cũ nếu có, rồi phát file mới (không loop)
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.src = soundFile;
      audio.play().catch((err) => {
        console.warn("Không phát được file:", soundFile, err);
      });

      // Hiện bảng thơ
      overlay.classList.add("active");
    });
  });

  // Khi MP3 phát xong -> tự động đóng bảng, trở về trạng thái ban đầu
  audio.addEventListener("ended", () => {
    resetToInitialState();
  });

  // (Tùy chọn) Nếu file lỗi thì vẫn đóng bảng sau 1s để tránh kẹt
  audio.addEventListener("error", () => {
    console.warn("Lỗi file MP3!");
    setTimeout(resetToInitialState, 1000);
  });

  // Chạm vào bảng thơ -> tắt nhạc + trở về trạng thái ban đầu
  overlay.addEventListener("click", () => {
    resetToInitialState();
  });
});